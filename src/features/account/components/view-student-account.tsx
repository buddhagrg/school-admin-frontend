import { useEffect } from 'react';
import { Grid2, LinearProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

import { useStudentDetail } from '@/features/students/student-context-provider';
import { StudentAccountPersonal } from './student-account-personal';
import { AccountTabs } from './account-tabs';
import { StudentMiniProfileView } from '@/features/students/components/views/student-mini-profile-view';
import { useGetMyAccountDetailQuery } from '../account-api';
import { StudentAccount } from '../account-type';

export const ViewStudentAccount = () => {
  const { data, isLoading } = useGetMyAccountDetailQuery('view');
  const { setState, state } = useStudentDetail();
  const pwdLastChanged = state?.passwordLastChangedDate || '';
  const recentDeviceInfo = state?.recentDeviceInfo || '';
  const lastLoginDate = state?.lastLogin || '';

  useEffect(() => {
    if (data) {
      setState(data as StudentAccount);
    }
  }, [data, setState]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Grid2 container spacing={3}>
        <Grid2
          size={12}
          sx={{ bgcolor: blue[800], p: 2, color: 'white', borderRadius: '8px 8px 0px 0px' }}
        >
          <StudentMiniProfileView />
        </Grid2>

        <AccountTabs
          component={<StudentAccountPersonal />}
          pwdLastChanged={pwdLastChanged}
          recentDeviceInfo={recentDeviceInfo}
          lastLoginDate={lastLoginDate}
        />
      </Grid2>
    </>
  );
};
