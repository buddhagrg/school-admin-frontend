import { api, Tag } from "@/api";
import { AddEditRoleProps, MenuData, RolePermission, RolePermissionsData, RolesData, HandleRoleStatus, RoleUsersData, UserRole } from "../types";

export const rolesAndPermissionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMenus: builder.query<MenuData, void>({
            query: () => `/menus`,
            providesTags: (result) => result?.menus.map(({ id }) => {
                return { type: Tag.MENUS, id }
            }) || [{ type: Tag.MENUS }]
        }),
        getRoles: builder.query<RolesData, void>({
            query: () => `/roles`,
            providesTags: (result) => result?.roles?.map(({ id }) => {
                return { type: Tag.ROLES, id }
            }) || [{ type: Tag.ROLES }]
        }),
        getRoleUsers: builder.query<RoleUsersData, number | null>({
            query: (id) => `/roles/${id}/users`,
            providesTags: (result) => result?.users.map(({ id }) => {
                return { type: Tag.ROLE_USERS, id }
            }) || [{ type: Tag.ROLE_USERS }]
        }),
        getRolePermissions: builder.query<RolePermissionsData, number | null>({
            query: (id) => `/roles/${id}/permissions`,
            providesTags: (result) => result?.permissions.map(({ id }) => {
                return { type: Tag.ROLE_PERMISSIONS, id }
            }) || [{ type: Tag.ROLE_PERMISSIONS }]
        }),
        addNewRole: builder.mutation<{ message: string }, Omit<AddEditRoleProps, "id">>({
            query: (payload) => ({
                url: `/roles`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: (result) => result
                ? [Tag.ROLES]
                : []
        }),
        updateRole: builder.mutation<{ message: string }, AddEditRoleProps>({
            query: ({ id, ...payload }) => ({
                url: `/roles/${id}`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: (result, _error, { id }) => result
                ? [{ type: Tag.ROLES, id }] : []
        }),
        handleRoleStatus: builder.mutation<{ message: string }, HandleRoleStatus>({
            query: ({ id, status }) => ({
                url: `/roles/${id}/status`,
                method: "POST",
                body: { status }
            }),
            invalidatesTags: (result, _error, { id }) => result
                ? [{ type: Tag.ROLES, id }] : []
        }),
        updateRolePermission: builder.mutation<{ message: string }, RolePermission>({
            query: ({ id, permissions }) => ({
                url: `/roles/${id}/permissions`,
                method: "POST",
                body: { permissions }
            }),
            invalidatesTags: (result, _error, { id }) => result
                ? [{ type: Tag.ROLE_PERMISSIONS, id }] : []
        }),
        switchUserRole: builder.mutation<{ message: string }, UserRole>({
            query: ({ id, roleId }) => ({
                url: `/roles/switch`,
                method: "POST",
                body: {
                    userId: id,
                    roleId
                }
            }),
            invalidatesTags: [Tag.ROLE_USERS, Tag.ROLES]
        }),
    }),
});

export const {
    useGetMenusQuery,
    useLazyGetMenusQuery,
    useLazyGetRolesQuery,
    useGetRolesQuery,
    useLazyGetRoleUsersQuery,
    useLazyGetRolePermissionsQuery,
    useAddNewRoleMutation,
    useUpdateRoleMutation,
    useHandleRoleStatusMutation,
    useUpdateRolePermissionMutation,
    useSwitchUserRoleMutation,
} = rolesAndPermissionsApi;
