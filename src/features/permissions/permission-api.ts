import { baseApi, Tag } from '@/api';
import type { AddEditPermissionProps, AddEditPermissionPropsWithId, PermissionData } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';

const permissionApi = baseApi.injectEndpoints({
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
      invalidatesTags: (_result, error) => (error ? [] : [Tag.PERMISSIONS])
    }),
    updatePermission: builder.mutation<ApiResponseSuccessMessage, AddEditPermissionPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.PERMISSIONS, id }])
    }),
    deletePermission: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.PERMISSIONS])
    })
  })
});

export const {
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsQuery
} = permissionApi;
