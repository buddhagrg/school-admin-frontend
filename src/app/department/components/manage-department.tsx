import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DepartmentForm } from '../types';
import { useAddNewDepartmentMutation, useUpdateDepartmentMutation } from '../department-api';
import { getAppBase } from '@/app/auth/auth-slice';

type ManageDepartmentProps = {
  id?: number;
  operation: 'Add' | 'Edit';
  methods: UseFormReturn<DepartmentForm>;
};

export const ManageDepartment: FC<ManageDepartmentProps> = ({ id, operation, methods }) => {
  const [addNewDepartment, { isLoading: isAddingDepartment }] = useAddNewDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdatingDepartment }] = useUpdateDepartmentMutation();
  const navigate = useNavigate();
  const appBase = useSelector(getAppBase);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const handleSave = async (data: DepartmentForm) => {
    try {
      const { name } = data;
      const result =
        operation === 'Add'
          ? await addNewDepartment({ name }).unwrap()
          : await updateDepartment({ id: id!, name }).unwrap();

      reset();
      toast.info(result?.message);
      navigate(`${appBase}/departments`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        {' '}
        {operation} Department{' '}
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <TextField
          {...register('name')}
          label='Department Name'
          fullWidth
          focused
          size='small'
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Box textAlign='center'>
          <Button
            type='submit'
            size='small'
            variant='contained'
            sx={{ mt: 4 }}
            loading={isAddingDepartment || isUpdatingDepartment}
            loadingPosition='start'
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};
