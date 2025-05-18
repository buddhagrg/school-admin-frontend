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

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RolesData, void>({
      query: () => `/roles`,
      providesTags: (result) =>
        result?.roles?.map(({ id }) => {
          return { type: Tag.ROLES, id };
        }) || [{ type: Tag.ROLES }]
    }),
    getRoleUsers: builder.query<RoleUsersData, number>({
      query: (id) => `/roles/${id}/users`,
      providesTags: (result) =>
        result?.users.map(({ id }) => {
          return { type: Tag.ROLE_USERS, id };
        }) || [{ type: Tag.ROLE_USERS }]
    }),
    addNewRole: builder.mutation<ApiResponseSuccessMessage, Omit<RoleFormProps, 'id'>>({
      query: (payload) => ({
        url: `/roles`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ROLES])
    }),
    updateRole: builder.mutation<ApiResponseSuccessMessage, RoleFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.ROLES, id }])
    }),
    getRolePermissions: builder.query<RolePermissionsData, number>({
      query: (id) => `/roles/${id}/permissions`,
      providesTags: (result) =>
        result?.permissions.map(({ id }) => {
          return { type: Tag.ROLE_PERMISSIONS, id };
        }) || [{ type: Tag.ROLE_PERMISSIONS }]
    }),
    saveRolePermissions: builder.mutation<ApiResponseSuccessMessage, RolePermission>({
      query: ({ roleId, permissions }) => ({
        url: `/roles/${roleId}/permissions`,
        method: 'POST',
        body: { permissions }
      }),
      invalidatesTags: (_result, error, { roleId: id }) =>
        error ? [] : [{ type: Tag.ROLE_PERMISSIONS, id }]
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
