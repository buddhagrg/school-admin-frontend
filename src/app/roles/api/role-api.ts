import { api, Tag } from '@/api';
import {
  AddEditRoleProps,
  RolePermission,
  RolePermissionsData,
  RolesData,
  HandleRoleStatusProps,
  RoleUsersData
} from '../types';

export const roleApi = api.injectEndpoints({
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
    getRolePermissions: builder.query<RolePermissionsData, number>({
      query: (id) => `/roles/${id}/permissions`,
      providesTags: (result) =>
        result?.permissions.map(({ id }) => {
          return { type: Tag.ROLE_PERMISSIONS, id };
        }) || [{ type: Tag.ROLE_PERMISSIONS }]
    }),
    addNewRole: builder.mutation<{ message: string }, Omit<AddEditRoleProps, 'id'>>({
      query: (payload) => ({
        url: `/roles`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ROLES])
    }),
    updateRole: builder.mutation<{ message: string }, AddEditRoleProps>({
      query: ({ id, ...payload }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.ROLES, id }])
    }),
    updateRoleStatus: builder.mutation<{ message: string }, HandleRoleStatusProps>({
      query: ({ id, status }) => ({
        url: `/roles/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.ROLES, id }])
    }),
    assignRolePermissions: builder.mutation<{ message: string }, RolePermission>({
      query: ({ id, permissions }) => ({
        url: `/roles/${id}/permissions`,
        method: 'POST',
        body: { permissions }
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.ROLE_PERMISSIONS, id }]
    }),
    deleteRolePermissions: builder.mutation<{ message: string }, RolePermission>({
      query: ({ id, permissions }) => ({
        url: `/roles/${id}/permissions`,
        method: 'DELETE',
        body: { permissions }
      }),
      invalidatesTags: (_result, error, { id }) =>
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
  useUpdateRoleStatusMutation,
  useAssignRolePermissionsMutation,
  useDeleteRolePermissionsMutation
} = roleApi;
