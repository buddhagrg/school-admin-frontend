import React from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

type PageInfo = {
  title: string;
  subTitle: string;
};
export const PageInfo: React.FC<PageInfo> = ({ title, subTitle }) => {
  return (
    <Box sx={{ border: `1px solid ${blue[100]}` }}>
      <Box sx={{ display: 'flex', bgcolor: blue[50], p: 2, color: blue[800] }}>
        <InfoOutlined fontSize='small' />
        <Box sx={{ ml: 2 }}>
          <Typography fontWeight={500} gutterBottom>
            {title}
          </Typography>
          <Typography variant='body2'>{subTitle}</Typography>
        </Box>
        <Box flexGrow={1} />
      </Box>
    </Box>
  );
};
