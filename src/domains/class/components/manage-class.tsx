import * as React from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, TextField, Typography } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Controller, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import { sectionList } from "@/const";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { useAddClassMutation, useUpdateClassMutation } from "../api";
import { ClassProps } from "../types";

type ManageClassProps = {
    id?: number;
    operation: "Add" | "Edit";
    methods: UseFormReturn<ClassProps>;
};

export const ManageClass: React.FC<ManageClassProps> = ({
    id,
    operation,
    methods
}) => {
    const [addNewClass, { isLoading: isAddingClass }] = useAddClassMutation();
    const [updateClass, { isLoading: isUpdatingClass }] = useUpdateClassMutation();
    const navigate = useNavigate();

    const { register, control, handleSubmit, getValues, setValue, formState: { errors }, reset } = methods;

    const isSectionPresent = (section: string) => {
        return getValues("sections").includes(section);
    }
    const handleChange = (section: string) => {
        const values = getValues("sections");
        if (values.includes(section)) {
            setValue("sections", values.filter(v => v !== section));
        }
        else {
            setValue("sections", [...values, section]);
        }
    }

    const handleSave = async (data: ClassProps) => {
        try {
            const { name, sections } = data;
            const sectionString = sections.length > 0 ? sections.join(",") : "";
            const result = operation === "Add"
                ? await addNewClass({ name, sections: sectionString }).unwrap()
                : await updateClass({ id: id!, name, sections: sectionString }).unwrap();

            reset();
            toast.info(result?.message);
            navigate("/app/classes");
        } catch (error) {
            toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>{operation} Class</Typography>
            <form onSubmit={handleSubmit(handleSave)}>
                <TextField
                    {...register("name")}
                    label="Class Name"
                    fullWidth
                    focused
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <FormControl sx={{ mt: 2 }}>
                    <FormLabel>Sections</FormLabel>
                    {
                        sectionList.map(section => (
                            <FormGroup key={section}>
                                <Controller
                                    name="sections"
                                    control={control}
                                    render={() => (
                                        <FormControlLabel
                                            label={section}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={isSectionPresent(section)}
                                                    icon={<CheckBoxOutlineBlank />}
                                                    checkedIcon={<CheckBox />}
                                                    onChange={() => handleChange(section)}
                                                />
                                            }
                                        />
                                    )}
                                />
                            </FormGroup>
                        ))
                    }
                </FormControl>

                <Box textAlign="center">
                    <LoadingButton
                        type="submit"
                        size="small"
                        variant="contained"
                        sx={{ mt: 4 }}
                        loading={isAddingClass || isUpdatingClass}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    );
}