import { FC, useEffect } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowSelectionState,
  useMaterialReactTable
} from 'material-react-table';
import { Box, Button, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

import { ExtendedPermission } from '@/app/roles/types';
import { permissionFormState } from './permission-form-state';
import { PermissionFormProps } from '../types';

type PermissionType = {
  rowSelection: MRT_RowSelectionState;
  permissions: ExtendedPermission[];
  onRowSelectChange?: (row: MRT_RowSelectionState) => void;
  handleAction?: (data: PermissionFormProps) => void;
  isLoading: boolean;
};

export const ListPermissions: FC<PermissionType> = ({
  rowSelection,
  permissions,
  onRowSelectChange,
  handleAction,
  isLoading
}) => {
  useEffect(() => {
    if (onRowSelectChange) {
      onRowSelectChange(rowSelection);
    }
  }, [rowSelection, onRowSelectChange]);

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
    },
    {
      accessorKey: 'directAllowedRoleId',
      header: 'Direct Allowed Role Id'
    }
  ];

  const table = useMaterialReactTable({
    columns,
    data: permissions,
    enableExpanding: true,
    getRowId: (row) => row?.id?.toString(),
    getSubRows: (row) => row.subMenus,
    enableRowSelection: onRowSelectChange ? true : false,
    onRowSelectionChange: (updaterOrValue) => {
      if (onRowSelectChange) {
        const newSelection =
          typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue;
        onRowSelectChange(newSelection);
      }
    },
    state: {
      density: 'compact',
      rowSelection,
      isLoading,
      columnVisibility: { directAllowedRoleId: handleAction ? true : false }
    },
    enablePagination: false,
    enableDensityToggle: false,
    enableColumnFilters: true,
    filterFromLeafRows: true,
    enableRowActions: handleAction ? true : false,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id, name, type, method, path, directAllowedRoleId },
        parentId
      } = row;
      const rowData = { id, name, type, method, path, directAllowedRoleId };

      return (
        <Box>
          <IconButton
            disabled={Boolean(parentId)}
            color='primary'
            onClick={() =>
              handleAction &&
              handleAction({ ...permissionFormState, id: rowData.id, action: 'add' })
            }
          >
            <Add />
          </IconButton>
          <IconButton
            color='primary'
            onClick={() => handleAction && handleAction({ ...rowData, action: 'edit' })}
          >
            <Edit />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => handleAction && handleAction({ ...rowData, action: 'delete' })}
          >
            <Delete />
          </IconButton>
        </Box>
      );
    },
    renderTopToolbarCustomActions: () =>
      handleAction ? (
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => handleAction && handleAction({ ...permissionFormState, action: 'add' })}
        >
          Add Root Permission
        </Button>
      ) : (
        <></>
      )
  });

  return <MaterialReactTable table={table} />;
};
