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

import { LoginSchema, type LoginRequest } from '../../types';
import { ApiError } from '@/shared/components';
import { useLoginMutation } from '../../auth-api';
import { setUser } from '../../auth-slice';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { DemoRoles } from './demo-roles';

const initState: LoginRequest = {
  email: '',
  password: ''
};
export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    handleSubmit
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initState
  });

  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading: isFetching }] = useLoginMutation();
  const [demoFieldChecked, setDemoFieldChecked] = useState(false);

  const toggleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setDemoFieldChecked(!demoFieldChecked);
    if (checked) {
      setValue('email', 'admin@school-admin.xyz');
      setValue('password', 'schooladmin');
    } else {
      reset(initState);
    }
  };
  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      dispatch(setUser({ user }));
      const redirectPath = user.appBase;
      navigate(redirectPath ? redirectPath : '/');
      setApiErrors([]);
    } catch (error) {
      const apiErrors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiErrors(apiErrors);
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
      <DemoRoles toggleCheckBox={toggleCheckBox} isChecked={demoFieldChecked} />
      <Box sx={{ mt: 3 }} />
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

      {apiErrors.length > 0 && (
        <ApiError messages={apiErrors} closeAlert={closeAlert} open={alertOpen} />
      )}

      <Box sx={{ mt: 2 }} />
      <Button loading={isFetching} loadingPosition='start' type='submit' variant='contained'>
        <span>Sign In</span>
      </Button>
    </form>
  );
};
