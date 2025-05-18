import { Box } from '@mui/material';
import { PageContentHeader } from '@/shared/components';

export const LeaveHistoryHeading = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PageContentHeader title='Leave History' subtitle='View and track all your leave requests' />
    </Box>
  );
};
