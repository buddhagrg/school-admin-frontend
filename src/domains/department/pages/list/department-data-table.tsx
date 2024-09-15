import * as React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { NameIdType } from '@/utils/type/misc';
import { TableRowWithColSpan } from '@/components/table-row-with-col-span';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from '../../api';

const columns: NameIdType[] = [
  {
    id: 'name',
    name: 'NAME'
  },
  {
    id: 'actions',
    name: 'ACTIONS'
  }
];

export const DepartmentDataTable = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState<number | null>(null);

  const { data, isLoading, isError, error } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: isDeletingDepartment }] = useDeleteDepartmentMutation();

  const handleDelete = (id: number) => () => {
    setDepartmentId(id);
    setModalOpen(true);
  };

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <TableRowWithColSpan colSpan={3} text='loading...' />;
  } else if (isError) {
    content = <TableRowWithColSpan colSpan={4} text={getErrorMsg(error).message} />;
  } else if (!Array.isArray(data?.departments) || data.departments.length <= 0) {
    content = <TableRowWithColSpan colSpan={3} />;
  } else {
    content = (
      <>
        {data.departments.map((c) => (
          <TableRow hover key={c.id}>
            <TableCell>{c.name}</TableCell>
            <TableCell>
              <Stack direction='row' spacing={1}>
                <IconButton
                  title='Edit Department'
                  color='primary'
                  component={Link}
                  to={`/app/departments/edit/${c.id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton title='Delete Department' color='error' onClick={handleDelete(c.id)}>
                  <Delete />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const onDeleteDepartment = async () => {
    try {
      const result = await deleteDepartment(departmentId!).unwrap();
      toast.info(result.message);
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Box component={Paper}>
        <TableContainer sx={{ height: '80vh', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(({ id, name }) => (
                  <TableCell key={id}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DialogModal
        isSaving={isDeletingDepartment}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={modalOpen}
        closeModal={handleModalClose}
        handleSave={onDeleteDepartment}
        titleText='Delete Department'
      >
        <Typography variant='body1'>Are you sure you want to delete this department?</Typography>
      </DialogModal>
    </>
  );
};
