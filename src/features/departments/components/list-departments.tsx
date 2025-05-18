import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetDepartmentsQuery } from '../department-api';
import { DeleteDepartment } from './delete-department';
import type { DepartmentFormPropsWithId } from '../types';
import { EditDepartment } from './edit-department';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

type State = {
  action: string;
  id: number;
  name: string;
};
const initialState: State = {
  action: '',
  id: 0,
  name: ''
};
export const ListDepartments = () => {
  const [state, setTState] = useState(initialState);
  const { data, isLoading, isError, error } = useGetDepartmentsQuery();

  const columns: MRT_ColumnDef<DepartmentFormPropsWithId>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
    }
  ];

  const onBtnClick = (action: string, data: DepartmentFormPropsWithId) => {
    setTState({ ...data, action });
  };
  const closeModal = () => {
    setTState(initialState);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.departments || [],
    columns,
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    enablePagination: false,
    enableColumnActions: false,
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      return (
        <>
          <IconButton
            title='Edit class'
            color='info'
            onClick={() => onBtnClick('edit', row.original)}
          >
            <Edit />
          </IconButton>
          <IconButton
            title='Delete class'
            color='error'
            onClick={() => onBtnClick('delete', row.original)}
          >
            <Delete />
          </IconButton>
        </>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />

      {state.action === 'delete' && <DeleteDepartment id={state.id} closeModal={closeModal} />}
      {state.action === 'edit' && (
        <EditDepartment id={state.id} name={state.name} closeModal={closeModal} />
      )}
    </>
  );
};
