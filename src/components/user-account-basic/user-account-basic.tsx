import * as React from "react";
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Block, CheckCircle, Edit, Email, Key, LockReset, MoreHoriz, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { NameIdType } from "@/utils/type/misc";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { DialogModal } from "@/components/dialog-modal";
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from "@/utils/helpers/date";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { UserAccountBasicDataProps } from "./user-account-basic-type";
import { userAccountBasicReducer } from "./user-account-basic-reducer";
import { useHandleMenuAction } from "../../hooks";
import { menuItemTexts } from "@/constants";

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
    isSaving: false,
    anchorEl: null,
    openRowUserId: null,
    isModalOpen: false,
    modalTitle: "",
    modalBodyText: "",
    selectedUserId: 0,
    menuItemValue: ""
};

export const UserAccountBasic = ({ data }: { data: UserAccountBasicDataProps }) => {
    const [state, dispatch] = React.useReducer(userAccountBasicReducer, initialState);
    const { handleAction } = useHandleMenuAction();

    const handleMenuClick = (id: number) => (event: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: "SET_MENU_CLICK",
            payload: {
                selectedUserId: id,
                anchorEl: event.currentTarget,
            }
        });
    }
    const handleMenuClose = () => {
        dispatch({ type: "SET_MENU_CLOSE" });
    }
    const onMenuItemClick = (menuItemValue: string) => {
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
    const toggleModal = () => {
        dispatch({ type: "SET_MODAL_FALSE" });
    }

    const onSave = async () => {
        try {
            dispatch({ type: "SET_LOADER" });
            const { selectedUserId, menuItemValue } = state;
            let result = await handleAction(menuItemValue, selectedUserId);
            toast.info(result.message);
            toggleModal();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        } finally {
            dispatch({ type: "SET_LOADER" });
        }
    }

    const { users, isLoading, isError, error, userType } = data;
    let content: React.ReactNode | null = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={4} text="loading..." />
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={4} text={error} />
    } else if (!Array.isArray(users) || users.length <= 0) {
        content = <TableRowWithColSpan colSpan={8} />
    } else {
        content = (
            users.map(user => {
                const isMenuOpen = state.openRowUserId === user.id;
                return (
                    <TableRow hover key={user.id}>
                        <TableCell>
                            <IconButton onClick={handleMenuClick(user.id)}>
                                <MoreHoriz />
                            </IconButton>
                            <Menu
                                open={isMenuOpen}
                                anchorEl={state.anchorEl}
                                onClose={handleMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to={
                                        userType === "staff"
                                            ? `/app/staffs/${user.id}`
                                            : `/app/students/${user.id}`
                                    }
                                >
                                    <ListItemIcon>
                                        <Visibility fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>View</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to={
                                        userType === "staff"
                                            ? `/app/staffs/edit/${user.id}`
                                            : `/app/students/edit/${user.id}`
                                    }
                                >
                                    <ListItemIcon>
                                        <Edit fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    disabled={!user.systemAccess}
                                    onClick={() => onMenuItemClick(userType === "staff" ? "DISABLE_STAFF_STATUS" : "DISABLE_STUDENT_STATUS")}
                                >
                                    <ListItemIcon>
                                        <Block fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Disable</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    disabled={user.systemAccess}
                                    onClick={() => onMenuItemClick(userType === "staff" ? "ENABLE_STAFF_STATUS" : "ENABLE_STUDENT_STATUS")}
                                >
                                    <ListItemIcon>
                                        <CheckCircle fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Enable</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => onMenuItemClick("RESEND_VERIFICATION_EMAIL_TO_USER")}
                                >
                                    <ListItemIcon>
                                        <Email fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Resend Verification Email</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => onMenuItemClick("RESEND_PWD_LINK_EMAIL_TO_USER")}
                                >
                                    <ListItemIcon>
                                        <Key fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Resend Password Setup Link</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => onMenuItemClick("RESET_USER_PWD")}
                                >
                                    <ListItemIcon>
                                        <LockReset fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Reset Password</ListItemText>
                                </MenuItem>
                            </Menu>
                        </TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.systemAccess.toString()}</TableCell>
                        <TableCell>{getFormattedDate(user.lastLogin, DATE_TIME_24_HR_FORMAT)}</TableCell>
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
                isSaving={state.isSaving}
                titleText={state.modalTitle}
                actionFooterCancelText="No"
                actionFooterSaveText="Yes"
                isOpen={state.isModalOpen}
                closeModal={toggleModal}
                handleSave={onSave}
            >
                <Typography variant="body1">
                    {state.modalBodyText}
                </Typography>
            </DialogModal>
        </Box>
    );
}