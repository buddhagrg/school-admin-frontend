type AnchorElement = HTMLElement | null;
type State = {
  anchorElement: AnchorElement;
  roleId: number;
  roleName: string;
  roleStatus: boolean;
  isRoleStatusModalOpen: boolean;
  isRoleAddEditModalOpen: boolean;
  title: string;
  bodyText: string;
};
type SetHandleClick = {
  type: 'SET_HANDLE_CLICK';
  payload: {
    anchorElement: AnchorElement;
    roleId: number;
    roleName: string;
    roleStatus: boolean;
  };
};
type SetRoleAdd = { type: 'SET_ADD_ROLE' };
type SetRoleEdit = { type: 'SET_EDIT_ROLE' };
type SetCloseModals = { type: 'SET_CLOSE_MODALS' };
type SetRoleStatus = {
  type: 'SET_ROLE_STATUS';
  payload: {
    roleStatus: boolean;
  };
};
type SetCloseAnchorElement = { type: 'SET_CLOSE_ANCHOR_ELEMENT' };
type Action =
  | SetHandleClick
  | SetRoleAdd
  | SetRoleEdit
  | SetCloseModals
  | SetRoleStatus
  | SetCloseAnchorElement;

export const roleOverviewReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_HANDLE_CLICK': {
      const { anchorElement, roleId, roleName, roleStatus } = action.payload;
      return {
        ...state,
        anchorElement,
        roleId,
        roleName,
        roleStatus
      };
    }
    case 'SET_ROLE_STATUS': {
      const { roleStatus } = action.payload;
      const roleStatusText = roleStatus ? 'Enable' : 'Disable';
      return {
        ...state,
        roleStatus,
        title: `${roleStatusText} Role`,
        isRoleStatusModalOpen: true,
        anchorElement: null,
        bodyText: `Are you sure you want to ${roleStatusText} this role?`
      };
    }
    case 'SET_ADD_ROLE':
      return {
        ...state,
        roleId: 0,
        title: 'Add Role',
        isRoleAddEditModalOpen: true,
        anchorElement: null
      };
    case 'SET_EDIT_ROLE':
      return {
        ...state,
        title: 'Edit Role',
        isRoleAddEditModalOpen: true,
        anchorElement: null
      };
    case 'SET_CLOSE_MODALS':
      return {
        ...state,
        isRoleStatusModalOpen: false,
        isRoleAddEditModalOpen: false
      };
    case 'SET_CLOSE_ANCHOR_ELEMENT':
      return {
        ...state,
        anchorElement: null
      };
    default:
      return state;
  }
};
