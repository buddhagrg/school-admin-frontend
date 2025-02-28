import React from 'react';
import { Box, Paper } from '@mui/material';

export const ResponsiveBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      {children}
    </Box>
  );
};
