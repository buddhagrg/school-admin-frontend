import { ReactElement } from 'react';
import { Box, Paper } from '@mui/material';

export const ResponsiveBox = ({ children }: { children: ReactElement }) => {
  return (
    <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      {children}
    </Box>
  );
};
