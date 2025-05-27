import { Box, Typography } from '@mui/material';

import { LoginForm } from './login-form';
import { LoginAlternative } from './login-alternative';
import { AuthLayout } from '../../components/auth-layout';

export const Login = () => {
  return (
    <AuthLayout showLoginPageLink={false}>
      <Typography variant='h6'>Sign In to School Admin</Typography>
      <Box sx={{ mt: 3 }} />
      <LoginForm />
      <Box sx={{ mt: 5 }} />
      <LoginAlternative />
    </AuthLayout>
  );
};
