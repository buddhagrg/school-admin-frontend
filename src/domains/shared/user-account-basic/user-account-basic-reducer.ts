type StaffReducerState = {
    isSaving: boolean;
    anchorEl: HTMLElement | null;
    openStaffRowId: null | number;
    isModalOpen: boolean;
    modalTitle: string;
    modalBodyText: string;
    selectedStaffId: number;
    menuItemValue: string;
};

type SetMenuClickAction = {
    type: "SET_MENU_CLICK",
    payload: {
        selectedStaffId: number;
        anchorEl: HTMLElement | null;
    }
};
type SetMenuClose = { type: "SET_MENU_CLOSE" };
type SetMenuItemClick = {
    type: "SET_MENU_ITEM_CLICK",
    payload: {
        menuItemValue: string;
        modalTitle: string;
        modalBodyText: string;
    }
};
type SetModalFalse = { type: "SET_MODAL_FALSE" };
type SetLoader = { type: "SET_LOADER" };
type StaffReducerAction = SetMenuClickAction | SetMenuClose | SetMenuItemClick | SetModalFalse | SetLoader;

export const userAccountBasicReducer = (state: StaffReducerState, action: StaffReducerAction): StaffReducerState => {
    switch (action.type) {
        case "SET_MENU_CLICK": {
            const { selectedStaffId, anchorEl } = action.payload;
            return {
                ...state,
                anchorEl,
                selectedStaffId,
                openStaffRowId: state.openStaffRowId === selectedStaffId ? null : selectedStaffId
            };
        }
        case "SET_MENU_CLOSE":
            return {
                ...state,
                anchorEl: null,
                openStaffRowId: null
            }
        case "SET_MENU_ITEM_CLICK":
            {
                const { menuItemValue, modalTitle, modalBodyText } = action.payload;
                return {
                    ...state,
                    anchorEl: null,
                    openStaffRowId: null,
                    isModalOpen: !state.isModalOpen,
                    menuItemValue,
                    modalTitle,
                    modalBodyText
                };
            }
        case "SET_MODAL_FALSE":
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            };
        case "SET_LOADER":
            return {
                ...state,
                isSaving: !state.isSaving
            };
        default:
            return state;
    }
}