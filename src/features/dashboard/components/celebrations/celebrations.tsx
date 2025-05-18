import { format } from 'date-fns';
import { RedeemOutlined } from '@mui/icons-material';
import { Box, Card, CardContent } from '@mui/material';

import { CelebrationProps } from '../../dashboard-type';
import { CelebrationItem } from './celebration-item';
import { DataNotFound, SubSoftText, TitleText } from '@/shared/components';

export const Celebrations = ({ celebrations }: { celebrations: CelebrationProps[] }) => {
  const currentMonthAndYear = format(new Date(), 'MMMM yyyy');

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <RedeemOutlined color='primary' />
            <TitleText text='Celebrations' />
          </Box>
        </Box>
        <SubSoftText text={`Upcoming birthdays and work anniversaries in ${currentMonthAndYear}`} />
        <Box mt={3} />

        {celebrations.length <= 0 ? (
          <DataNotFound />
        ) : (
          celebrations.map((celebration) => (
            <CelebrationItem
              key={`${celebration.event}_${celebration.user}`}
              celebration={celebration}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
