type UserReducerState = {
  isSaving: boolean;
  anchorEl: HTMLElement | null;
  openRowUserId: null | number;
  isModalOpen: boolean;
  modalTitle: string;
  modalBodyText: string;
  selectedUserId: number;
  menuItemValue: string;
};

type SetMenuClickAction = {
  type: 'SET_MENU_CLICK';
  payload: {
    selectedUserId: number;
    anchorEl: HTMLElement | null;
  };
};
type SetMenuClose = { type: 'SET_MENU_CLOSE' };
type SetMenuItemClick = {
  type: 'SET_MENU_ITEM_CLICK';
  payload: {
    menuItemValue: string;
    modalTitle: string;
    modalBodyText: string;
  };
};
type SetModalFalse = { type: 'SET_MODAL_FALSE' };
type SetLoader = { type: 'SET_LOADER' };
type UserReducerAction =
  | SetMenuClickAction
  | SetMenuClose
  | SetMenuItemClick
  | SetModalFalse
  | SetLoader;

export const userAccountBasicReducer = (
  state: UserReducerState,
  action: UserReducerAction
): UserReducerState => {
  switch (action.type) {
    case 'SET_MENU_CLICK': {
      const { selectedUserId, anchorEl } = action.payload;
      return {
        ...state,
        anchorEl,
        selectedUserId,
        openRowUserId: state.openRowUserId === selectedUserId ? null : selectedUserId
      };
    }
    case 'SET_MENU_CLOSE':
      return {
        ...state,
        anchorEl: null,
        openRowUserId: null
      };
    case 'SET_MENU_ITEM_CLICK': {
      const { menuItemValue, modalTitle, modalBodyText } = action.payload;
      return {
        ...state,
        anchorEl: null,
        openRowUserId: null,
        isModalOpen: !state.isModalOpen,
        menuItemValue,
        modalTitle,
        modalBodyText
      };
    }
    case 'SET_MODAL_FALSE':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case 'SET_LOADER':
      return {
        ...state,
        isSaving: !state.isSaving
      };
    default:
      return state;
  }
};
