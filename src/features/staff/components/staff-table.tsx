import { useMemo, useReducer } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getTextColor } from '@/utils/helpers/get-text-color';
import type { UserActions } from '@/shared/types';
import type { Staff } from '../types';
import { useGetStaffQuery } from '../staff-api';
import { EditStaff } from './add-edit-staff/edit-staff';
import { ViewStaff } from './view-staff';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { DialogModal, ResponsiveBox } from '@/shared/components';
import { useUserAction } from '@/shared/hooks';
import { userActionReducer, userActionState } from '@/shared/reducer/user-action-reducer';
import { USER_ACTION_MENU_LIST } from '@/shared/constants/user-action-menus';
import { isMenuDisabled } from '@/shared/utils/is-menu-disabled';
import { USER_ACTION_MENUS } from '@/utils/constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const StaffTable = () => {
  const { data, isLoading, isError, error } = useGetStaffQuery();
  const [state, dispatch] = useReducer(userActionReducer, userActionState);
  const { handleAction } = useUserAction();

  const columns: MRT_ColumnDef<Staff>[] = useMemo(
    () => [
      {
        accessorKey: 'staffId',
        header: 'Staff ID'
      },
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'role',
        header: 'Role'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'department',
        header: 'Department'
      },
      {
        accessorKey: 'hasSystemAccess',
        header: 'System Access',
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

  const handleMenuClick = (menuAction: UserActions, data: Staff) => {
    const modalTitle = USER_ACTION_MENUS[menuAction] || '';
    const modalBodyText = `Are you sure you want to ${modalTitle}?`;
    dispatch({ type: 'TOGGLE_MODAL' });
    dispatch({ type: 'SET_MENU_DETAIL', payload: { menuAction, data, modalTitle, modalBodyText } });
  };
  const handleModalToggle = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };

  const table = useMaterialReactTable({
    data: error ? [] : data?.staff || [],
    columns,
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableColumnActions: false,
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      const {
        original: { hasSystemAccess }
      } = row;

      return [
        USER_ACTION_MENU_LIST.map(({ action, icon: Icon, text }) => (
          <MenuItem
            disabled={isMenuDisabled(action, hasSystemAccess)}
            key={action}
            onClick={() => {
              closeMenu();
              handleMenuClick(action, row.original);
            }}
          >
            <ListItemIcon>{<Icon fontSize='small' />}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))
      ];
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const onSave = async () => {
    try {
      dispatch({ type: 'TOGGLE_LOADING' });
      const { data, menuAction } = state;
      if (!data?.id) return;

      const userId = data.id;
      const result = await handleAction({ menuAction, userId, entity: 'staff' });
      toast.info(result?.message);
      dispatch({ type: 'TOGGLE_MODAL' });
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    } finally {
      dispatch({ type: 'TOGGLE_LOADING' });
    }
  };

  const actions = [
    'ENABLE_SYSTEM_ACCESS',
    'DISABLE_SYSTEM_ACCESS',
    'RESEND_VERIFICATION_EMAIL_TO_USER',
    'RESEND_PWD_LINK_EMAIL_TO_USER',
    'RESET_USER_PWD'
  ];
  const staffId = state.data?.id;
  return (
    <>
      <ResponsiveBox>
        <MaterialReactTable table={table} />
      </ResponsiveBox>

      {state.isModalOpen && state.menuAction === 'EDIT_DETAIL' && staffId && (
        <EditStaff id={staffId} closeModal={handleModalToggle} />
      )}
      {state.isModalOpen && state.menuAction === 'VIEW_DETAIL' && staffId && (
        <ViewStaff id={staffId} closeModal={handleModalToggle} />
      )}

      {actions.includes(state.menuAction) && (
        <DialogModal
          isSaving={state.isActionSaving}
          titleText={state.modalTitle}
          contextText={state.modalBodyText}
          actionFooterCancelText='No'
          actionFooterSaveText='Yes'
          isOpen={state.isModalOpen}
          closeModal={handleModalToggle}
          handleSave={onSave}
        />
      )}
    </>
  );
};
