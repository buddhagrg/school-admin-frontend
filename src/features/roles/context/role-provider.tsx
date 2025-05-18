import { ReactNode, useContext, useReducer } from 'react';
import { Action, initialState, RoleContext, State } from './role-context';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ROLE_DETAIL':
      return {
        ...state,
        roleDetail: action.payload
      };
    case 'RESET_PERMISSIONS':
      return {
        ...state,
        permissions: state.permissions.map((parent) => ({
          ...parent,
          isPermissionAvailable: false,
          subMenus: parent.subMenus?.map((menu) => ({
            ...menu,
            isPermissionAvailable: false
          }))
        }))
      };
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.payload
      };
    case 'SET_SYSTEM_PERMISSIONS':
      return {
        ...state,
        permissions: action.payload
      };
    case 'TOGGLE_PARENT_PERMISSION':
      return {
        ...state,
        permissions: state.permissions.map((parent) => {
          if (parent.id !== action.payload) return parent;

          return {
            ...parent,
            isPermissionAvailable: !parent.isPermissionAvailable
          };
        })
      };
    case 'TOGGLE_CHILD_PERMISSION': {
      const { id, parentId } = action.payload;
      return {
        ...state,
        permissions: state.permissions.map((parent) => {
          if (parent.id !== parentId) return parent;

          return {
            ...parent,
            subMenus: parent.subMenus?.map((menu) => {
              if (menu.id !== id) return menu;

              return {
                ...menu,
                isPermissionAvailable: !menu.isPermissionAvailable
              };
            })
          };
        })
      };
    }
    case 'UPDATE_ROLE_PERMISSIONS': {
      const permissions = action.payload;
      const permissionIds = new Set(permissions.map((p) => p.id));
      return {
        ...state,
        permissions: state.permissions.map((parent) => {
          return {
            ...parent,
            isPermissionAvailable: permissionIds.has(parent.id),
            subMenus: parent.subMenus?.map((menu) => ({
              ...menu,
              isPermissionAvailable: permissionIds.has(menu.id)
            }))
          };
        })
      };
    }
    default:
      return state;
  }
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <RoleContext.Provider value={{ state, dispatch }}>{children}</RoleContext.Provider>;
};

export const useRolePermission = () => useContext(RoleContext);
