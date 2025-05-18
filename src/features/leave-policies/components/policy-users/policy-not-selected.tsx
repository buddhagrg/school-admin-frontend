import { Box, Paper } from '@mui/material';
import { Policy } from '@mui/icons-material';
import { HeadingText, SubSoftText } from '@/shared/components';

export const PolicyNotSelected = () => {
  return (
    <Box
      component={Paper}
      sx={{ textAlign: 'center', p: 10, display: 'flex', flexDirection: 'column' }}
    >
      <Box>
        <Policy />
      </Box>
      <HeadingText text='No Policy Selected' />
      <SubSoftText
        text={
          <Box component='span'>
            Select a policy from the list to view and manage its <br />
            users , or create a new policy.
          </Box>
        }
      />
    </Box>
  );
};
