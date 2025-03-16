import { Grid2 } from '@mui/material';
import { useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import {
  Celebrations,
  LeavePolicyDetail,
  ListDashboardStat,
  Notices,
  WhoIsOut
} from './components';
import { getUserRole } from '@/app/auth/auth-slice';
import { DashboardProps } from './dashboard-type';
import { useGetDashboardDataQuery } from './dashboard-api';

export const Dashboard = () => {
  const currentUserRole = useSelector(getUserRole);
  const { data, isLoading, isError, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return <>loading...</>;
  }
  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }
  if (!data) {
    return <>No data available</>;
  }

  const { students, teachers, parents, notices, leavePolicies, celebrations, oneMonthLeave } =
    data as DashboardProps;
  return (
    <Grid2 container spacing={3}>
      {currentUserRole === 'admin' && (
        <ListDashboardStat students={students} teachers={teachers} parents={parents} />
      )}

      <Grid2 container size={{ xs: 12 }} spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <LeavePolicyDetail leavePolicies={leavePolicies} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Notices notices={notices} />
        </Grid2>
      </Grid2>

      <Grid2 container size={{ xs: 12 }} spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Celebrations celebrations={celebrations} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <WhoIsOut whoIsOut={oneMonthLeave} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
