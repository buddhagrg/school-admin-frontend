import { Box } from '@mui/material';
import { Pending } from '@mui/icons-material';
import { PageContentHeader } from '@/components/page-content-header';
import { PendingRequestData } from './components/pending-request';

export const PendingRequest = () => {
  return (
    <Box>
      <PageContentHeader icon={Pending} heading='Pending Leave Requests' />
      <PendingRequestData />
    </Box>
  );
};
