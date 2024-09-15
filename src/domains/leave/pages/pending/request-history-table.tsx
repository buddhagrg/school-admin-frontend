import * as React from "react";
import { Box, Card, CardContent, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { getFormattedDate, DATE_FORMAT, DATE_TIME_24_HR_FORMAT, API_DATE_FORMAT } from "@/utils/helpers/date";
import { DialogModal } from "@/components/dialog-modal";
import { LeaveForm } from "../../components/leave-form";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { LeaveStatus } from "../../components/leave-status";
import { LeaveRequestForm, LeaveRequestFormSchema, MyLeaveRequestDetail } from "../../types";
import { useDeleteLeaveRequestMutation, useGetLeavePoliciesQuery, useUpdateLeaveRequestMutation } from "../../api";

type Column = {
    id: string;
    name: string;
    minWidth?: number;
};

const columns: Column[] = [
    { id: "action", name: "Action" },
    { id: "name", name: "User name", minWidth: 130 },
    { id: "policy", name: "Policy", minWidth: 110 },
    { id: "status", name: "Status", minWidth: 150 },
    { id: "request", name: "Request", minWidth: 300 },
    { id: "note", name: "Note", minWidth: 150 },
    { id: "submittedDate", name: "Submitted Date", minWidth: 250 },
    { id: "updatedDate", name: "Updated Date", minWidth: 250 },
    { id: "approvedDate", name: "Approved Date", minWidth: 250 },
    { id: "approver", name: "Approver" }
];
const menusOptions = ["Edit", "Delete"];

export const RequestHistoryTable = ({ requests }: { requests: MyLeaveRequestDetail[] | undefined }) => {
    const [updateLeaveRequest, { isLoading: isUpdatingLeaveRequest }] = useUpdateLeaveRequestMutation();
    const [deleteLeaveRequest, { isLoading: isDeletingLeaveRequest }] = useDeleteLeaveRequestMutation();
    const { data } = useGetLeavePoliciesQuery();
    const leavePolicies = data?.leavePolicies ?? [];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openId, setOpenId] = React.useState<null | number>(null);
    const [selectedLeaveRequest, setSelectedLeaveRequest] = React.useState<MyLeaveRequestDetail | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);

    const methods = useForm<LeaveRequestForm>({
        resolver: zodResolver(LeaveRequestFormSchema)
    });

    const handleMenuClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenId(openId === id ? null : id);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenId(null);
    }
    const closeModals = () => {
        setEditModalOpen(false);
        setDeleteModalOpen(false);
    }
    const handleOptionClick = (menu: string, selectedLeaveRequest: MyLeaveRequestDetail) => {
        setAnchorEl(null);
        setOpenId(null);
        setSelectedLeaveRequest(selectedLeaveRequest);
        if (menu === "Edit") {
            const { policyId, from, to, note } = selectedLeaveRequest;
            methods.setValue("policy", policyId);
            methods.setValue("from", parseISO(from));
            methods.setValue("to", parseISO(to));
            methods.setValue("note", note);

            setEditModalOpen(true);
        } else if (menu === "Delete") {
            setDeleteModalOpen(true);
        }
    }
    const deleteLeave = async (event: React.MouseEvent) => {
        event.preventDefault();
        try {
            const result = await deleteLeaveRequest(selectedLeaveRequest?.id).unwrap();
            toast.success(result.message);
            closeModals();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }
    const editLeave = async (data: LeaveRequestForm) => {
        try {
            const { policy, from, to, note } = data;
            const payload = {
                id: selectedLeaveRequest?.id,
                policy,
                from: getFormattedDate(from, API_DATE_FORMAT),
                to: getFormattedDate(to, API_DATE_FORMAT),
                note
            };
            const result = await updateLeaveRequest(payload).unwrap();
            toast.success(result.message);
            closeModals();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    let content: null | React.ReactElement = null;
    if (!Array.isArray(requests) || requests.length <= 0) {
        content = <TableRowWithColSpan colSpan={9} />;
    } else {
        content = <>
            {
                requests.map(request => {
                    const isMenuOpen = openId === request.id;
                    return (
                        <TableRow hover key={request.id}>
                            <TableCell>
                                <IconButton onClick={handleMenuClick(request.id)}>
                                    <MoreHoriz />
                                </IconButton>
                                <Menu
                                    open={isMenuOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleMenuClose}
                                >
                                    {
                                        menusOptions.map(menu => {
                                            return (
                                                <MenuItem key={menu} onClick={() => handleOptionClick(menu, request)}>{menu}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                            </TableCell>
                            <TableCell>{request.user}</TableCell>
                            <TableCell>{request.policy}</TableCell>
                            <TableCell>
                                <LeaveStatus statusId={request.statusId} label={request.status} />
                            </TableCell>
                            <TableCell>{getFormattedDate(request.from, DATE_FORMAT)}{`—`}{getFormattedDate(request.to, DATE_FORMAT)} ({request.days} Days)</TableCell>
                            <TableCell>{request.note}</TableCell>
                            <TableCell>{getFormattedDate(request.submitted, DATE_TIME_24_HR_FORMAT)}</TableCell>
                            <TableCell>{getFormattedDate(request.updated, DATE_TIME_24_HR_FORMAT)}</TableCell>
                            <TableCell>{getFormattedDate(request.approved, DATE_TIME_24_HR_FORMAT)}</TableCell>
                            <TableCell>{request.approver}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    }

    return (
        <>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Typography
                    component="div"
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >Leave Requests</Typography>
                <Card>
                    <CardContent>
                        <TableContainer sx={{ height: "250px" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map(({ id, name, minWidth }) => (
                                                <TableCell key={id} style={{ minWidth: minWidth }}>{name}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {content}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>

            <DialogModal
                isSaving={isDeletingLeaveRequest}
                isOpen={deleteModalOpen}
                titleText="Delete Leave Request"
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                handleSave={deleteLeave}
                closeModal={closeModals}
            >
                <Typography variant="body1">
                    Are you sure you want to delete this leave request?
                </Typography>
            </DialogModal>

            <DialogModal
                isSaving={isUpdatingLeaveRequest}
                isOpen={editModalOpen}
                titleText="Edit Leave Details"
                handleSave={methods.handleSubmit(editLeave)}
                closeModal={closeModals}
            >
                <LeaveForm methods={methods} leavePolicies={leavePolicies} />
            </DialogModal>
        </>
    );
}