import { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </>
  );
};
