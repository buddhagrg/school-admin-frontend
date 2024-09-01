import * as React from "react";
import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { DATE_TIME_FORMAT, getFormattedDate } from "@/utils/helpers/date";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { DialogModal } from "@/components/dialog-modal";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { User } from "../types";
import { useGetRolesQuery, useSwitchUserRoleMutation } from "../api/role-and-permission-api";

const Schema = z.object({
    roleId: z.number().min(1, "You must select one role")
});
type SchemaType = z.infer<typeof Schema>;

export const RoleUsers = ({ users }: { users: User[] | [] }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [userId, setUserId] = React.useState<number | null>(null);

    const { data } = useGetRolesQuery();
    const [switchUserRole, { isLoading: isSwitchingRole }] = useSwitchUserRoleMutation();

    const { control, formState: { errors }, handleSubmit, } = useForm<SchemaType>({
        defaultValues: { roleId: 0 },
        resolver: zodResolver(Schema)
    });

    const handleRoleSwitch = (userId: number) => () => {
        setModalOpen(true);
        setUserId(userId);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const handleSave = async (data: SchemaType) => {
        try {
            const result = await switchUserRole({ id: userId!, ...data }).unwrap();
            toast.info(result.message);
            closeModal();
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ "& th": { backgroundColor: "#f3f6f999" } }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell colSpan={2}>Last Login</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users && users.length > 0
                                ? (
                                    users.map(({ id, name, lastLogin }) => (
                                        <TableRow key={id}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{getFormattedDate(lastLogin, DATE_TIME_FORMAT)}</TableCell>
                                            <TableCell>
                                                <IconButton title="Switch Role" color="primary" onClick={handleRoleSwitch(id)}>
                                                    <SwapHoriz />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRowWithColSpan colSpan={3} />
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <DialogModal
                isSaving={isSwitchingRole}
                isOpen={modalOpen}
                titleText="Switch Role"
                closeModal={closeModal}
                handleSave={handleSubmit(handleSave)}
            >
                <p>Switching role will remove access permissions from current role.</p>
                <FormControl sx={{ width: "100%", my: 2 }} size="small" error={Boolean(errors.roleId)}>
                    <InputLabel id="choose-new-role">New Role</InputLabel>
                    <Controller
                        name="roleId"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <Select
                                    labelId="choose-new-role"
                                    label="Select New Role"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                >
                                    {
                                        data?.roles?.map(role => (
                                            <MenuItem value={role.id} key={role.id}>{role.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <FormHelperText>{error?.message}</FormHelperText>
                            </>
                        )}
                    />
                </FormControl>
            </DialogModal>
        </>
    );
}