import type { ApiResponseSuccessMessage } from '@/shared/types';
import type {
  AddUserToPolicy,
  EligiblePolicyUsers,
  LeavePolicyData,
  MyLeavePolicyData,
  PolicyFormProps,
  PolicyFormPropsWithId,
  PolicyUserData,
  RemoveUserFromPolicy
} from './types';
import { baseApi, Tag } from '@/api';

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicies: builder.query<LeavePolicyData, void>({
      query: () => '/leaves/policies',
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.LEAVE_POLICIES, id };
        }) || [{ type: Tag.LEAVE_POLICIES }]
    }),
    getMyLeavePolicies: builder.query<MyLeavePolicyData, void>({
      query: () => `/leaves/policies/my`,
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.MY_LEAVE_POLICIES, id };
        }) || [{ type: Tag.MY_LEAVE_POLICIES }]
    }),
    getEligibleLeavePolicyUsers: builder.query<EligiblePolicyUsers, void>({
      query: () => `leaves/policies/eligible-users`,
      providesTags: (result) =>
        result?.users.map(({ id }) => {
          return { type: Tag.LEAVE_ELIGIBLE_USERS, id };
        }) || [{ type: Tag.LEAVE_ELIGIBLE_USERS }]
    }),
    getLeavePolicyUsers: builder.query<PolicyUserData, number>({
      query: (id) => `/leaves/policies/${id}/users`,
      providesTags: (result) =>
        result?.users.map(({ id }) => {
          return { type: Tag.LEAVE_POLICY_USERS, id };
        }) || [{ type: Tag.LEAVE_POLICY_USERS }]
    }),
    addLeavePolicy: builder.mutation<ApiResponseSuccessMessage, PolicyFormProps>({
      query: (payload) => ({
        url: `/leaves/policies`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.LEAVE_POLICIES])
    }),
    updateLeavePolicy: builder.mutation<ApiResponseSuccessMessage, PolicyFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/leaves/policies/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.LEAVE_POLICIES, id }])
    }),
    addUserToPolicy: builder.mutation<ApiResponseSuccessMessage, AddUserToPolicy>({
      query: ({ users, id }) => ({
        url: `/leaves/policies/${id}/users`,
        method: 'PUT',
        body: { users }
      }),
      invalidatesTags: (_result, error) =>
        error
          ? []
          : [
              Tag.LEAVE_POLICY_USERS,
              Tag.LEAVE_ELIGIBLE_USERS,
              Tag.LEAVE_POLICIES,
              Tag.MY_LEAVE_POLICIES
            ]
    }),
    removeUserFromPolicy: builder.mutation<ApiResponseSuccessMessage, RemoveUserFromPolicy>({
      query: ({ userId, policyId }) => ({
        url: `/leaves/policies/${policyId}/users/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) =>
        error
          ? []
          : [
              Tag.LEAVE_POLICY_USERS,
              Tag.LEAVE_ELIGIBLE_USERS,
              Tag.LEAVE_POLICIES,
              Tag.MY_LEAVE_POLICIES
            ]
    })
  })
});

export const {
  useGetLeavePoliciesQuery,
  useGetEligibleLeavePolicyUsersQuery,
  useGetLeavePolicyUsersQuery,
  useAddLeavePolicyMutation,
  useUpdateLeavePolicyMutation,
  useAddUserToPolicyMutation,
  useRemoveUserFromPolicyMutation,
  useGetMyLeavePoliciesQuery
} = leaveApi;
