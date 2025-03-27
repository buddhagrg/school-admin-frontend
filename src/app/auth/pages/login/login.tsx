import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { useLoginMutation } from '../../auth-api';
import { setUser } from '../../auth-slice';
import { DemoRoles } from './demo-roles';
import { BackToMainWebsite } from './back-to-main-website';

const initState: LoginRequest = {
  username: '',
  password: ''
};
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const methods = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initState
  });
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [login, { isLoading }] = useLoginMutation();

  const updateState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(!isChecked);
    if (checked) {
      methods.setValue('username', 'admin@school-admin.xyz');
      methods.setValue('password', 'iamadmin');
    } else {
      methods.reset(initState);
    }
  };

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      if (user) {
        dispatch(setUser({ user }));
        const redirectPath = user.appBase;
        navigate(redirectPath);
      }
    } catch (error) {
      const apiErrors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiErrors(apiErrors);
    }
  };

  return (
    <Container maxWidth={'xl'}>
      <BackToMainWebsite />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto',
          width: { xs: '70%', md: '50%', lg: '35%' },
          maxHeight: 'calc(100vh - 40px)',
          p: 2
        }}
      >
        <Typography component='div' variant='h5' sx={{ fontWeight: 600 }}>
          Sign In to School Admin
        </Typography>
        <DemoRoles toggleCheckBox={updateState} isChecked={isChecked} />
        <Box sx={{ mt: 5 }} />
        <LoginForm
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
          isFetching={isLoading}
          apiErrors={apiErrors}
        />
      </Box>
    </Container>
  );
};
