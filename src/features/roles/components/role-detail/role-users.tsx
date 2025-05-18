import { useMemo } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box } from '@mui/material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import type { User } from '../../types';
import { useGetRoleUsersQuery } from '../../roles-api';
import { useRolePermission } from '../../context/role-provider';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { skipToken } from '@reduxjs/toolkit/query';

export const RoleUsers = () => {
  const {
    state: { roleDetail }
  } = useRolePermission();
  const { data, isLoading, isError, error } = useGetRoleUsersQuery(
    roleDetail ? roleDetail.id : skipToken
  );

  const columns: MRT_ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      }
    ],
    []
  );

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
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return <MaterialReactTable table={table} />;
};
