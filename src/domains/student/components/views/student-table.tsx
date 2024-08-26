import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MoreHoriz } from "@mui/icons-material";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { NameIdType } from "@/utils/type/misc";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from "@/utils/helpers/date";
import { DialogModal } from "@/components/dialog-modal";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { StudentState } from "../../types";
import { useReviewStudentStatusMutation } from "../../api";

const columns: NameIdType[] = [
    { id: "action", name: "Action" },
    { id: "id", name: "ID" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "systemAccess", name: "System Access" },
    { id: "lastLogin", name: "Last Login" }
];

export const StudentTable = ({ data }: { data: StudentState }) => {
    const [reviewStudentStatus, { isLoading: isReviewingStudentStatus }] = useReviewStudentStatusMutation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openId, setOpenId] = React.useState<null | number>(null);
    const [statusModal, setStatusModal] = React.useState<boolean>(false);
    const [studentId, setStudentId] = React.useState<string>("");
    const [initialStatus, setInitialStatus] = React.useState<boolean>(true);
    const [newStatus, setNewStatus] = React.useState<boolean>(true);

    const handleMenuClick = (id: number, initialStatus: boolean) => (event: React.MouseEvent<HTMLElement>) => {
        setStudentId(id.toString());
        setAnchorEl(event.currentTarget);
        setOpenId(openId === id ? null : id);
        setInitialStatus(initialStatus);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenId(null);
    }
    const manageStudentStatus = (status: boolean) => {
        setNewStatus(status);
        handleMenuClose();
        toggleStatusModal();
    }
    const toggleStatusModal = () => {
        setStatusModal(!statusModal);
    }
    const onSave = async () => {
        try {
            const result = await reviewStudentStatus({ id: Number(studentId), status: newStatus }).unwrap();
            toast.info(result.message);
            setStatusModal(!statusModal);
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    const { students, isLoading, isError, error } = data;
    let content: React.ReactNode | null = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={8} text="loading..." />
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={8} text={error} />
    } else if (!Array.isArray(students) || students.length <= 0) {
        content = <TableRowWithColSpan colSpan={8} />
    } else {
        content = (
            students.map(student => {
                const isMenuOpen = openId === student.id;
                return (
                    <TableRow hover key={student.id}>
                        <TableCell>
                            <IconButton onClick={handleMenuClick(student.id, student.systemAccess)}>
                                <MoreHoriz />
                            </IconButton>
                            <Menu
                                open={isMenuOpen}
                                anchorEl={anchorEl}
                                onClose={handleMenuClose}
                            >
                                <MenuItem component={Link} to={`/app/students/${student.id}`}>View</MenuItem>
                                <MenuItem component={Link} to={`/app/students/edit/${student.id}`}>Edit</MenuItem>
                                <MenuItem disabled={!student.systemAccess} onClick={() => manageStudentStatus(false)}>Disable Status</MenuItem>
                                <MenuItem disabled={student.systemAccess} onClick={() => manageStudentStatus(true)}>Enable Status</MenuItem>
                            </Menu>
                        </TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.systemAccess.toString()}</TableCell>
                        <TableCell>{getFormattedDate(student.lastLogin, DATE_TIME_24_HR_FORMAT)}</TableCell>
                    </TableRow>
                )
            })
        );
    }

    return (
        <Box sx={{ p: 2 }} component={Paper}>
            <TableContainer sx={{ height: "80vh" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(({ id, name }) => (
                                    <TableCell key={id}>{name}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content}
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogModal
                isSaving={isReviewingStudentStatus}
                titleText="Disable Student"
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                isOpen={statusModal}
                closeModal={toggleStatusModal}
                handleSave={onSave}
            >
                <Typography variant="body1">
                    Are you sure you want to {initialStatus ? 'disable' : 'enable'} this student ?
                </Typography>
            </DialogModal>
        </Box>
    );
}