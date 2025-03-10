import { FC } from 'react';
import { LockPerson } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { getTextColor } from '@/utils/helpers/get-text-color';

type ViewOtherInfoProps = {
  hasSystemAccess: boolean;
  reporterName?: string | null;
};
export const ViewOtherInfo: FC<ViewOtherInfoProps> = ({ hasSystemAccess, reporterName }) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LockPerson sx={{ mr: 1 }} />
          <Typography variant='h6'>Other Info</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='subtitle2'>Has System Access : &nbsp;</Typography>
          <Typography variant='body1' sx={getTextColor(hasSystemAccess)}>
            {hasSystemAccess ? 'Yes' : 'No'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='subtitle2'>Reports To : &nbsp;</Typography>
          <Typography variant='body1'>{reporterName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
