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
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const leaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicies: builder.query<LeavePolicyData, void>({
      query: () => '/leaves/policies',
      providesTags: (result) => providesListTags(result?.leavePolicies, Tag.LEAVE_POLICIES)
    }),
    getMyLeavePolicies: builder.query<MyLeavePolicyData, void>({
      query: () => `/leaves/policies/my`,
      providesTags: (result) => providesListTags(result?.leavePolicies, Tag.MY_LEAVE_POLICIES)
    }),
    getEligibleLeavePolicyUsers: builder.query<EligiblePolicyUsers, void>({
      query: () => `leaves/policies/eligible-users`,
      providesTags: (result) => providesListTags(result?.users, Tag.LEAVE_ELIGIBLE_USERS)
    }),
    getLeavePolicyUsers: builder.query<PolicyUserData, number>({
      query: (id) => `/leaves/policies/${id}/users`,
      providesTags: (result) => providesListTags(result?.users, Tag.LEAVE_POLICY_USERS)
    }),
    addLeavePolicy: builder.mutation<ApiResponseSuccessMessage, PolicyFormProps>({
      query: (payload) => ({
        url: `/leaves/policies`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.LEAVE_POLICIES, id: Tag.LIST }]
    }),
    updateLeavePolicy: builder.mutation<ApiResponseSuccessMessage, PolicyFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/leaves/policies/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.LEAVE_POLICIES, id },
        { type: Tag.LEAVE_POLICIES, id: Tag.LIST }
      ]
    }),
    addUserToPolicy: builder.mutation<ApiResponseSuccessMessage, AddUserToPolicy>({
      query: ({ users, id }) => ({
        url: `/leaves/policies/${id}/users`,
        method: 'PUT',
        body: { users }
      }),
      invalidatesTags: [
        { type: Tag.LEAVE_POLICY_USERS },
        { type: Tag.LEAVE_POLICIES },
        { type: Tag.MY_LEAVE_POLICIES }
      ]
    }),
    removeUserFromPolicy: builder.mutation<ApiResponseSuccessMessage, RemoveUserFromPolicy>({
      query: ({ userId, policyId }) => ({
        url: `/leaves/policies/${policyId}/users/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, { userId: id }) => [
        { type: Tag.LEAVE_POLICY_USERS, id },
        { type: Tag.LEAVE_POLICY_USERS, id: Tag.LIST },
        { type: Tag.LEAVE_POLICIES },
        { type: Tag.MY_LEAVE_POLICIES }
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
