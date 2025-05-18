import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { HeadingText } from '@/shared/components';

type LeavePolicyItemProps = {
  name: string;
  daysUsed: number;
};
export const LeavePolicyItem: React.FC<LeavePolicyItemProps> = ({ name, daysUsed }) => {
  return (
    <Card>
      <CardContent>
        <HeadingText text={name} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            Used: {daysUsed} days
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
