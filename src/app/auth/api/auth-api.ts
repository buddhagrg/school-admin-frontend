import { api } from '@/api';
import {
  LoginRequest,
  PasswordProps,
  SchoolProfileProps,
  SetupPasswordProps,
  User,
  UserId
} from '../types';
import { AdminStaffProps } from '@/app/staff/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (payload) => ({
        url: `/auth/login`,
        method: 'POST',
        body: payload
      })
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST'
      })
    }),
    changePwd: builder.mutation<{ message: string }, PasswordProps>({
      query: (payload) => ({
        url: `/account/change-password`,
        method: 'POST',
        body: payload
      })
    }),
    setupPassword: builder.mutation<{ message: string }, SetupPasswordProps>({
      query: (payload) => ({
        url: `/auth/setup-password`,
        method: 'POST',
        body: payload
      })
    }),
    resendVerificationEmail: builder.mutation<{ message: string }, UserId>({
      query: (payload) => ({
        url: `/auth/resend-email-verification`,
        method: 'POST',
        body: payload
      })
    }),
    resendPwdSetupLink: builder.mutation<{ message: string }, UserId>({
      query: (payload) => ({
        url: `/auth/resend-pwd-setup-link`,
        method: 'POST',
        body: payload
      })
    }),
    resetPwd: builder.mutation<{ message: string }, UserId>({
      query: (payload) => ({
        url: `/auth/reset-pwd`,
        method: 'POST',
        body: payload
      })
    }),
    setupAdminProfile: builder.mutation<
      { message: string },
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
