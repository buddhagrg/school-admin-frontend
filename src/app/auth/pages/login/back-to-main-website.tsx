import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const BackToMainWebsite = () => {
  const mainSite = import.meta.env.VITE_MAIN_SITE;
  return (
    <Button
      variant='outlined'
      sx={{ mt: 2, borderRadius: '10px' }}
      component={Link}
      to={mainSite}
      startIcon={<ArrowBack />}
    >
      Back to main website
    </Button>
  );
};
