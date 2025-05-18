import type { GetStaffDetail, StaffData, StaffFormProps, StaffFormPropsWithId } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { StaffAccount } from '../account/account-type';
import { baseApi, Tag } from '@/api';

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<StaffData, void>({
      query: () => `/staff`,
      providesTags: (result) =>
        result?.staff?.map(({ id }) => {
          return { type: Tag.STAFF, id };
        }) || [{ type: Tag.STAFF }]
    }),
    getStaffDetail: builder.query<StaffAccount, GetStaffDetail>({
      query: ({ id, mode }) => `/staff/${id}?mode=${mode}`,
      providesTags: (result) => (result ? [{ type: Tag.STAFF, id: result.id }] : [])
    }),
    addStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormProps>({
      query: (payload) => ({
        url: `/staff`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.STAFF])
    }),
    updateStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/staff/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.STAFF, id }])
    })
  })
});

export const {
  useGetStaffQuery,
  useGetStaffDetailQuery,
  useAddStaffMutation,
  useUpdateStaffMutation
} = staffApi;
