import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </>
  );
};
