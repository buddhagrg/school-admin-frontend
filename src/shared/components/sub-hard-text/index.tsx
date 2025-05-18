import React from 'react';
import { Typography } from '@mui/material';

export const SubHardText = ({
  text,
  color
}: {
  text: string | React.ReactNode;
  color?: string;
}) => {
  return (
    <Typography variant='body2' fontWeight={500} color={color}>
      {text}
    </Typography>
  );
};
