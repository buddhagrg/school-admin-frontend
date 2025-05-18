import React from 'react';
import { Box, Typography } from '@mui/material';

export const PageContentHeader = ({
  title,
  subtitle,
  icon: Icon
}: {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
}) => {
  return (
    <Box>
      <Box display='flex' sx={{ alignItems: 'center' }}>
        {Icon && <Icon sx={{ mr: 1 }} fontSize='small' />}
        <Typography variant='h5' fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Typography color='text.secondary'>{subtitle}</Typography>
    </Box>
  );
};
