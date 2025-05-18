import { Link } from 'react-router-dom';
import { ArrowOutward, NotificationsOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent } from '@mui/material';

import type { Notice } from '@/features/notices/types';
import { NoticeItem } from './notice-item';
import { DataNotFound, SubSoftText, TitleText } from '@/shared/components';

export const Notices = ({ notices }: { notices: Notice[] }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <NotificationsOutlined color='primary' />
          <TitleText text='Announcements & Notices' />
          <Box sx={{ ml: 'auto' }}>
            <Link to={'/notices'} className='black-link'>
              <Button
                color='inherit'
                size='small'
                variant='text'
                endIcon={<ArrowOutward fontSize='small' />}
              >
                View All
              </Button>
            </Link>
          </Box>
        </Box>
        <SubSoftText text='Latest announcements and notices' />
        <Box mt={2} />

        {notices.length <= 0 ? (
          <DataNotFound />
        ) : (
          notices.map((notice) => <NoticeItem key={notice.id} notice={notice} />)
        )}
      </CardContent>
    </Card>
  );
};
