import * as React from "react";
import { Box, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from "@mui/material";
import { MoreHoriz, Pending } from "@mui/icons-material";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { PageContentHeader } from "@/components/page-content-header";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { DialogModal } from "@/components/dialog-modal";
import { getFormattedDate, DATE_FORMAT, DATE_TIME_24_HR_FORMAT } from "@/utils/helpers/date";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { useGetLeavePendingQuery, useHandlePendingLeaveStatusMutation } from "../../api/leave-api";
import { PendingRequestTable } from "./pending-request";

type Modal = {
    isOpen: boolean;
    title: string;
    leaveType: string;
    username: string;
    leaveId: number;
    status: number;
};

export const PendingRequest = () => {
    const { data, isLoading, isError, error } = useGetLeavePendingQuery();
    const [handleLeaveStatus, { isLoading: isHandlingLeaveStatus }] = useHandlePendingLeaveStatusMutation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openId, setOpenId] = React.useState<null | number>(null);
    const [modal, setModal] = React.useState<Modal>({
        isOpen: false,
        title: "",
        leaveType: "",
        username: "",
        leaveId: 0,
        status: 1
    });

    const handleMenuClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenId(openId === id ? null : id);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenId(null);
    }
    const handleOptionClick = (menuName: string, status: number, leaveId: number, leaveType: string, username: string) => {
        handleMenuClose();
        setModal({
            isOpen: !modal.isOpen,
            title: menuName,
            leaveId,
            leaveType,
            username,
            status
        });
    }
    const handleModalClose = () => {
        setModal(state => ({ ...state, isOpen: !state.isOpen }));
    }
    const handleAction = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            const { leaveId, status } = modal;
            const result = await handleLeaveStatus({ id: leaveId, status }).unwrap();
            toast.success(result.message);
            handleModalClose();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    let content: null | React.ReactElement = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={6} text="loading..." />;
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={6} text={getErrorMsg(error).message} />;
    } else if (!Array.isArray(data?.pendingLeaves) || data?.pendingLeaves.length <= 0) {
        content = <TableRowWithColSpan colSpan={6} />
    } else {
        content = <>
            {
                data?.pendingLeaves.map(leave => {
                    const isMenuOpen = openId === leave.id;
                    return (
                        <TableRow hover key={leave.id}>
                            <TableCell>
                                <IconButton onClick={handleMenuClick(leave.id)}>
                                    <MoreHoriz />
                                </IconButton>
                                <Menu
                                    open={isMenuOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem
                                        onClick={() => handleOptionClick('Approve', 2, leave.id, leave.policy, leave.user)}
                                    >Approve</MenuItem>
                                    <MenuItem
                                        onClick={() => handleOptionClick('Cancel', 3, leave.id, leave.policy, leave.user)}
                                    >Cancel</MenuItem>
                                </Menu>
                            </TableCell>
                            <TableCell>{leave.user}</TableCell>
                            <TableCell>{leave.policy}</TableCell>
                            <TableCell>{leave.note}</TableCell>
                            <TableCell>{getFormattedDate(leave.from, DATE_FORMAT)}{`—`}{getFormattedDate(leave.to, DATE_FORMAT)} ({leave.days} days)</TableCell>
                            <TableCell>{getFormattedDate(leave.submitted, DATE_TIME_24_HR_FORMAT)}</TableCell>
                            <TableCell>{getFormattedDate(leave.updated, DATE_TIME_24_HR_FORMAT)}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    }

    return (
        <Box>
            <PageContentHeader icon={<Pending sx={{ mr: 1 }} />} heading="Pending Leave Requests" />
            <PendingRequestTable content={content} />

            <DialogModal
                isSaving={isHandlingLeaveStatus}
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                handleSave={handleAction}
                isOpen={modal.isOpen}
                titleText={`${modal.title} ?`}
                closeModal={handleModalClose}
            >
                <Typography sx={{ my: 2 }}>
                    Are you sure you want to {modal.title} <strong>{modal.leaveType}</strong> request of <strong>{modal.username}</strong>?
                </Typography>
            </DialogModal>
        </Box>
    );
}