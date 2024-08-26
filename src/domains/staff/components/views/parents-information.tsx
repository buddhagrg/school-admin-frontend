import * as React from "react";
import { ContactPhone } from "@mui/icons-material";
import { Box, Grid, Typography, Card, CardContent, Divider } from "@mui/material";

type ParentsInformationProps = {
    fatherName: string;
    motherName?: string;
    emergencyPhone: string;
};

export const ParentsInformation: React.FC<ParentsInformationProps> = ({
    fatherName,
    motherName,
    emergencyPhone
}) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ContactPhone sx={{ mr: 1 }} />
                    <Typography variant="h6">Parents & Emergency Information</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Father Name</Typography>
                        <Typography variant="body1">{fatherName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Mother Name</Typography>
                        <Typography variant="body1">{motherName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2">Emergency Phone</Typography>
                        <Typography variant="body1">{emergencyPhone}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};