import React from 'react';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import type { DepartmentFormProps } from '../types';

type DepartmentFormType = {
  methods: UseFormReturn<DepartmentFormProps>;
};
export const DepartmentForm: React.FC<DepartmentFormType> = ({ methods }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <FormControl fullWidth>
      <FormLabel>Department Name</FormLabel>
      <TextField
        {...register('name')}
        size='small'
        placeholder='e.g., Math'
        error={!!errors?.name}
        helperText={errors?.name?.message}
      />
    </FormControl>
  );
};
