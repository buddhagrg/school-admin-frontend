import { ArrowBack } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { COLORS } from '@/theme/custom-colors';

export const BackToMainWebsite = () => {
  const mainSite = import.meta.env.VITE_MAIN_SITE;
  console.log('mainSite: ', mainSite);
  return (
    <Typography
      component={Link}
      to={mainSite}
      variant='body2'
      sx={{
        color: COLORS.primaryLink,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ArrowBack sx={{ mr: 0.5, fontSize: '15px' }} />
      Main Website
    </Typography>
  );
};
