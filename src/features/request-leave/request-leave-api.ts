import type { ApiResponseSuccessMessage } from '@/shared/types';
import type {
  LeaveFormProps,
  LeaveFormPropsWithId,
  LeaveRequestFilterProps,
  MyLeaveHistoryData
} from './types';
import { getQueryString } from '@/utils/helpers/get-query-string';
import { baseApi, Tag } from '@/api';

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyLeaveHistory: builder.query<MyLeaveHistoryData, LeaveRequestFilterProps | void | null>({
      query: (payload) => {
        const query = getQueryString(payload);
        return `/leaves/requests${query}`;
      },
      providesTags: (result) =>
        result?.leaveHistory.map(({ id }) => {
          return { type: Tag.MY_LEAVE_HISTORY, id };
        }) || [{ type: Tag.MY_LEAVE_HISTORY }]
    }),
    applyLeaveRequest: builder.mutation<ApiResponseSuccessMessage, LeaveFormProps>({
      query: (payload) => ({
        url: `/leaves/requests`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.MY_LEAVE_HISTORY, Tag.PENDING_LEAVES])
    }),
    updateLeaveRequest: builder.mutation<ApiResponseSuccessMessage, LeaveFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/leaves/requests/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error
          ? []
          : [
              { type: Tag.MY_LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
    }),
    deleteLeaveRequest: builder.mutation<ApiResponseSuccessMessage, number | undefined>({
      query: (id) => ({
        url: `/leaves/requests/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error, id) =>
        error
          ? []
          : [
              { type: Tag.MY_LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
    })
  })
});

export const {
  useGetMyLeaveHistoryQuery,
  useApplyLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation
} = leaveApi;
