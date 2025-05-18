import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { type LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { useLoginMutation } from '../../auth-api';
import { setUser } from '../../auth-slice';
import { LoginAlternative } from './login-alternative';
import { AuthLayout } from '../../components/auth-layout';

const initState: LoginRequest = {
  email: '',
  password: ''
};
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initState
  });
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      if (user) {
        dispatch(setUser({ user }));
        const redirectPath = user.appBase;
        navigate(redirectPath ? redirectPath : '/');
      }
    } catch (error) {
      const apiErrors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiErrors(apiErrors);
    }
  };

  return (
    <AuthLayout>
      <Typography variant='h6'>Sign In to School Admin</Typography>
      <Box sx={{ mt: 3 }} />
      <LoginForm
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
        isFetching={isLoading}
        apiErrors={apiErrors}
      />
      <Box sx={{ mt: 5 }} />
      <LoginAlternative />
    </AuthLayout>
  );
};
