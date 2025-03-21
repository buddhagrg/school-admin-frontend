import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { HomeBar } from '@/components/home-bar';
import { useLoginMutation } from '../../auth-api';
import { setUser } from '../../auth-slice';
import { DemoRoles } from './demo-roles';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [login, { isLoading }] = useLoginMutation();

  const updateState = () => {
    methods.setValue('username', 'admin@school-admin.xyz');
    methods.setValue('password', 'iamadmin');
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
    <>
      <HomeBar
        actions={
          <Button
            variant='contained'
            component={Link}
            to='/auth/signup'
            sx={{
              ml: 1,
              backgroundColor: '#DF5C52',
              color: 'white',
              textTransform: 'none',
              fontSize: 16
            }}
          >
            Sign Up
          </Button>
        }
      />

      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto',
          maxHeight: 'calc(100vh - 40px)'
        }}
      >
        <Box
          component={Paper}
          sx={{
            width: { xs: '350px', md: '400px' },
            border: '1px solid #e4e4e7',
            padding: '30px',
            textAlign: 'center'
          }}
        >
          <Typography component='div' variant='h5' sx={{ fontWeight: 600 }}>
            School Admin
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Please signin to your account.
          </Typography>
          <Box sx={{ mt: 2 }} />
          <DemoRoles onClick={updateState} />
          <Box sx={{ mt: 2 }} />
          <LoginForm
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
            isFetching={isLoading}
            apiErrors={apiErrors}
          />
          <Typography sx={{ mt: 3, fontSize: '13px' }} color='text.secondary' variant='body2'>
            This is a demo version of School Admin
          </Typography>
        </Box>
      </Box>
    </>
  );
};
