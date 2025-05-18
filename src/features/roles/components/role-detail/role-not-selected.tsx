import { Box, Paper } from '@mui/material';
import { ShieldOutlined } from '@mui/icons-material';
import { HeadingText, SubSoftText } from '@/shared/components';

export const RoleNotSelected = () => {
  return (
    <Box
      component={Paper}
      sx={{ textAlign: 'center', p: 10, display: 'flex', flexDirection: 'column' }}
    >
      <Box>
        <ShieldOutlined />
      </Box>
      <HeadingText text='No Role Selected' />
      <SubSoftText
        text={
          <Box component='span'>
            Select a role from the list to view and manage its <br />
            permissions , or create a new role to define custom access levels.
          </Box>
        }
      />
    </Box>
  );
};
