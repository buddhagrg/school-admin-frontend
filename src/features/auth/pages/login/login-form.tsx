import { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';

import { type ApiResponseAlertType, LoginSchema, type LoginRequest } from '../../types';
import { useLoginMutation } from '../../auth-api';
import { setUser } from '../../auth-slice';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { ApiResponseAlert } from '@/shared/components';

const initState: LoginRequest = {
  email: '',
  password: ''
};
const initialApiResponse: ApiResponseAlertType = {
  severity: 'success',
  messages: []
};
export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initState
  });

  const [apiResponse, setApiResponse] = useState(initialApiResponse);
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading: isFetching }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setUser({ user }));
      const redirectPath = user.appBase;
      navigate(redirectPath ? redirectPath : '/');
      setApiResponse({ severity: 'success', messages: ['Login Successful'] });
    } catch (error) {
      const errors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiResponse({ severity: 'error', messages: errors });
    } finally {
      setAlertOpen(true);
    }
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {apiResponse.messages.length > 0 && (
        <ApiResponseAlert
          severity={apiResponse.severity}
          messages={apiResponse.messages}
          onClose={closeAlert}
          open={alertOpen}
        />
      )}

      <Box sx={{ mt: 2 }} />
      <Button loading={isFetching} loadingPosition='start' type='submit' variant='contained'>
        <span>Sign In</span>
      </Button>
    </form>
  );
};
