import { format } from 'date-fns';
import { ArrowOutwardOutlined, GroupRemoveOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent } from '@mui/material';

import { OneMonthLeaveItem } from './one-month-leave-item';
import type { LeaveDetail } from '@/shared/types';
import { DataNotFound, SubSoftText, TitleText } from '@/shared/components';

export const OneMonthLeave = ({ leaves }: { leaves: LeaveDetail[] }) => {
  const currentMonthAndYear = format(new Date(), 'MMMM yyyy');

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GroupRemoveOutlined color='primary' />
            <TitleText text={`Who's Out This Month`} />
          </Box>
          <Button
            sx={{ ml: 'auto' }}
            endIcon={<ArrowOutwardOutlined fontSize='small' />}
            variant='text'
            color='inherit'
            size='small'
          >
            View All
          </Button>
        </Box>
        <SubSoftText text={`Users on leave in ${currentMonthAndYear}`} />
        <Box mt={3} />

        {leaves.length <= 0 ? (
          <DataNotFound />
        ) : (
          leaves.map((leave) => <OneMonthLeaveItem leave={leave} />)
        )}
      </CardContent>
    </Card>
  );
};
