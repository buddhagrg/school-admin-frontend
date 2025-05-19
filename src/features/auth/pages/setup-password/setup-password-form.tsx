import React from 'react';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import type { SetupPasswordProps } from '../../types';

type SetupPasswordFormProps = {
  methods: UseFormReturn<SetupPasswordProps>;
  isLoading: boolean;
  clearForm: () => void;
  onSubmit: () => void;
};

export const SetupPasswordForm: React.FC<SetupPasswordFormProps> = ({
  methods,
  isLoading,
  clearForm,
  onSubmit
}) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth error={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <TextField
          size='small'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </FormControl>
      <FormControl fullWidth error={!!errors.confirmPassword} sx={{ mt: 2 }}>
        <FormLabel>Re-type Password</FormLabel>
        <TextField
          size='small'
          type='password'
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </FormControl>
      <Box sx={{ mt: 4 }}>
        <Button
          type='button'
          size='small'
          variant='text'
          onClick={clearForm}
          color='error'
          sx={{ mr: 1 }}
        >
          Clear
        </Button>
        <Button
          loading={isLoading}
          loadingPosition='start'
          type='submit'
          size='small'
          variant='contained'
        >
          Setup Password
        </Button>
      </Box>
    </form>
  );
};
