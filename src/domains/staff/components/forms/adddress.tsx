import { Home } from "@mui/icons-material";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { StaffFormProps } from "../../types";

export const Address = () => {
    const { register, formState: { errors } } = useFormContext<StaffFormProps>();

    return (
        <>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Home sx={{ mr: 1 }} />
                <Typography variant="body1">Address</Typography>
            </Box>
            <Grid container spacing={2} sx={{ marginTop: "0px" }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        {...register("currentAddress")}
                        error={Boolean(errors?.currentAddress)}
                        helperText={errors?.currentAddress?.message}
                        multiline
                        rows={3}
                        fullWidth
                        label="Current Address"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        {...register("permanentAddress")}
                        error={Boolean(errors?.permanentAddress)}
                        helperText={errors?.permanentAddress?.message}
                        multiline
                        rows={3}
                        fullWidth
                        label="Permanent Address"
                        size="small"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}