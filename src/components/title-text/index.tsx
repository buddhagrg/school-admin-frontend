import { Typography } from '@mui/material';

export const TitleText = ({ text, color }: { text: string; color?: string }) => {
  return (
    <Typography variant='h6' color={color}>
      {text}
    </Typography>
  );
};
