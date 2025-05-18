import { Typography } from '@mui/material';

export const HeadingText = ({ text, color }: { text: string; color?: string }) => {
  return (
    <Typography fontWeight={500} color={color}>
      {text}
    </Typography>
  );
};
