import { ReactNode, useContext, useReducer } from 'react';
import { Action, initialState, RolePermissionContext, State } from './role-permission-context';

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

export const RolePermissionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RolePermissionContext.Provider value={{ state, dispatch }}>
      {children}
    </RolePermissionContext.Provider>
  );
};

export const useRolePermission = () => useContext(RolePermissionContext);
