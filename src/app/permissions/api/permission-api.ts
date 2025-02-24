import { api, Tag } from '@/api';
import { AddEditPermissionProps, AddEditPermissionPropsWithId, PermissionData } from '../types';

export const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<PermissionData, void>({
      query: () => `/permissions`,
      providesTags: (result) =>
        result?.permissions?.map(({ id }) => {
          return { type: Tag.PERMISSIONS, id };
        }) || [{ type: Tag.PERMISSIONS }]
    }),
    addPermission: builder.mutation<{ message: string }, AddEditPermissionProps>({
      query: (payload) => ({
        url: `/permissions`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.PERMISSIONS, Tag.MY_PERMISSIONS])
    }),
    updatePermission: builder.mutation<{ message: string }, AddEditPermissionPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.PERMISSIONS, id }, Tag.MY_PERMISSIONS]
    }),
    deletePermission: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.PERMISSIONS, Tag.MY_PERMISSIONS])
    })
  })
});

export const {
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsQuery
} = permissionApi;
