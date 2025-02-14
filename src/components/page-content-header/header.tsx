import { ElementType } from 'react';
import { Box, Typography } from '@mui/material';

export const PageContentHeader = ({
  heading,
  icon: Icon
}: {
  heading: string;
  icon?: ElementType;
}) => {
  return (
    <Box display='flex' flexGrow={1} sx={{ color: 'text.secondary' }}>
      {Icon && <Icon sx={{ mr: 1, mb: 2 }} fontSize='small' />}
      <Typography component='div' sx={{ fontWeight: 500 }}>
        {heading}
      </Typography>
    </Box>
  );
};
