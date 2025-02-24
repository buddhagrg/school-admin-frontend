import { ReactNode, useContext, useReducer } from 'react';
import { Action, initialState, RoleContext, State } from './role-context';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ROLE_TAB':
      return {
        ...state,
        roleTab: action.payload
      };
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.payload
      };
    case 'SET_PERMISSIONS':
      return {
        ...state,
        permissions: action.payload
      };
    default:
      return state;
  }
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <RoleContext.Provider value={{ state, dispatch }}>{children}</RoleContext.Provider>;
};

export const useRolePermission = () => useContext(RoleContext);
