import { Box, Grid2 } from '@mui/material';

import { AdminDashboardProps } from '../dashboard-type';
import { useGetDashboardDataQuery } from '../dashboard-api';
import { ListDashboardStat } from './list-dashboard-stat';
import { Notices } from './notices/notices';
import { OneMonthLeave } from './one-month-leave/one-month-leave';
import { Celebrations } from './celebrations/celebrations';
import { PageContentHeader } from '@/shared/components';

export const AdminDashboard = () => {
  const { data } = useGetDashboardDataQuery();
  const { students, teachers, parents, notices, celebrations, oneMonthLeave } =
    data as AdminDashboardProps;

  return (
    <>
      <PageContentHeader
        title='Dashboard'
        subtitle={`Welcome back! Here's what's happening today.`}
      />
      <Box mt={3} />
      <Grid2 container spacing={3}>
        <ListDashboardStat students={students} teachers={teachers} parents={parents} />

        <Grid2 container size={{ xs: 12 }} spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Notices notices={notices} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <OneMonthLeave leaves={oneMonthLeave} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Celebrations celebrations={celebrations} />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};
