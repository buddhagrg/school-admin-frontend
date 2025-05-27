import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { COLORS } from '@/theme/custom-colors';

export const BackToLogin = () => {
  return (
    <Typography
      component={Link}
      to='/login'
      variant='body2'
      sx={{ color: COLORS.primaryLink, textDecoration: 'none' }}
    >
      Back to login
    </Typography>
  );
};
