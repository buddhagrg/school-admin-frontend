import { api, Tag } from '@/api';
import { AddEditPermissionProps, AddEditPermissionPropsWithId, PermissionData } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const permissionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<PermissionData, void>({
      query: () => `/permissions`,
      providesTags: (result) =>
        result?.permissions?.map(({ id }) => {
          return { type: Tag.PERMISSIONS, id };
        }) || [{ type: Tag.PERMISSIONS }]
    }),
    addPermission: builder.mutation<ApiResponseSuccessMessage, AddEditPermissionProps>({
      query: (payload) => ({
        url: `/permissions`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.PERMISSIONS, Tag.MY_PERMISSIONS])
    }),
    updatePermission: builder.mutation<ApiResponseSuccessMessage, AddEditPermissionPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.PERMISSIONS, id }, Tag.MY_PERMISSIONS]
    }),
    deletePermission: builder.mutation<ApiResponseSuccessMessage, number>({
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
