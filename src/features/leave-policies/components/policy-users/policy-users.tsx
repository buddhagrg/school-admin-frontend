import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import { PersonAddAlt1Outlined, PersonRemoveOutlined } from '@mui/icons-material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetLeavePolicyUsersQuery } from '../../leave-policy-api';
import { RemoveUser } from './remove-user';
import type { PolicyUser } from '../../types';
import { usePolicyDetail } from '../../leave-policy-context-provider';
import { AssignUsers } from './assign-users';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { ResponsiveBox } from '@/shared/components';
import { skipToken } from '@reduxjs/toolkit/query';

export const PolicyUsers = () => {
  const { state } = usePolicyDetail();
  const { data, isLoading, isError, error } = useGetLeavePolicyUsersQuery(
    state ? state.id : skipToken
  );
  const [userId, setUserId] = useState<number>(0);
  const [modal, setModal] = useState(false);

  const columns: MRT_ColumnDef<PolicyUser>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'role',
        header: 'Role'
      }
    ],
    []
  );

  const toggleAssignUserModal = () => {
    setModal(!modal);
  };

  const handleSwitchUserRole = (userId: number) => {
    setUserId(userId);
  };
  const closeModal = () => {
    setUserId(0);
  };

  const table = useMaterialReactTable({
    columns,
    data: isError ? [] : data?.users || [],
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    enablePagination: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableColumnActions: false,
    renderRowActions: ({ row }) => (
      <IconButton
        color='primary'
        title='Remove user'
        aria-label='Remove user'
        onClick={() => handleSwitchUserRole(row.original.id)}
      >
        <PersonRemoveOutlined fontSize='small' />
      </IconButton>
    ),
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1, display: 'flex' }}>
        <MRT_GlobalFilterTextField table={table} />
        <Button
          sx={{ ml: 'auto' }}
          size='small'
          variant='outlined'
          color='inherit'
          startIcon={<PersonAddAlt1Outlined />}
          onClick={toggleAssignUserModal}
        >
          Assign Users
        </Button>
      </Box>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <ResponsiveBox>
        <MaterialReactTable table={table} />
      </ResponsiveBox>
      {userId > 0 && <RemoveUser closeModal={closeModal} id={userId} />}
      {modal && <AssignUsers closeModal={toggleAssignUserModal} />}
    </>
  );
};
