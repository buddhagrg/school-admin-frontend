import { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetDepartmentsQuery } from '../../api';
import { DepartmentFormWithId } from '../../types';
import { DeleteDepartment } from './delete-department';
import { getAppBase } from '@/app/auth/slice';
import { ERROR_MESSAGE } from '@/components/errors';

export const DepartmentData = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const { data, isLoading, isError, error } = useGetDepartmentsQuery();
  const appBase = useSelector(getAppBase);

  const columns: MRT_ColumnDef<DepartmentFormWithId>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
    }
  ];

  const onBtnClick = (id: number) => {
    setDepartmentId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.departments || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id }
      } = row;
      return (
        <>
          <IconButton
            title='Edit class'
            color='info'
            component={Link}
            to={`${appBase}/departments/edit/${id}`}
          >
            <Edit />
          </IconButton>
          <IconButton title='Delete class' color='error' onClick={() => onBtnClick(id)}>
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
      <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>

      {isModalOpen && <DeleteDepartment departmentId={departmentId} closeModal={closeModal} />}
    </>
  );
};
