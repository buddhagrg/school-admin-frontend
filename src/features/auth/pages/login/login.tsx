import { Box, Typography } from '@mui/material';

import { LoginForm } from './login-form';
import { DemoInfo } from './demo-info';
import { LoginAlternative } from './login-alternative';
import { AuthLayout } from '../../components/auth-layout';

export const Login = () => {
  return (
    <AuthLayout showLoginPageLink={false}>
      <Typography variant='h6'>Sign In to School Admin</Typography>
      <LoginForm />
      <Box sx={{ mt: 5 }} />
      <LoginAlternative />
      <Box mt={2} />
      <DemoInfo />
    </AuthLayout>
  );
};
