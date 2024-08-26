export type LeaveDefineState = {
    isPolicyActive: boolean;
    isAddEditPolicyModalOpen: boolean;
    isPolicyStatusModalOpen: boolean;
    isAddUserToPolicyModalOpen: boolean;
    title: string;
    bodyText: string;
    anchorElement: HTMLElement | null;
    policyStatus: boolean;
    policyId: number;
    policyName: string;
};
type AnchorEl = HTMLElement | null;
type SetMenuClickAction = {
    type: "SET_MENU_CLICK",
    payload: {
        anchorElement: AnchorEl;
        policyId: number;
        policyName: string;
        isPolicyActive: boolean;
    }
};
type SetPolicyAction = {
    type: "SET_POLICY_STATUS",
    payload: {
        policyStatus: boolean;
    }
};
type SetAddModal = { type: "SET_ADD_POLICY_MODAL" };
type SetEditModal = { type: "SET_EDIT_POLICY_MODAL" };
type SetAddPeople = { type: "SET_ADD_PEOPLE" };
type SetCloseModal = { type: "SET_CLOSE_MODAL" };
type SetMenuClose = { type: "SET_MENU_CLOSE" }
type Action = SetMenuClickAction | SetPolicyAction | SetAddModal | SetEditModal | SetAddPeople | SetCloseModal | SetMenuClose;

export const leaveDefineReducer = (state: LeaveDefineState, action: Action): LeaveDefineState => {
    switch (action.type) {
        case "SET_MENU_CLICK":
            {
                const { anchorElement, policyId, policyName, isPolicyActive } = action.payload;
                return {
                    ...state,
                    anchorElement,
                    policyId,
                    policyName,
                    isPolicyActive
                };

            }
        case "SET_POLICY_STATUS":
            {
                const { policyStatus } = action.payload;
                const text = policyStatus ? "Enable" : "Disable";
                return {
                    ...state,
                    isPolicyStatusModalOpen: !state.isPolicyStatusModalOpen,
                    policyStatus,
                    title: `${text} Policy`,
                    bodyText: `Are you sure you want to ${text} policy?`,
                    anchorElement: null
                };

            }
        case "SET_ADD_POLICY_MODAL":
            return {
                ...state,
                title: `Add Policy`,
                isAddEditPolicyModalOpen: !state.isAddEditPolicyModalOpen
            }
        case "SET_EDIT_POLICY_MODAL":
            return {
                ...state,
                title: `Edit Policy`,
                isAddEditPolicyModalOpen: !state.isAddEditPolicyModalOpen,
            }
        case "SET_ADD_PEOPLE":
            return {
                ...state,
                title: `Add People`,
                isAddUserToPolicyModalOpen: !state.isAddUserToPolicyModalOpen
            }
        case "SET_CLOSE_MODAL":
            return {
                ...state,
                isAddEditPolicyModalOpen: false,
                isAddUserToPolicyModalOpen: false,
                isPolicyStatusModalOpen: false,
                anchorElement: null
            }
        case "SET_MENU_CLOSE":
            return {
                ...state,
                anchorElement: null
            }
        default:
            return state;
    }
}
