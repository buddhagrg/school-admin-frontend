import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ExtendedPermission } from '../types';
import { useUpdateRolePermissionMutation } from '../api/role-and-permission-api';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable
} from 'material-react-table';
import { Box } from '@mui/material';

type MenuAccessProps = {
  roleId: number | null;
  currentRolePermissions: ExtendedPermission[] | [];
};

export const MenuAccess: React.FC<MenuAccessProps> = ({ roleId, currentRolePermissions }) => {
  const initialSelected = () =>
    currentRolePermissions.reduce((acc, menu) => {
      if (menu.isPermissionAvailable) {
        acc[menu.id.toString()] = true;
      }
      menu.subMenus?.forEach((subMenu) => {
        if (subMenu.isPermissionAvailable) {
          acc[subMenu.id.toString()] = true;
        }
      });
      return acc;
    }, {} as MRT_RowSelectionState);

  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>(initialSelected());
  const columns: MRT_ColumnDef<ExtendedPermission>[] = [
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'type',
      header: 'Type'
    },
    {
      accessorKey: 'method',
      header: 'Method'
    }
  ];

  const [updatePermissions, { isLoading: isUpdatingPermissions }] =
    useUpdateRolePermissionMutation();

  const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const ids = Object.keys(rowSelection);
      const result = await updatePermissions({
        id: roleId!,
        permissions: ids.length > 0 ? ids.join(',') : ''
      }).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: currentRolePermissions,
    enableExpanding: true,
    getRowId: (row) => row.id.toString(),
    getSubRows: (row) => row.subMenus,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      density: 'compact',
      rowSelection
    },
    enablePagination: false,
    enableDensityToggle: false,
    enableColumnFilters: true,
    filterFromLeafRows: true
  });

  return (
    <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
      <MaterialReactTable table={table} />
      <LoadingButton
        loading={isUpdatingPermissions}
        sx={{ marginTop: '20px' }}
        size='medium'
        variant='contained'
        onClick={handleSave}
      >
        Save
      </LoadingButton>
    </Box>
  );
};
