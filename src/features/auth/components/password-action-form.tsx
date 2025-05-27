import React from 'react';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { ApiResponseAlertType, PasswordActionFormProps } from '../types';
import { ApiResponseAlert } from '@/shared/components';

type PasswordActionFormType = {
  register: UseFormRegister<PasswordActionFormProps>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  success: boolean;
  errors: FieldErrors<PasswordActionFormProps>;
  apiResponse: ApiResponseAlertType;
  onClear: () => void;
  submitText: string;
};
export const PasswordActionForm: React.FC<PasswordActionFormType> = ({
  register,
  onSubmit,
  loading,
  success,
  errors,
  apiResponse,
  onClear,
  submitText
}) => {
  const formDisabled = loading || success;
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={formDisabled}>
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

        {apiResponse.messages.length > 0 && (
          <Box mt={2}>
            <ApiResponseAlert
              open={true}
              messages={apiResponse.messages}
              severity={apiResponse.severity}
              shouldShowCloseIcon={false}
            />
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            type='button'
            size='small'
            variant='text'
            onClick={onClear}
            color='error'
            sx={{ mr: 1 }}
          >
            Clear
          </Button>
          <Button
            loading={loading}
            loadingPosition='start'
            type='submit'
            size='small'
            variant='contained'
          >
            {success ? 'Redirecting...' : submitText}
          </Button>
        </Box>
      </fieldset>
    </form>
  );
};
