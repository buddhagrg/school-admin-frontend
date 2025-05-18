import React from 'react';
import { Typography } from '@mui/material';

export const SubSoftText = ({
  text,
  color = 'text.secondary'
}: {
  text: string | React.ReactNode;
  color?: string;
}) => {
  return (
    <Typography variant='body2' color={color} component='div'>
      {text}
    </Typography>
  );
};
