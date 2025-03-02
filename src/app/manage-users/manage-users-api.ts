import { api, Tag } from '@/api';
import { UserFilterProps, UsersData, UserSystemAccessRequest } from './types';
import { getQueryString } from '@/utils/helpers/get-query-string';
import { UserRole } from '@/app/roles/types';

const manageUsersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersData, UserFilterProps>({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/users${queryString}`;
      },
      providesTags: (result) =>
        result?.users?.map(({ id }) => {
          return { type: Tag.USERS, id };
        }) || [{ type: Tag.USERS }]
    }),
    updateUserSystemAccess: builder.mutation<{ message: string }, UserSystemAccessRequest>({
      query: ({ id, hasSystemAccess }) => ({
        url: `/users/${id}/status`,
        method: 'PATCH',
        body: { hasSystemAccess }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.USERS, id }])
    }),
    switchUserRole: builder.mutation<{ message: string }, UserRole>({
      query: ({ id, roleId }) => ({
        url: `/users/${id}/switch-role`,
        method: 'POST',
        body: { roleId }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ROLE_USERS, Tag.ROLES])
    })
  })
});

export const { useGetUsersQuery, useUpdateUserSystemAccessMutation, useSwitchUserRoleMutation } =
  manageUsersApi;
