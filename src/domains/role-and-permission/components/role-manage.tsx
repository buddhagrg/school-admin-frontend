import * as React from "react";
import { Block, Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { AddEditRole } from "./add-edit-role";
import { HandleRoleStatus } from "./handle-role-status";

export const RoleManage = ({ id, name }: { id: number, name: string }) => {
    const [addEditModalOpen, setAddEditModalOpen] = React.useState(false);
    const [disableModalOpen, setDisableModalOpen] = React.useState(false);

    const openAddEditModal = () => {
        setAddEditModalOpen(true);
    }
    const openDisableModal = () => {
        setDisableModalOpen(true);
    }
    const closeModals = () => {
        setAddEditModalOpen(false);
        setDisableModalOpen(false);
    }

    const handleEditRole = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        openAddEditModal();
    }
    const handleDisableRole = () => {
        openDisableModal();
    }
    const closeDisableRoleModal = () => {
        closeModals();
    }

    return (
        <>
            <Stack direction="row" sx={{ display: "flex", paddingBottom: 1 }}>
                <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>{name}</Typography>
                <div style={{ marginLeft: "auto" }}>
                    <Stack spacing={1} direction="row">
                        <IconButton aria-label="Edit policy" onClick={handleEditRole} color="info">
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="Block policy" onClick={handleDisableRole} color="error">
                            <Block />
                        </IconButton>
                    </Stack>
                </div>
            </Stack>

            <AddEditRole
                roleId={id}
                roleName={name}
                titleText={"Edit Role"}
                isOpen={addEditModalOpen}
                closeAddEditRoleModalOpen={closeModals}
            />
            <HandleRoleStatus
                title="Disable Role"
                bodyText="Are you sure you want to disable this role?"
                roleStatus={false}
                roleId={id}
                isOpen={disableModalOpen}
                closeModals={closeDisableRoleModal}
            />
        </>
    );
}