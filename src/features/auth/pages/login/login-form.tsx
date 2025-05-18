import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { LoginRequest } from '../../types';
import { ApiError } from '@/shared/components';

type LoginFormProps = {
  onSubmit: () => void;
  methods: UseFormReturn<LoginRequest>;
  isFetching: boolean;
  apiErrors: string[];
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  methods,
  isFetching,
  apiErrors
}) => {
  const {
    register,
    formState: { errors }
  } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth size='small' variant='outlined'>
        <FormLabel sx={{ mb: '2px' }}>Username</FormLabel>
        <TextField
          size='small'
          type='text'
          placeholder='Your email'
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </FormControl>

      <FormControl fullWidth size='small' sx={{ mt: 2 }} variant='outlined'>
        <FormLabel sx={{ mb: '2px' }}>Password</FormLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          placeholder='Your password'
          {...register('password')}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={togglePasswordVisibility}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error>{errors?.password?.message}</FormHelperText>
      </FormControl>
      <Box mt={2} />
      <ApiError messages={apiErrors} />
      <Box sx={{ mt: 2 }} />
      <Button loading={isFetching} loadingPosition='start' type='submit' variant='contained'>
        <span>Sign In</span>
      </Button>
    </form>
  );
};
