import * as React from "react";
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { AddCircle, Circle, MoreVert } from "@mui/icons-material";

import { AddEditRole } from "./add-edit-role";
import { HandleRoleStatus } from "./handle-role-status";
import { roleOverviewReducer } from "../reducer/role-overview-reducer";
import { useGetRolesQuery } from "../api";

const initialState = {
    anchorElement: null,
    roleId: 0,
    roleName: "",
    roleStatus: false,
    isRoleStatusModalOpen: false,
    isRoleAddEditModalOpen: false,
    title: "",
    bodyText: "",
};

export const Overview = () => {
    const [state, dispatch] = React.useReducer(roleOverviewReducer, initialState);
    const { data } = useGetRolesQuery();

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: number, name: string, status: boolean) => {
        dispatch({
            type: "SET_HANDLE_CLICK",
            payload: {
                anchorElement: event.currentTarget,
                roleId: id,
                roleName: name,
                roleStatus: status
            }
        });
    }
    const handleAddRoleModal = () => {
        dispatch({ type: "SET_ADD_ROLE" });
    }
    const handleEditRoleModal = () => {
        dispatch({ type: "SET_EDIT_ROLE" });
    }
    const handleRoleStatus = (roleStatus: boolean) => {
        dispatch({
            type: "SET_ROLE_STATUS",
            payload: {
                roleStatus
            }
        });
    }
    const closeModals = () => {
        dispatch({ type: "SET_CLOSE_MODALS" });
    }
    const handleAnchorElementClose = () => {
        dispatch({ type: "SET_CLOSE_ANCHOR_ELEMENT" });
    }

    return (
        <>
            <Typography component='div' sx={{ fontSize: "18px" }}>Overview</Typography>
            <Stack spacing={1} direction="row" sx={{ display: "flex", mt: 2 }}>
                <Button
                    size='small'
                    variant='outlined'
                    startIcon={<AddCircle />}
                    onClick={handleAddRoleModal}
                >
                    Add New Role
                </Button>
            </Stack>
            <Divider sx={{ my: "10px" }} />
            <Grid container spacing={3}>
                {
                    data?.roles && data?.roles.map(({ id, name, status, usersAssociated }) => (
                        <Grid item xs={12} md={4} key={id}>
                            <Card variant="outlined">
                                <CardContent sx={{ backgroundColor: "#f3f6f999" }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {
                                            status
                                                ? <Circle sx={{ fontSize: "12px" }} color="success" />
                                                : <Circle sx={{ fontSize: "12px" }} color="error" />
                                        }
                                        <Typography sx={{ fontSize: "18px", fontWeight: 500, margin: "5px" }} gutterBottom>
                                            {name}
                                        </Typography>
                                        <div style={{ marginLeft: "auto" }}>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-haspopup="true"
                                                onClick={(event) => handleClick(event, id, name, status)}
                                            >
                                                <MoreVert />
                                            </IconButton>
                                            <Menu
                                                open={Boolean(state.anchorElement)}
                                                anchorEl={state.anchorElement}
                                                onClose={handleAnchorElementClose}
                                                keepMounted
                                            >
                                                <MenuItem disabled={!state.roleStatus} onClick={handleEditRoleModal}>Edit Role</MenuItem>
                                                <MenuItem disabled={!state.roleStatus} onClick={() => handleRoleStatus(false)}>Disable Role</MenuItem>
                                                <MenuItem disabled={state.roleStatus} onClick={() => handleRoleStatus(true)}>Enable Role</MenuItem>
                                            </Menu>
                                        </div>
                                    </Box>
                                    <Typography sx={{ fontSize: "16px", color: "text.secondary", mb: "20px" }}>
                                        {usersAssociated} people
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <AddEditRole
                roleName={state.roleName}
                roleId={state.roleId}
                titleText={state.title}
                isOpen={state.isRoleAddEditModalOpen}
                closeAddEditRoleModalOpen={closeModals}
            />
            <HandleRoleStatus
                title={state.title}
                bodyText={state.bodyText}
                isOpen={state.isRoleStatusModalOpen}
                roleId={state.roleId}
                roleStatus={state.roleStatus}
                closeModals={closeModals}
            />
        </>
    );
}