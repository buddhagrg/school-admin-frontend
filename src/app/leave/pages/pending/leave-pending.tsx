import { Box } from '@mui/material';
import { Pending } from '@mui/icons-material';
import { PageContentHeader } from '@/components/page-content-header';
import { ListPendingRequest } from './components/list-pending-request';

export const PendingRequest = () => {
  return (
    <Box>
      <PageContentHeader icon={Pending} title='Pending Leave Requests' />
      <ListPendingRequest />
    </Box>
  );
};
