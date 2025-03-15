import { ElementType } from 'react';
import { Box, Typography } from '@mui/material';

export const PageContentHeader = ({
  title,
  subtitle,
  icon: Icon
}: {
  title: string;
  subtitle?: string;
  icon?: ElementType;
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box display='flex' sx={{ alignItems: 'center' }}>
        {Icon && <Icon sx={{ mr: 1 }} fontSize='small' />}
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant='subtitle1' color='text.secondary'>
        {subtitle}
      </Typography>
    </Box>
  );
};
