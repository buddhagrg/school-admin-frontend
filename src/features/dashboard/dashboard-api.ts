import { baseApi, Tag } from '@/api';
import { DashboardData } from './dashboard-type';

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: () => [{ type: Tag.DASHBOARD }]
    })
  })
});

export const { useGetDashboardDataQuery } = dashboardApi;
