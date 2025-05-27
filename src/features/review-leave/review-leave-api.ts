import { baseApi, Tag } from '@/api';
import type { RejectLeave, PendingLeavesData } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPendingLeaves: builder.query<PendingLeavesData, void>({
      query: () => `/leaves/requests/pending`,
      providesTags: (result) => providesListTags(result?.pendingLeaves, Tag.PENDING_LEAVES)
    }),
    approveLeaveRequest: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/leaves/requests/pending/${id}/approve`,
        method: 'PATCH'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tag.PENDING_LEAVES, id },
        { type: Tag.PENDING_LEAVES, id: Tag.LIST }
      ]
    }),
    rejectLeaveRequest: builder.mutation<ApiResponseSuccessMessage, RejectLeave>({
      query: ({ id, note }) => ({
        url: `/leaves/requests/pending/${id}/reject`,
        method: 'PATCH',
        body: { note }
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.PENDING_LEAVES, id },
        { type: Tag.PENDING_LEAVES, id: Tag.LIST }
      ]
    })
  })
});

export const {
  useGetPendingLeavesQuery,
  useApproveLeaveRequestMutation,
  useRejectLeaveRequestMutation
} = leaveApi;
