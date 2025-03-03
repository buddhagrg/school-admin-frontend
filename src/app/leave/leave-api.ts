import { api, Tag } from '@/api';
import {
  LeavePolicyData,
  LeaveRequestApi,
  PolicyDetail,
  PolicyUserData,
  AddUserToPolicy,
  RemoveUserFromPolicy,
  EligiblePolicyUsers,
  PolicyStatus,
  LeaveRequestHistory,
  LeaveRequestApiWithId,
  MyLeavePolicyData,
  PendingLeaveRequestHistory,
  LeaveStatus
} from './types';
import { ApiResponseSuccessMessage } from '@/types';

const leaveApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeavePolicies: builder.query<LeavePolicyData, void>({
      query: () => '/leaves/policies',
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.LEAVE_POLICIES, id };
        }) || [{ type: Tag.LEAVE_POLICIES }]
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
    addLeavePolicy: builder.mutation<ApiResponseSuccessMessage, Pick<PolicyDetail, 'name'>>({
      query: ({ name }) => ({
        url: `/leaves/policies`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.LEAVE_POLICIES])
    }),
    updateLeavePolicy: builder.mutation<
      ApiResponseSuccessMessage,
      Pick<PolicyDetail, 'name' | 'id'>
    >({
      query: ({ id, name }) => ({
        url: `/leaves/policies/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.LEAVE_POLICIES, id }])
    }),
    handleLeavePolicy: builder.mutation<ApiResponseSuccessMessage, PolicyStatus>({
      query: ({ id, status }) => ({
        url: `/leaves/policies/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.LEAVE_POLICIES, id }])
    }),
    addUserToPolicy: builder.mutation<ApiResponseSuccessMessage, AddUserToPolicy>({
      query: ({ userList, id }) => ({
        url: `/leaves/policies/${id}/users`,
        method: 'PUT',
        body: { users: userList }
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
        url: `/leaves/policies/${policyId}/users`,
        method: 'DELETE',
        body: { userId }
      }),
      invalidatesTags: (_result, error, { userId }) =>
        error
          ? []
          : [
              { type: Tag.LEAVE_POLICY_USERS, id: userId },
              Tag.MY_LEAVE_POLICIES,
              Tag.LEAVE_POLICY_USERS
            ]
    }),
    getMyLeavePolicies: builder.query<MyLeavePolicyData, void>({
      query: () => `/leaves/policies/my`,
      providesTags: (result) =>
        result?.leavePolicies.map(({ id }) => {
          return { type: Tag.MY_LEAVE_POLICIES, id };
        }) || [{ type: Tag.MY_LEAVE_POLICIES }]
    }),
    getMyLeaveHistory: builder.query<LeaveRequestHistory, void>({
      query: () => `/leaves/requests`,
      providesTags: (result) =>
        result?.leaveHistory.map(({ id }) => {
          return { type: Tag.LEAVE_HISTORY, id };
        }) || [{ type: Tag.LEAVE_HISTORY }]
    }),
    applyLeaveRequest: builder.mutation<ApiResponseSuccessMessage, LeaveRequestApi>({
      query: (payload) => ({
        url: `/leaves/requests`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.LEAVE_HISTORY, Tag.PENDING_LEAVES])
    }),
    updateLeaveRequest: builder.mutation<ApiResponseSuccessMessage, LeaveRequestApiWithId>({
      query: ({ id, ...restPayload }) => ({
        url: `/leaves/requests/${id}`,
        method: 'PUT',
        body: { ...restPayload }
      }),
      invalidatesTags: (_result, error, { id }) =>
        error
          ? []
          : [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
    }),
    deleteLeaveRequest: builder.mutation<ApiResponseSuccessMessage, number | undefined>({
      query: (id) => ({
        url: `/leaves/requests/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error, id) =>
        error
          ? []
          : [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
    }),
    getLeavePending: builder.query<PendingLeaveRequestHistory, void>({
      query: () => `/leaves/requests/pending`,
      providesTags: (result) =>
        result?.pendingLeaves.map(({ id }) => {
          return { type: Tag.PENDING_LEAVES, id };
        }) || [{ type: Tag.PENDING_LEAVES }]
    }),
    handlePendingLeaveStatus: builder.mutation<ApiResponseSuccessMessage, LeaveStatus>({
      query: ({ id, status }) => ({
        url: `/leaves/requests/pending/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error, { id }) =>
        error
          ? []
          : [
              { type: Tag.LEAVE_HISTORY, id },
              { type: Tag.PENDING_LEAVES, id }
            ]
    })
  })
});

export const {
  useGetMyLeaveHistoryQuery,
  useGetLeavePendingQuery,
  useGetLeavePoliciesQuery,
  useGetEligibleLeavePolicyUsersQuery,
  useGetLeavePolicyUsersQuery,
  useAddLeavePolicyMutation,
  useUpdateLeavePolicyMutation,
  useHandleLeavePolicyMutation,
  useAddUserToPolicyMutation,
  useRemoveUserFromPolicyMutation,
  useApplyLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
  useGetMyLeavePoliciesQuery,
  useHandlePendingLeaveStatusMutation
} = leaveApi;
