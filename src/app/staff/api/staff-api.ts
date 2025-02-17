import { api, Tag } from '@/api';
import { StaffData, StaffFormProps, StaffFormPropsWithId, StaffStatusRequest } from '../types';

export const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaffs: builder.query<StaffData, void>({
      query: () => `/staffs`,
      providesTags: (result) =>
        result?.staff?.map(({ id }) => {
          return { type: Tag.STAFF, id };
        }) || [{ type: Tag.STAFF }]
    }),
    getStaffDetail: builder.query<StaffFormPropsWithId, string | undefined>({
      query: (id) => (id ? `/staff/${id}` : `/account/me`),
      providesTags: (result) => (result ? [{ type: Tag.STAFF, id: result.id }] : [])
    }),
    handleStaffStatus: builder.mutation<{ message: string }, StaffStatusRequest>({
      query: ({ id, status }) => ({
        url: `/staff/${id}/status`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STAFF, id }, Tag.STAFF]
    }),
    addStaff: builder.mutation<{ message: string }, StaffFormProps>({
      query: (payload) => ({
        url: `/staff`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.STAFF]
    }),
    updateStaff: builder.mutation<{ message: string }, StaffFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/staff/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STAFF, id }]
    })
  })
});

export const {
  useGetStaffsQuery,
  useGetStaffDetailQuery,
  useHandleStaffStatusMutation,
  useAddStaffMutation,
  useUpdateStaffMutation
} = staffApi;
