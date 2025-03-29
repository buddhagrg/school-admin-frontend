import { WarningAmber } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

export const DemoInfo = () => {
  return (
    <Box sx={{ backgroundColor: yellow[100], borderRadius: '10px', p: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <WarningAmber fontSize='small' />
        <Typography variant='body2' color='text.secondary'>
          This application runs on a free <b>Render.com</b> instance, which may take 50+ seconds to
          respond after inactivity.
        </Typography>
      </Box>
    </Box>
  );
};
