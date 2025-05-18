import { Box } from '@mui/material';
import { LeaveHistory, LeavePolicies, RequestLeaveBtn } from './components';
import { PageContentHeader } from '@/shared/components';

export const RequestLeave = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <PageContentHeader title='Leave Management' subtitle='Request and track your leave' />
        <RequestLeaveBtn />
      </Box>
      <Box mt={3} />
      <LeavePolicies />
      <Box mt={5} />
      <LeaveHistory />
    </>
  );
};
