import { Action, RolesAndPermissionState } from "../types";

export const roleAndPermissionReducer = (state: RolesAndPermissionState, action: Action) => {
    switch (action.type) {
        case "SET_PERMISSIONS":
            return { ...state, permissions: action.payload };
        case "SET_ROLE_TAB":
            return { ...state, roleTab: action.payload };
        case "SET_ROLE_ID":
            return {
                ...state,
                currentRole: {
                    ...state.currentRole,
                    id: action.payload
                }
            };
        case "SET_ROLE_USERS":
            return {
                ...state,
                currentRole: {
                    ...state.currentRole,
                    users: action.payload
                }
            };
        case "SET_ROLE_PERMISSIONS":
            return {
                ...state,
                currentRole: {
                    ...state.currentRole,
                    permissions: action.payload
                }
            };
        case "SET_SECONDARY_TAB":
            return { ...state, secondaryTab: action.payload };
        default:
            return state;
    }
}