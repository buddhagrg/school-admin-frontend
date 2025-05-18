import { Box, Card, CardContent } from '@mui/material';
import { AccountPassword } from './account-password';
import { LastLogin } from './last-login';
import { getFormattedDateDistance } from '@/utils/helpers/date';

export const AccountSecurity = ({
  pwdLastChanged,
  recentDeviceInfo,
  lastLoginDate
}: {
  pwdLastChanged: string;
  recentDeviceInfo: string;
  lastLoginDate: string;
}) => {
  const pwdChanged =
    getFormattedDateDistance(pwdLastChanged) ||
    `You have not changed your password yet. For your account's security, consider updating it regularly.`;

  return (
    <Card>
      <CardContent>
        <AccountPassword pwdLastChanged={pwdChanged} />
        <Box mt={3} />
        <LastLogin recentDeviceInfo={recentDeviceInfo} lastLoginDate={lastLoginDate} />
      </CardContent>
    </Card>
  );
};
