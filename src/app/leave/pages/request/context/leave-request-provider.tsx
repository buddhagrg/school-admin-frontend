import { ReactNode, useContext } from 'react';
import { initialState, LeaveRequestContext, State } from './leave-request-context';
import { useGetMyLeavePoliciesQuery } from '@/app/leave/leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const LeaveRequestProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError, error } = useGetMyLeavePoliciesQuery();

  const state: State = {
    ...initialState,
    isLoading,
    isError,
    errorMessage: error ? getErrorMsg(error).message : '',
    myLeavePolicies: isError ? [] : data?.leavePolicies || []
  };

  return <LeaveRequestContext.Provider value={state}>{children}</LeaveRequestContext.Provider>;
};

export const useLeaveRequest = () => useContext(LeaveRequestContext);
