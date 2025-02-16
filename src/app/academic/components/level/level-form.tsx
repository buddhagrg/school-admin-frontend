import { FC } from 'react';
import { TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { AcademicLevelFormProps } from '../../types';

type LevelFormProps = {
  methods: UseFormReturn<AcademicLevelFormProps>;
};

export const LevelForm: FC<LevelFormProps> = ({ methods }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <TextField
      size='small'
      fullWidth
      slotProps={{ inputLabel: { shrink: true } }}
      label='Academic Level Name'
      variant='standard'
      {...register('name')}
      helperText={errors?.name?.message}
      error={Boolean(errors?.name)}
    />
  );
};
