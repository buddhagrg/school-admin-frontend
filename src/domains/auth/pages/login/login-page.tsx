import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { setUser } from '../../slice/auth-slice';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { ApiError } from '@/components/errors';
import { Link } from 'react-router-dom';
import { HomeBar } from '@/components/home-bar';
import { useLoginMutation } from '../../api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const [login, { isLoading }] = useLoginMutation();

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
          sx={{
            width: { xs: '400px', md: '450px' }
          }}
        >
          <Box sx={{ border: '1px solid #f3f6f999', padding: '40px' }} component={Paper}>
            <Typography component='div' variant='h5' gutterBottom sx={{ fontWeight: 500 }}>
              Sign In
            </Typography>
            <Typography variant='body1' color='text.secondary' gutterBottom>
              Please signin to your account.
            </Typography>
            <LoginForm
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
              isFetching={isLoading}
            />
            <ApiError messages={apiErrors} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
