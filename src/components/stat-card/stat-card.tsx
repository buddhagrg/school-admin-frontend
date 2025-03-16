import { FC } from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { StatCardProps } from '@/types';

export const StatCard: FC<StatCardProps> = ({ title, stat, icon, bgColor, sideIcon }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 50, height: 50, bgcolor: bgColor }}>{icon}</Avatar>
          <Box>
            <Typography component='div' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h5' fontWeight='bold'>
                {stat}
              </Typography>
              {sideIcon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
