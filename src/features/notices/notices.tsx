import { Box } from '@mui/material';
import { AddNoticeBtn, NoticeManagement } from './components';
import { PageContentHeader } from '@/shared/components';

export const Notices = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageContentHeader title='Notices' subtitle='View and manage notices' />
        <AddNoticeBtn />
      </Box>
      <Box mt={3} />
      <NoticeManagement />
    </>
  );
};
