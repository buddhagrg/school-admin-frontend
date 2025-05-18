import { useMemo, useReducer } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import type { Student } from '../types';
import type { UserActions } from '@/shared/types';
import { useGetStudentsQuery } from '../students-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { EditStudent } from './add-edit-student/edit-student';
import { ViewStudent } from './view-student';
import { isMenuDisabled } from '../../../shared/utils/is-menu-disabled';
import { userActionReducer, userActionState } from '@/shared/reducer/user-action-reducer';
import { USER_ACTION_MENUS } from '@/utils/constants';
import { useUserAction } from '@/shared/hooks';
import { DialogModal, ResponsiveBox } from '@/shared/components';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { USER_ACTION_MENU_LIST } from '@/shared/constants/user-action-menus';

export const StudentTable = () => {
  const { data, isLoading, isError, error } = useGetStudentsQuery();
  const [state, dispatch] = useReducer(userActionReducer, userActionState);
  const { handleAction } = useUserAction();

  const columns: MRT_ColumnDef<Student>[] = useMemo(
    () => [
      {
        accessorKey: 'studentId',
        header: 'Student ID'
      },
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'class',
        header: 'Class'
      },
      {
        accessorKey: 'section',
        header: 'Section'
      },
      {
        accessorKey: 'gender',
        header: 'Gender'
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

  const handleMenuClick = (menuAction: UserActions, data: Student) => {
    const modalTitle = USER_ACTION_MENUS[menuAction] || '';
    const modalBodyText = `Are you sure you want to ${modalTitle}?`;
    dispatch({ type: 'TOGGLE_MODAL' });
    dispatch({ type: 'SET_MENU_DETAIL', payload: { menuAction, data, modalTitle, modalBodyText } });
  };
  const handleModalToggle = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
  };

  const table = useMaterialReactTable({
    data: error ? [] : data?.students || [],
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
      const { data, menuAction } = state;
      if (!data?.id) return;
      const userId = data.id;
      dispatch({ type: 'TOGGLE_LOADING' });
      const result = await handleAction({ menuAction, userId, entity: 'students' });
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
  const studentId = state.data?.id;
  return (
    <>
      <ResponsiveBox>
        <MaterialReactTable table={table} />
      </ResponsiveBox>

      {state.isModalOpen && state.menuAction === 'EDIT_DETAIL' && studentId && (
        <EditStudent id={studentId} closeModal={handleModalToggle} />
      )}
      {state.isModalOpen && state.menuAction === 'VIEW_DETAIL' && studentId && (
        <ViewStudent id={studentId} closeModal={handleModalToggle} />
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
