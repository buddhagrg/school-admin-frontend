import type { GetStaffDetail, StaffData, StaffFormProps, StaffFormPropsWithId } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { StaffAccount } from '../account/account-type';
import { baseApi, Tag } from '@/api';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<StaffData, void>({
      query: () => `/staff`,
      providesTags: (result) => providesListTags(result?.staff, Tag.STAFF)
    }),
    getStaffDetail: builder.query<StaffAccount, GetStaffDetail>({
      query: ({ id, mode }) => `/staff/${id}?mode=${mode}`,
      providesTags: (_result, _error, { id }) => [{ type: Tag.STAFF_DETAIL, id }]
    }),
    addStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormProps>({
      query: (payload) => ({
        url: `/staff`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.STAFF }]
    }),
    updateStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/staff/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.STAFF, id },
        { type: Tag.STAFF, id: Tag.LIST },
        { type: Tag.STAFF_DETAIL, id }
      ]
    })
  })
});

export const {
  useGetStaffQuery,
  useGetStaffDetailQuery,
  useAddStaffMutation,
  useUpdateStaffMutation
} = staffApi;
