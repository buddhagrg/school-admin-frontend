import { Box } from '@mui/material';
import { LeaveRequestTable } from './components';
import { PageContentHeader, ResponsiveBox } from '@/shared/components';

export const ReviewLeave = () => {
  return (
    <>
      <PageContentHeader
        title='Review Leave Requests'
        subtitle='Review and manage leave requests'
      />
      <Box mt={3} />
      <ResponsiveBox>
        <LeaveRequestTable />
      </ResponsiveBox>
    </>
  );
};
