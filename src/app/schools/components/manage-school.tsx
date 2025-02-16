import { FC } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { SchoolProps } from '../types';
import { useAddSchoolMutation, useUpdateSchoolMutation } from '../api';
import { getAppBase } from '@/domains/auth/slice';

type ManageSchoolPropsProps = {
  operation: string;
  id?: number;
  methods: UseFormReturn<SchoolProps>;
};

const fields: Array<keyof SchoolProps> = ['name', 'email', 'phone'];
export const ManageSchool: FC<ManageSchoolPropsProps> = ({ operation, id, methods }) => {
  const appBase = useSelector(getAppBase);
  const [addSchool, { isLoading: isAddingSchool }] = useAddSchoolMutation();
  const [updateSchool, { isLoading: isUpdatingSchool }] = useUpdateSchoolMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const onSubmit = async (data: SchoolProps) => {
    try {
      const result =
        operation === 'Add'
          ? await addSchool(data).unwrap()
          : await updateSchool({ schoolId: id!, ...data }).unwrap();

      toast.info(result.message);
      navigate(`${appBase}/schools`);
      reset();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  return (
    <>
      <Box component={Paper} sx={{ p: 2 }}>
        <Typography variant='subtitle1' sx={{ mb: 3 }}>
          {operation} School
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <TextField
              key={field}
              {...register(field)}
              error={Boolean(errors?.[field])}
              helperText={errors?.[field]?.message}
              label={field[0].toUpperCase() + field.slice(1)}
              fullWidth
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ marginBottom: '15px' }}
            />
          ))}

          <Box textAlign='center'>
            <Button
              loading={isAddingSchool || isUpdatingSchool}
              loadingPosition='start'
              type='submit'
              size='small'
              variant='contained'
              sx={{ mt: 4 }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};
