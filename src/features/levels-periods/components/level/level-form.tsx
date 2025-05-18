import React from 'react';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import type { AcademicLevelFormProps } from '../../types';

type LevelFormProps = {
  methods: UseFormReturn<AcademicLevelFormProps>;
};

export const LevelForm: React.FC<LevelFormProps> = ({ methods }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <FormControl fullWidth>
      <FormLabel>Level Name</FormLabel>
      <TextField
        size='small'
        fullWidth
        placeholder='e.g., School, College'
        slotProps={{ inputLabel: { shrink: true } }}
        variant='outlined'
        {...register('name')}
        helperText={errors?.name?.message}
        error={Boolean(errors?.name)}
      />
    </FormControl>
  );
};
