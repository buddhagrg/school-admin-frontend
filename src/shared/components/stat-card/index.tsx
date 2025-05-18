import { Avatar, Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import type { StatCardProps } from '@/shared/types';

export const StatCard = ({ stat }: { stat: StatCardProps }) => {
  const { title, totalCount, percentDiff, icon, bgColor } = stat;
  const color = percentDiff < 0 ? 'error' : 'success';
  const trend =
    percentDiff < 0 ? (
      <TrendingDown fontSize='small' color={color} />
    ) : (
      <TrendingUp fontSize='small' color={color} />
    );
  const sign = percentDiff < 0 ? '-' : '+';

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography color='textSecondary'>{title}</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <Typography variant='h4' fontWeight='bold'>
                {totalCount}
              </Typography>
              <Chip
                size='small'
                icon={trend}
                variant='outlined'
                sx={{ p: 1 }}
                label={
                  <Typography
                    variant='body2'
                    fontWeight={600}
                    color={color}
                  >{`${sign}${percentDiff}%`}</Typography>
                }
              />
            </Box>
          </Box>
          <Avatar sx={{ width: 45, height: 45, bgcolor: bgColor, ml: 'auto' }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};
