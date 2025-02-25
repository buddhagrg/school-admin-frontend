import { FC, useMemo, useState } from 'react';
import { Block, CheckCircle, Edit, Email, Key, LockReset, Visibility } from '@mui/icons-material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { UserAccountBasic } from '../types';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getAppBase } from '@/app/auth/slice';
import { menuItemTexts } from '@/constants';
import { useHandleMenuAction } from '@/hooks';
import { ERROR_MESSAGE } from '@/components/errors';
import { getTextColor } from '@/utils/helpers/get-text-color';

type State = {
  isSaving: boolean;
  isModalOpen: boolean;
  modalTitle: string;
  modalBodyText: string;
  userId: number;
  menuAction: string;
};
const initialState: State = {
  isSaving: false,
  isModalOpen: false,
  modalTitle: '',
  modalBodyText: '',
  userId: 0,
  menuAction: ''
};
type UserTableProps = {
  users: UserAccountBasic[];
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
};
export const UserTable: FC<UserTableProps> = ({ users, isLoading, isError, error }) => {
  const appBase = useSelector(getAppBase);
  const [state, setState] = useState<State>(initialState);
  const { handleAction } = useHandleMenuAction();

  const columns: MRT_ColumnDef<UserAccountBasic>[] = useMemo(
    () => [
      { accessorKey: 'id', header: 'Id' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      {
        accessorKey: 'lastLogin',
        header: 'Last Login',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'hasSystemAccess',
        header: 'Has System Access',
        Cell: ({ cell }) => {
          const status = cell.getValue<boolean>();
          return (
            <Box component='span' sx={getTextColor(status)}>
              {status ? 'Yes' : 'No'}
            </Box>
          );
        }
      }
    ],
    []
  );
  const menuActions = [
    {
      action: 'DISABLE_SYSTEM_ACCESS',
      icon: <Block />,
      text: 'Disable System Access'
    },
    {
      action: 'ENABLE_SYSTEM_ACCESS',
      icon: <CheckCircle />,
      text: 'Enable System Access'
    },
    {
      action: 'RESEND_VERIFICATION_EMAIL_TO_USER',
      icon: <Email />,
      text: 'Resend Verification Email'
    },
    {
      action: 'RESEND_PWD_LINK_EMAIL_TO_USER',
      icon: <Key />,
      text: 'Resend Password Setup Link'
    },
    {
      action: 'RESET_USER_PWD',
      icon: <LockReset />,
      text: 'Reset Password'
    }
  ];
  const onMenuItemClick = (menuAction: string, userId: number) => {
    const modalTitle = menuItemTexts[menuAction] || '';
    const modalBodyText = `Are you sure you want to ${modalTitle}?`;
    setState((prevState) => ({
      ...prevState,
      modalTitle,
      modalBodyText,
      userId,
      isModalOpen: !prevState.isModalOpen,
      menuAction
    }));
  };
  const toggleModal = () => {
    setState((prevState) => ({ ...prevState, isModalOpen: !prevState.isModalOpen }));
  };
  const onSave = async () => {
    try {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
      const { userId, menuAction } = state;
      const result = await handleAction(menuAction, userId);
      toast.info(result?.message);
      toggleModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    } finally {
      setState((prevState) => ({ ...prevState, isSaving: !prevState.isSaving }));
    }
  };
  const isMenuDisabled = (action: string, hasSystemAccess: boolean) => {
    switch (hasSystemAccess) {
      case true:
        if (action === 'ENABLE_SYSTEM_ACCESS') {
          return true;
        }
        return false;
      case false:
        if (action === 'ENABLE_SYSTEM_ACCESS') {
          return false;
        }
        return true;
      default:
        return true;
    }
  };
  const table = useMaterialReactTable({
    data: users,
    columns,
    state: { isLoading, density: 'compact' },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const {
        original: { id, staticRoleId, hasSystemAccess }
      } = row;
      const userRoute = staticRoleId === 4 ? 'students' : 'staff';
      const staticAction = [
        <MenuItem
          key={0}
          onClick={() => closeMenu()}
          component={Link}
          to={`${appBase}/users/${userRoute}/${id}`}
        >
          <ListItemIcon>
            <Visibility fontSize='small' />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => closeMenu()}
          component={Link}
          to={`${appBase}/users/${userRoute}/edit/${id}`}
        >
          <ListItemIcon>
            <Edit fontSize='small' />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      ];
      return [
        ...staticAction,
        menuActions.map(({ action, icon, text }) => (
          <MenuItem
            disabled={isMenuDisabled(action, hasSystemAccess)}
            key={action}
            onClick={() => {
              closeMenu();
              onMenuItemClick(action, id);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))
      ];
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : ERROR_MESSAGE.NO_RECORD;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />

      <DialogModal
        isSaving={state.isSaving}
        titleText={state.modalTitle}
        contextText={state.modalBodyText}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={state.isModalOpen}
        closeModal={toggleModal}
        handleSave={onSave}
      />
    </>
  );
};
