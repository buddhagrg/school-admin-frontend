import { api, Tag } from '@/api';
import { UserFilterProps, UsersData } from '../types';
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
    })
  })
});

export const { useGetUsersQuery } = manageUsersApi;
