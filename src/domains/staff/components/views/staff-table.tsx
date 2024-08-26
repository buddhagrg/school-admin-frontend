import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { NameIdType } from "@/utils/type/misc";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { DialogModal } from "@/components/dialog-modal";
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from "@/utils/helpers/date";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { StaffState } from "../../types";
import { useDisableStaffMutation } from "../../api";
import { staffReducer } from "../../reducer/staff-reducer";

const columns: NameIdType[] = [
    { id: "action", name: "Action" },
    { id: "id", name: "ID" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "role", name: "Role" },
    { id: "systemAccess", name: "System Access" },
    { id: "lastLogin", name: "Last Login" }
];

const initialState = {
    anchorEl: null,
    openStaffRowId: null,
    isModalOpen: false,
    modalTitle: "",
    modalBodyText: "",
    selectedStaffId: 0,
    status: false
};

export const StaffTable = ({ data }: { data: StaffState }) => {
    const [disableStaff, { isLoading: isDisablingStaff }] = useDisableStaffMutation();
    const [state, dispatch] = React.useReducer(staffReducer, initialState);

    const handleMenuClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: "SET_MENU_CLICK",
            payload: {
                selectedStaffId: id,
                anchorEl: event.currentTarget,
            }
        });
    }
    const handleMenuClose = () => {
        dispatch({ type: "SET_MENU_CLOSE" });
    }
    const onMenuItemClick = (status: boolean) => {
        const stsText = status ? "Enable Staff" : "Disable Staff"
        dispatch({
            type: "SET_MENU_ITEM_CLICK",
            payload: {
                status,
                modalTitle: `${stsText} ?`,
                modalBodyText: `Are you sure you want to ${stsText}?`
            }
        });
    }
    const toggleStaffDisableModal = () => {
        dispatch({ type: "SET_MODAL_FALSE" });
    }

    const onDisableStaff = async () => {
        try {
            const { selectedStaffId, status } = state;
            const result = await disableStaff({ id: selectedStaffId, status }).unwrap();
            toast.info(result.message);
            toggleStaffDisableModal();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    const { staffs, isLoading, isError, error } = data;
    let content: React.ReactNode | null = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={4} text="loading..." />
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={4} text={error} />
    } else if (!Array.isArray(staffs) || staffs.length <= 0) {
        content = <TableRowWithColSpan colSpan={8} />
    } else {
        content = (
            staffs.map(staff => {
                const isMenuOpen = state.openStaffRowId === staff.id;
                return (
                    <TableRow hover key={staff.id}>
                        <TableCell>
                            <IconButton onClick={handleMenuClick(staff.id)}>
                                <MoreHoriz />
                            </IconButton>
                            <Menu
                                open={isMenuOpen}
                                anchorEl={state.anchorEl}
                                onClose={handleMenuClose}
                            >
                                <MenuItem component={Link} to={`/app/staffs/${staff.id}`}>View</MenuItem>
                                <MenuItem component={Link} to={`/app/staffs/edit/${staff.id}`}>Edit</MenuItem>
                                <MenuItem disabled={!staff.systemAccess} onClick={() => onMenuItemClick(false)}>Disable</MenuItem>
                                <MenuItem disabled={staff.systemAccess} onClick={() => onMenuItemClick(true)}>Enable</MenuItem>
                            </Menu>
                        </TableCell>
                        <TableCell>{staff.id}</TableCell>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.email}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>{staff.systemAccess.toString()}</TableCell>
                        <TableCell>{getFormattedDate(staff.lastLogin, DATE_TIME_24_HR_FORMAT)}</TableCell>
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
                isSaving={isDisablingStaff}
                titleText={state.modalTitle}
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                isOpen={state.isModalOpen}
                closeModal={toggleStaffDisableModal}
                handleSave={onDisableStaff}
            >
                <Typography variant="body1">
                    {state.modalBodyText}
                </Typography>
            </DialogModal>
        </Box>
    );
}