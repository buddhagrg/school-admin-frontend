import { baseApi } from '@/api';
import type {
  LoginRequest,
  ResetPwdFormProps,
  SetupPasswordPropsWithToken,
  User,
  UserId
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (payload) => ({
        url: `/auth/login`,
        method: 'POST',
        body: payload
      })
    }),
    logout: builder.mutation<ApiResponseSuccessMessage, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST'
      })
    }),
    setupPassword: builder.mutation<ApiResponseSuccessMessage, SetupPasswordPropsWithToken>({
      query: (payload) => ({
        url: `/auth/setup-password`,
        method: 'POST',
        body: payload
      })
    }),
    resendVerificationEmail: builder.mutation<ApiResponseSuccessMessage, UserId>({
      query: (payload) => ({
        url: `/auth/resend-email-verification`,
        method: 'POST',
        body: payload
      })
    }),
    resendPwdSetupLink: builder.mutation<ApiResponseSuccessMessage, UserId>({
      query: (payload) => ({
        url: `/auth/resend-pwd-setup-link`,
        method: 'POST',
        body: payload
      })
    }),
    resetPwd: builder.mutation<ApiResponseSuccessMessage, UserId>({
      query: (payload) => ({
        url: `/auth/reset-user-pwd`,
        method: 'POST',
        body: payload
      })
    }),
    resetMyPwd: builder.mutation<ApiResponseSuccessMessage, ResetPwdFormProps>({
      query: ({ email }) => ({
        url: `/auth/reset-my-pwd`,
        method: 'POST',
        body: { email }
      })
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSetupPasswordMutation,
  useResendVerificationEmailMutation,
  useResendPwdSetupLinkMutation,
  useResetPwdMutation,
  useResetMyPwdMutation
} = authApi;
