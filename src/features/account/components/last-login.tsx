import { History, PublicOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { COLORS } from '@/theme/custom-colors';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { HeadingText, SubSoftText } from '@/shared/components';

export const LastLogin = ({
  recentDeviceInfo,
  lastLoginDate
}: {
  recentDeviceInfo?: string;
  lastLoginDate?: string;
}) => {
  return (
    <Card sx={{ bgcolor: COLORS.lightDisabled }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <History fontSize='small' color='primary' sx={{ mr: 1, mt: 0.5 }} />
          <Box>
            <HeadingText text='Last successful login' />
            <SubSoftText text={`${getFormattedDate(lastLoginDate ?? '', DATE_FORMAT) || '-'}`} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <PublicOutlined sx={{ fontSize: '14px' }} />
              <Typography fontSize='14px' color='textSecondary'>
                {recentDeviceInfo}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
