import { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { PolicyUser } from '@/app/leave/types';
import { RemoveUserFromPolicy } from './remove-user-from-policy';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetLeavePolicyUsersQuery } from '@/app/leave/api';
import { ERROR_MESSAGE } from '@/components/errors';

export const UserList = ({ policyId }: { policyId: number }) => {
  const { data, isLoading, isError, error } = useGetLeavePolicyUsersQuery(policyId);
  const [userId, setUserId] = useState<number>(0);

  const columns: MRT_ColumnDef<PolicyUser>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'role',
        header: 'Role'
      },
      {
        accessorKey: 'totalDaysUsed',
        header: 'Policy Used (Days)'
      }
    ],
    []
  );

  const handleRoleSwitch = (userId: number) => {
    setUserId(userId);
  };
  const closeModal = () => {
    setUserId(0);
  };

  const users = isError ? [] : data?.users || [];
  const table = useMaterialReactTable({
    data: users,
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <IconButton
        title='Remove User'
        color='error'
        onClick={() => handleRoleSwitch(row.original.id)}
      >
        <Delete />
      </IconButton>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>

      {Boolean(userId) && (
        <RemoveUserFromPolicy policyId={policyId} userId={userId} closeModal={closeModal} />
      )}
    </>
  );
};
