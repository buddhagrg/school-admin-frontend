import { api, Tag } from '@/api';
import { StaffData, StaffFormProps, StaffFormPropsWithId } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const staffApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<StaffData, void>({
      query: () => `/staff`,
      providesTags: (result) =>
        result?.staff?.map(({ id }) => {
          return { type: Tag.STAFF, id };
        }) || [{ type: Tag.STAFF }]
    }),
    getStaffDetail: builder.query<StaffFormPropsWithId, string | undefined>({
      query: (id) => (id ? `/staff/${id}` : `/account/me`),
      providesTags: (result) => (result ? [{ type: Tag.STAFF, id: result.id }] : [])
    }),
    addStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormProps>({
      query: (payload) => ({
        url: `/staff`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.USERS])
    }),
    updateStaff: builder.mutation<ApiResponseSuccessMessage, StaffFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/staff/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.USERS, id }])
    })
  })
});

export const {
  useGetStaffQuery,
  useGetStaffDetailQuery,
  useAddStaffMutation,
  useUpdateStaffMutation
} = staffApi;
