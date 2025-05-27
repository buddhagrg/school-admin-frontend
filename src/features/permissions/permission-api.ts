import { baseApi, Tag } from '@/api';
import type { AddEditPermissionProps, AddEditPermissionPropsWithId, PermissionData } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const permissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<PermissionData, void>({
      query: () => `/permissions`,
      providesTags: (result) => providesListTags(result?.permissions, Tag.PERMISSIONS)
    }),
    addPermission: builder.mutation<ApiResponseSuccessMessage, AddEditPermissionProps>({
      query: (payload) => ({
        url: `/permissions`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.PERMISSIONS }]
    }),
    updatePermission: builder.mutation<ApiResponseSuccessMessage, AddEditPermissionPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.PERMISSIONS, id },
        { type: Tag.PERMISSIONS, id: Tag.LIST }
      ]
    }),
    deletePermission: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tag.PERMISSIONS, id },
        { type: Tag.PERMISSIONS, id: Tag.LIST }
      ]
    })
  })
});

export const {
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
  useGetPermissionsQuery
} = permissionApi;
