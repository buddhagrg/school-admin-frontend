import type { ApiResponseSuccessMessage } from '@/shared/types';
import type { AccountMeResponse, AccountMode } from './account-type';
import type { PasswordProps } from '../auth/types';
import { baseApi, Tag } from '@/api';

const atccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAccountDetail: builder.query<AccountMeResponse, AccountMode>({
      query: (mode) => `/account/me?mode=${mode}`,
      providesTags: (_result, error) => (error ? [] : [Tag.MY_ACCOUNT])
    }),
    changeAccountPassword: builder.mutation<ApiResponseSuccessMessage, PasswordProps>({
      query: (payload) => ({
        url: `/account/change-password`,
        method: 'POST',
        body: payload
      })
    })
  })
});

export const { useGetMyAccountDetailQuery, useChangeAccountPasswordMutation } = atccountApi;
