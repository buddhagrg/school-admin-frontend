import { baseApi, Tag } from '@/api';
import type {
  RoleFormProps,
  RolePermission,
  RolePermissionsData,
  RolesData,
  RoleUsersData,
  RoleFormPropsWithId
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RolesData, void>({
      query: () => `/roles`,
      providesTags: (result) => providesListTags(result?.roles, Tag.ROLES)
    }),
    getRoleUsers: builder.query<RoleUsersData, number>({
      query: (roleId) => `/roles/${roleId}/users`,
      providesTags: (result, _error, roleId) => [
        ...(result?.users.map(({ id }) => ({
          type: Tag.ROLE_USERS,
          id
        })) || [{ type: Tag.ROLE_USERS, id: `LIST-${roleId}` }])
      ]
    }),
    addNewRole: builder.mutation<ApiResponseSuccessMessage, Omit<RoleFormProps, 'id'>>({
      query: (payload) => ({
        url: `/roles`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.ROLES }]
    }),
    updateRole: builder.mutation<ApiResponseSuccessMessage, RoleFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.ROLES, id },
        { type: Tag.ROLES, id: Tag.LIST }
      ]
    }),
    getRolePermissions: builder.query<RolePermissionsData, number>({
      query: (roleId) => `/roles/${roleId}/permissions`,
      providesTags: (result, _error, roleId) => [
        ...(result?.permissions.map(({ id }) => ({ type: Tag.ROLE_PERMISSIONS, id })) || [
          { type: Tag.ROLE_PERMISSIONS, id: `LIST-${roleId}` }
        ])
      ]
    }),
    saveRolePermissions: builder.mutation<ApiResponseSuccessMessage, RolePermission>({
      query: ({ roleId, permissions }) => ({
        url: `/roles/${roleId}/permissions`,
        method: 'POST',
        body: { permissions }
      }),
      invalidatesTags: (_result, _error, { roleId }) => [
        { type: Tag.ROLE_PERMISSIONS, id: `LIST-${roleId}` }
      ]
    })
  })
});

export const {
  useGetRolesQuery,
  useGetRoleUsersQuery,
  useGetRolePermissionsQuery,
  useAddNewRoleMutation,
  useUpdateRoleMutation,
  useSaveRolePermissionsMutation
} = rolesApi;
