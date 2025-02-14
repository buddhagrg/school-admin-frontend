import { createContext, Dispatch } from 'react';
import { LeavePolicy } from '@/domains/leave/types';

export const initialState = {
  policyTab: 0,
  policies: []
};
export type State = {
  policyTab: number;
  policies: LeavePolicy[];
};
export type Action =
  | { type: 'SET_POLICY_TAB'; payload: number }
  | { type: 'SET_POLICIES'; payload: LeavePolicy[] };

type DefaultContext = {
  state: State;
  dispatch: Dispatch<Action>;
};
const defaultValues: DefaultContext = {
  state: initialState,
  dispatch: () => {}
};

export const LeaveDefineContext = createContext(defaultValues);
