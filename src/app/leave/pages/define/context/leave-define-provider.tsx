import { ReactNode, useContext, useReducer } from 'react';
import { Action, initialState, LeaveDefineContext, State } from './leave-define-context';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_POLICY_TAB':
      return {
        ...state,
        policyTab: action.payload
      };
    case 'SET_POLICIES':
      return {
        ...state,
        policies: action.payload
      };
    default:
      return state;
  }
};

export const LeaveDefineProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LeaveDefineContext.Provider value={{ state, dispatch }}>
      {children}
    </LeaveDefineContext.Provider>
  );
};

export const useLeaveDefine = () => useContext(LeaveDefineContext);
