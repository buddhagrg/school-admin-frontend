import { api } from "@/app/api";
import { Tag } from "@/app/tag-types";
import { DashboardProps } from "../types";

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardProps, void>({
            query: () => "/dashboard",
            providesTags: [Tag.DASHBOARD]
        }),
    })
});

export const {
    useGetDashboardDataQuery
} = dashboardApi;