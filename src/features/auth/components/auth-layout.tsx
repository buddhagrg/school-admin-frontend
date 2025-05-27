import React from 'react';
import { Box, Card } from '@mui/material';
import { BackToMainWebsite } from './back-to-main-website';
import { BackToLogin } from '../pages/login/back-to-login';

type AuthLayoutProps = {
  showLoginPageLink?: boolean;
  children: React.ReactNode;
};
export const AuthLayout: React.FC<AuthLayoutProps> = ({ showLoginPageLink = true, children }) => {
  return (
    <Box sx={{ m: 1 }}>
      <BackToMainWebsite />
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
        p={2}
      >
        <Card sx={{ p: 2, width: '100%', maxWidth: 500 }}>
          {showLoginPageLink && <BackToLogin />}
          <Box mt={2}>{children}</Box>
        </Card>
      </Box>
    </Box>
  );
};
