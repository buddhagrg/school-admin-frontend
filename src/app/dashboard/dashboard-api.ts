import { api, Tag } from '@/api';
import { DashboardProps } from './dashboard-type';

const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardProps, void>({
      query: () => '/dashboard',
      providesTags: [Tag.DASHBOARD]
    })
  })
});

export const { useGetDashboardDataQuery } = dashboardApi;
