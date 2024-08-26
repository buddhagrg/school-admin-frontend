export type NoticeReducerState = {
    isModalOpen: boolean;
    modalTitle: string;
    modalBodyText: string
    noticeId: number;
    anchorElement: HTMLElement | null;
    openNoticeRowId: null | number;
    noticeStatus: number;
    actionType: string;
};

type MenuClickAction = {
    type: "SET_MENU_ICON_CLICK",
    payload: {
        noticeId: number;
        anchorElement: HTMLElement | null;
    }
};
type MenuCloseAction = { type: "SET_MENU_CLOSE" };
type MenuItemClickAction = {
    type: "SET_MENU_ITEM_CLICK",
    payload: {
        modalTitle: string;
        modalBodyText: string;
        noticeStatus: number;
    }
};
type MenuIconClick = {
    type: "SET_ICON_CLICK",
    payload: {
        noticeId: number;
        modalTitle: string;
        modalBodyText: string;
        noticeStatus: number;
    }
};
type ModalStateAction = { type: "SET_MODAL_STATE" };
type NoticeReducerAction = MenuClickAction | MenuCloseAction | MenuItemClickAction | ModalStateAction | MenuIconClick;

export const noticeReducer = (state: NoticeReducerState, action: NoticeReducerAction): NoticeReducerState => {
    switch (action.type) {
        case "SET_MENU_ICON_CLICK":
            const { noticeId, anchorElement } = action.payload;
            return {
                ...state,
                noticeId,
                anchorElement,
                openNoticeRowId: state.openNoticeRowId === noticeId ? null : noticeId
            };
        case "SET_MENU_CLOSE":
            return {
                ...state,
                anchorElement: null,
                openNoticeRowId: null
            };
        case "SET_MENU_ITEM_CLICK":
            {
                const { modalTitle, modalBodyText, noticeStatus } = action.payload;
                return {
                    ...state,
                    isModalOpen: !state.isModalOpen,
                    modalTitle,
                    modalBodyText,
                    noticeStatus,
                    anchorElement: null,
                    openNoticeRowId: null
                };
            }
        case "SET_MODAL_STATE":
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            };
        case "SET_ICON_CLICK":
            {
                const { noticeId, modalTitle, modalBodyText, noticeStatus } = action.payload;
                return {
                    ...state,
                    isModalOpen: !state.isModalOpen,
                    noticeId,
                    modalTitle,
                    modalBodyText,
                    noticeStatus
                }
            }
        default:
            return state;
    }
}
