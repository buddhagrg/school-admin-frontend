import { api, Tag } from '@/api';
import { AddEditAccessControlProps, AddEditAccessControlWithId } from '../types';

export const accessControlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addAccessControl: builder.mutation<{ message: string }, AddEditAccessControlProps>({
      query: (payload) => ({
        url: `/admin/access-controls`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.PERMISSIONS, Tag.MY_PERMISSIONS]
    }),
    updateAccessControl: builder.mutation<{ message: string }, AddEditAccessControlWithId>({
      query: ({ id, ...payload }) => ({
        url: `/admin/access-controls/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (result, _error, { id }) =>
        result ? [{ type: Tag.PERMISSIONS, id }, Tag.MY_PERMISSIONS] : []
    }),
    deleteAccessControl: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/admin/access-controls/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.PERMISSIONS, Tag.MY_PERMISSIONS]
    })
  })
});

export const {
  useAddAccessControlMutation,
  useUpdateAccessControlMutation,
  useDeleteAccessControlMutation
} = accessControlApi;
