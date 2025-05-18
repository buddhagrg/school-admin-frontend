import { useEffect } from 'react';
import { Grid2, LinearProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

import { useStaffDetail } from '@/features/staff/staff-context-provider';
import { AccountTabs } from './account-tabs';
import { StaffAccountPersonal } from './staff-account-personal';
import { StaffMiniProfileView } from '@/features/staff/components/views/staff-mini-profile-view';
import { useGetMyAccountDetailQuery } from '../account-api';
import { StaffAccount } from '../account-type';

export const ViewStaffAccount = () => {
  const { data, isLoading } = useGetMyAccountDetailQuery('view');
  const { setState, state } = useStaffDetail();
  const pwdLastChanged = state?.passwordLastChangedDate || '';
  const recentDeviceInfo = state?.recentDeviceInfo || '';
  const lastLoginDate = state?.lastLogin || '';

  useEffect(() => {
    if (data) {
      setState(data as StaffAccount);
    }
  }, [data]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Grid2 container spacing={3}>
        <Grid2
          size={12}
          sx={{ bgcolor: blue[800], p: 2, color: 'white', borderRadius: '8px 8px 0px 0px' }}
        >
          <StaffMiniProfileView />
        </Grid2>
        <Grid2 size={12}>
          <AccountTabs
            component={<StaffAccountPersonal />}
            pwdLastChanged={pwdLastChanged}
            recentDeviceInfo={recentDeviceInfo}
            lastLoginDate={lastLoginDate}
          />
        </Grid2>
      </Grid2>
    </>
  );
};
