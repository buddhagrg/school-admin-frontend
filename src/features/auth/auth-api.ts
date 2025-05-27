import { baseApi } from '@/api';
import type {
  LoginRequest,
  ForgotPwdFormProps,
  PasswordActionFormPropsWithToken,
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
    setupPassword: builder.mutation<ApiResponseSuccessMessage, PasswordActionFormPropsWithToken>({
      query: ({ token, ...payload }) => ({
        url: `/auth/password/setup?token=${token}`,
        method: 'POST',
        body: payload
      })
    }),
    resendVerificationEmail: builder.mutation<ApiResponseSuccessMessage, UserId>({
      query: (payload) => ({
        url: `/auth/email/resend-verification`,
        method: 'POST',
        body: payload
      })
    }),
    resendPwdSetupLink: builder.mutation<ApiResponseSuccessMessage, UserId>({
      query: (payload) => ({
        url: `/auth/password/resend-setup-link`,
        method: 'POST',
        body: payload
      })
    }),
    requestPwdReset: builder.mutation<ApiResponseSuccessMessage, ForgotPwdFormProps>({
      query: (payload) => ({
        url: `/auth/password/reset/request`,
        method: 'POST',
        body: payload
      })
    }),
    resetPwd: builder.mutation<ApiResponseSuccessMessage, PasswordActionFormPropsWithToken>({
      query: ({ token, ...payload }) => ({
        url: `/auth/password/reset/confirm?token=${token}`,
        method: 'PATCH',
        body: payload
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
  useRequestPwdResetMutation,
  useResetPwdMutation
} = authApi;
