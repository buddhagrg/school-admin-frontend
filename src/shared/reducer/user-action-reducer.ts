import type { Staff } from '@/features/staff/types';
import type { Student } from '@/features/students/types';
import type { UserActions } from '../types';

type Data = Staff | Student | null;
type UserActionState = {
  isModalOpen: boolean;
  isActionSaving: boolean;
  modalTitle: string;
  modalBodyText: string;
  menuAction: UserActions;
  data: Data;
};
export const userActionState: UserActionState = {
  isModalOpen: false,
  isActionSaving: false,
  modalTitle: '',
  modalBodyText: '',
  menuAction: 'NO_ACTION',
  data: null
};
type UserAction =
  | { type: 'TOGGLE_MODAL' }
  | {
      type: 'SET_MENU_DETAIL';
      payload: { modalTitle: string; modalBodyText: string; menuAction: UserActions; data: Data };
    }
  | { type: 'TOGGLE_LOADING' }
  | { type: 'RESET_STATE' };

export const userActionReducer = (state: UserActionState, action: UserAction): UserActionState => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case 'SET_MENU_DETAIL': {
      const { modalTitle, modalBodyText, menuAction, data } = action.payload;
      return {
        ...state,
        modalTitle,
        modalBodyText,
        data,
        menuAction
      };
    }
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isActionSaving: !state.isActionSaving
      };
    case 'RESET_STATE':
      return state;
    default:
      return state;
  }
};
