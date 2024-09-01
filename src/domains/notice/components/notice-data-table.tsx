import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from "@/utils/helpers/date";
import { DialogModal } from "@/components/dialog-modal";
import { isApprovePermissionAvailable, isDeletePermissionAvailable, isEditPermissionAvailable, isRejectPermissionAvailable } from "@/utils/helpers/get-notice-permission";
import { NoticeStatus } from "./notice-status";
import { Notice } from "../types";
import { getUserId } from "@/domains/auth/slice";
import { noticeReducer, NoticeReducerState } from "../reducer";
import { useHandleMenuAction } from "@/hooks";
import { menuItemTexts } from "@/constants";

const initialState: NoticeReducerState = {
    isModalOpen: false,
    modalTitle: "",
    modalBodyText: "",
    noticeId: 0,
    anchorElement: null,
    openNoticeRowId: null,
    actionType: "",
    menuItemValue: "",
    isSavingAction: false
};

export type ActionCellType = 'menu' | 'icon';
type NoticeDataTableProps = {
    notice: Notice,
    actionCellType: ActionCellType;
};

type MenuTableCellProps = {
    notice: Notice;
    state: NoticeReducerState;
    handleMenuClick: (noticeId: number, event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
    currentUserId?: number;
    onNoticeMenuItemClick: (text: string) => void;
};

const MenuTableCell: React.FC<MenuTableCellProps> = ({
    notice,
    state,
    handleMenuClick,
    handleMenuClose,
    currentUserId,
    onNoticeMenuItemClick
}) => {
    return (
        <TableCell>
            <IconButton onClick={(event) => handleMenuClick(notice.id, event)}>
                <MoreHoriz />
            </IconButton>
            <Menu
                open={state.openNoticeRowId === notice.id}
                anchorEl={state.anchorElement}
                onClose={handleMenuClose}
            >
                <MenuItem
                    disabled={
                        isEditPermissionAvailable(
                            notice.authorId,
                            currentUserId
                        )
                    }
                    component={Link}
                    to={`/app/notices/edit/${notice.id}`}
                >Edit</MenuItem>
                <MenuItem
                    disabled={isApprovePermissionAvailable(notice.statusId)}
                    onClick={() => onNoticeMenuItemClick("APPROVE_NOTICE")}
                >Approve</MenuItem>
                <MenuItem
                    disabled={isRejectPermissionAvailable(notice.statusId)}
                    onClick={() => onNoticeMenuItemClick("REJECT_NOTICE")}
                >Reject</MenuItem>
                <MenuItem
                    disabled={isDeletePermissionAvailable(notice.statusId)}
                    onClick={() => onNoticeMenuItemClick("DELETE_NOTICE")}
                >Delete</MenuItem>
            </Menu>
        </TableCell>
    );
}

export const NoticeDataTable: React.FC<NoticeDataTableProps> = ({
    notice,
    actionCellType
}) => {
    const { handleAction } = useHandleMenuAction();
    const [state, dispatch] = React.useReducer(noticeReducer, initialState);
    const currentUserId = useSelector(getUserId);

    const toggleModalState = () => {
        dispatch({ type: "SET_MODAL_STATE" });
    }
    const handleMenuClick = (noticeId: number, event: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: "SET_MENU_ICON_CLICK",
            payload: {
                noticeId,
                anchorElement: event.currentTarget
            }
        });
    }
    const handleMenuClose = () => {
        dispatch({ type: "SET_MENU_CLOSE" });
    }
    const onNoticeMenuItemClick = (menuItemValue: string) => {
        const stsText = menuItemTexts[menuItemValue] || "";

        dispatch({
            type: "SET_MENU_ITEM_CLICK",
            payload: {
                menuItemValue,
                modalTitle: stsText,
                modalBodyText: `Are you sure you want to ${stsText}?`
            }
        });
    }
    const onNoticeIconClick = (noticeId: number, menuItemValue: string) => {
        const stsText = menuItemTexts[menuItemValue] || "";

        dispatch({
            type: "SET_ICON_CLICK",
            payload: {
                menuItemValue,
                noticeId,
                modalTitle: stsText,
                modalBodyText: `Are you sure you want to ${stsText}?`
            }
        });
    }
    const IconTableCell = () => {
        return (
            <TableCell>
                <Stack direction="row">
                    <IconButton
                        color="primary"
                        component={Link} to={`/app/notices/edit/${notice.id}`}
                        sx={{
                            display: notice.authorId !== currentUserId
                                ? 'none'
                                : ''
                        }}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        sx={{
                            display: notice.authorId !== currentUserId
                                ? 'none'
                                : ''
                        }}
                        color="error"
                        onClick={() => onNoticeIconClick(notice.id, "DELETE_NOTICE_BY_SELF")}
                    >
                        <Delete />
                    </IconButton>
                </Stack>
            </TableCell>
        );
    }
    const onSave = async () => {
        try {
            dispatch({ type: "SET_LOADER" });
            const { noticeId, menuItemValue } = state;
            const result = await handleAction(menuItemValue, noticeId);
            toast.info(result.message);
            toggleModalState();
        } catch (error) {
            console.log(error)
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message)
        } finally {
            dispatch({ type: "SET_LOADER" });
        }
    }

    return (
        <>
            <TableRow hover>
                {
                    actionCellType === 'menu'
                        ?
                        (
                            <MenuTableCell
                                notice={notice}
                                state={state}
                                handleMenuClick={handleMenuClick}
                                handleMenuClose={handleMenuClose}
                                currentUserId={currentUserId}
                                onNoticeMenuItemClick={onNoticeMenuItemClick}
                            />
                        )
                        : <IconTableCell />
                }
                <TableCell>
                    <Typography
                        component={Link}
                        to={`/app/notices/${notice.id}`}
                        className="notice-title"
                    >{notice.title}</Typography>
                </TableCell>
                <TableCell>{notice.author}</TableCell>
                <TableCell><NoticeStatus statusId={notice.statusId} label={notice.status} /></TableCell>
                <TableCell>{getFormattedDate(notice.createdDate, DATE_TIME_24_HR_FORMAT)}</TableCell>
                <TableCell>{getFormattedDate(notice.updatedDate, DATE_TIME_24_HR_FORMAT)}</TableCell>
                <TableCell>{notice.reviewerName}</TableCell>
                <TableCell>{getFormattedDate(notice.reviewedDate, DATE_TIME_24_HR_FORMAT)}</TableCell>
                <TableCell>{notice.whoHasAccess}</TableCell>

            </TableRow>

            <DialogModal
                isSaving={state.isSavingAction}
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                titleText={`${state.modalTitle}?`}
                isOpen={state.isModalOpen}
                closeModal={toggleModalState}
                handleSave={onSave}
            >
                <Typography variant="body1">
                    {state.modalBodyText}
                </Typography>
            </DialogModal>
        </>
    );
};
