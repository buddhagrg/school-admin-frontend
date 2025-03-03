import { api } from '@/api';
import {
  LoginRequest,
  PasswordProps,
  SchoolProfileProps,
  SetupPasswordProps,
  User,
  UserId
} from './types';
import { AdminStaffProps } from '@/app/staff/types';
import { ApiResponseSuccessMessage } from '@/types';

export const authApi = api.injectEndpoints({
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
    changePwd: builder.mutation<ApiResponseSuccessMessage, PasswordProps>({
      query: (payload) => ({
        url: `/account/change-password`,
        method: 'POST',
        body: payload
      })
    }),
    setupPassword: builder.mutation<ApiResponseSuccessMessage, SetupPasswordProps>({
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
        url: `/auth/reset-pwd`,
        method: 'POST',
        body: payload
      })
    }),
    setupAdminProfile: builder.mutation<
      ApiResponseSuccessMessage,
      AdminStaffProps & { schoolId: number }
    >({
      query: (payload) => ({
        url: `/auth/admin-profile`,
        method: 'POST',
        body: payload
      })
    }),
    setupSchoolProfile: builder.mutation<{ message: string; schoolId: number }, SchoolProfileProps>(
      {
        query: (payload) => ({
          url: `/auth/school-profile`,
          method: 'POST',
          body: payload
        })
      }
    )
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePwdMutation,
  useSetupPasswordMutation,
  useResendVerificationEmailMutation,
  useResendPwdSetupLinkMutation,
  useResetPwdMutation,
  useSetupAdminProfileMutation,
  useSetupSchoolProfileMutation
} = authApi;
