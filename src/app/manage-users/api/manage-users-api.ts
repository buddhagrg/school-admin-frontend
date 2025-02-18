import { api, Tag } from '@/api';
import { UserFilterProps, UsersData, UserSystemAccessRequest } from '../types';
import { getQueryString } from '@/utils/helpers/get-query-string';

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
    handleUserSystemAccess: builder.mutation<{ message: string }, UserSystemAccessRequest>({
      query: ({ id, hasSystemAccess }) => ({
        url: `/users/${id}/system-access`,
        method: 'POST',
        body: { hasSystemAccess }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.USERS, id }])
    })
  })
});

export const { useGetUsersQuery, useHandleUserSystemAccessMutation } = manageUsersApi;
