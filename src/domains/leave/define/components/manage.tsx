import * as React from "react";
import { Block, Edit, PersonAddAlt } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

import { AddEditPolicy } from "./add-edit-policy";
import { AddPeopleToPolicy } from "./add-people-to-policy";
import { PolicyStatus } from "./policy-status";

export const Manage = ({ id, name }: { id: number, name: string }) => {
    const [isEditPolicyModalOpen, setIsEditPolicyModalOpen] = React.useState<boolean>(false);
    const [isDisablePolicyModalOpen, setIsDisablePolicyModalOpen] = React.useState<boolean>(false);
    const [isAddUserToPolicyModalOpen, setIsAddUserToPolicyModalOpen] = React.useState<boolean>(false);

    const toggleAddNewPeople = () => {
        setIsAddUserToPolicyModalOpen(!isAddUserToPolicyModalOpen);
    }
    const toggleEditPolicy = () => {
        setIsEditPolicyModalOpen(!isEditPolicyModalOpen);
    }
    const toggleDisablePolicy = () => {
        setIsDisablePolicyModalOpen(!isDisablePolicyModalOpen);
    }

    return (
        <>
            <Stack spacing={1} direction="row" sx={{ display: "flex", my: 3 }}>
                <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: 500 }}>{name}</Typography>
                <div style={{ marginLeft: "auto" }}>
                    <Stack spacing={1} direction="row">
                        <IconButton aria-label="Add people" onClick={toggleAddNewPeople} color="info">
                            <PersonAddAlt />
                        </IconButton>
                        <IconButton aria-label="Edit policy" onClick={toggleEditPolicy} color="info">
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="Block policy" onClick={toggleDisablePolicy} color="error">
                            <Block />
                        </IconButton>
                    </Stack>
                </div>
            </Stack>

            <AddEditPolicy
                policyId={id}
                policyName={name}
                title={"Edit Policy"}
                isOpen={isEditPolicyModalOpen}
                closeModal={toggleEditPolicy}
            />

            <PolicyStatus
                title="Disable Policy"
                bodyText="Are you sure you want to disable this policy?"
                policyStatus={false}
                policyId={id}
                isOpen={isDisablePolicyModalOpen}
                closeModal={toggleDisablePolicy}
            />

            <AddPeopleToPolicy
                policyId={id}
                isOpen={isAddUserToPolicyModalOpen}
                closeModal={toggleAddNewPeople}
            />
        </>
    );
}