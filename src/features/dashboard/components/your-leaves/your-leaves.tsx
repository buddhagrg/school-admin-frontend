import { ArrowOutward, CalendarMonth } from '@mui/icons-material';
import { Box, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

import { RequestLeaveBtn } from './request-leave-btn';
import type { LeaveDetail } from '@/shared/types';
import { LeaveItem } from './leave-item';
import { DataNotFound, SubSoftText, TitleText } from '@/shared/components';

export const YourLeaves = ({ leaveHistory }: { leaveHistory: LeaveDetail[] }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarMonth fontSize='small' color='primary' />
            <TitleText text='Your Leaves' />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <RequestLeaveBtn />
            <Link to={'/leave-management/request'} className='black-link'>
              <Button
                color='inherit'
                size='small'
                variant='text'
                endIcon={<ArrowOutward fontSize='small' />}
              >
                View History
              </Button>
            </Link>
          </Box>
        </Box>
        <SubSoftText text='Your upcoming and recent leave requests' />
        <Box mt={3} />

        {leaveHistory.length <= 0 ? (
          <DataNotFound />
        ) : (
          leaveHistory.map((leave) => <LeaveItem key={leave.id} leave={leave} />)
        )}
      </CardContent>
    </Card>
  );
};
