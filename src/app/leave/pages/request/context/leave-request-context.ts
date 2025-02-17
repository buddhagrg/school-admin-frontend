import { createContext } from 'react';
import { MyLeavePolicy } from '@/app/leave/types';

export const initialState: State = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  myLeavePolicies: []
};
export type State = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  myLeavePolicies: MyLeavePolicy[];
};

export const LeaveRequestContext = createContext(initialState);
