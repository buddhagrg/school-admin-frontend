import React from 'react';
import { Box, Container } from '@mui/material';
import { BackToMainWebsite } from './back-to-main-website';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth={'xl'}>
      <BackToMainWebsite />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%)',
          overflow: 'auto',
          width: { xs: '70%', md: '50%', lg: '35%' },
          p: 2,
          marginTop: '60px'
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
