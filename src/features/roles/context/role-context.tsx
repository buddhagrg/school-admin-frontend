import { createContext, Dispatch } from 'react';
import type { ExtendedPermission, RoleWithUsersAssociated } from '../types';
import type { NameIdType } from '@/shared/types';

export const initialState: State = {
  roleDetail: null,
  roles: [],
  permissions: []
};
export type State = {
  roleDetail: RoleWithUsersAssociated | null;
  roles: RoleWithUsersAssociated[];
  permissions: ExtendedPermission[];
};
export type Action =
  | { type: 'SET_ROLE_DETAIL'; payload: RoleWithUsersAssociated | null }
  | { type: 'SET_ROLES'; payload: RoleWithUsersAssociated[] }
  | { type: 'SET_SYSTEM_PERMISSIONS'; payload: ExtendedPermission[] }
  | { type: 'TOGGLE_PARENT_PERMISSION'; payload: number }
  | { type: 'TOGGLE_CHILD_PERMISSION'; payload: { parentId: number; id: number } }
  | { type: 'UPDATE_ROLE_PERMISSIONS'; payload: NameIdType[] }
  | { type: 'RESET_PERMISSIONS' };

type DefaultContext = {
  state: State;
  dispatch: Dispatch<Action>;
};
const defaultValues: DefaultContext = {
  state: initialState,
  dispatch: () => {}
};

export const RoleContext = createContext(defaultValues);
