import * as React from "react";
import { Email, Person, Phone, SupervisorAccount } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Grid, Typography, } from "@mui/material";

type MiniAvatarProps = {
    name: string;
    roleName?: string | null;
    email: string;
    phone: string;
};

export const MiniAvatar: React.FC<MiniAvatarProps> = ({ name, roleName, email, phone }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Person sx={{ mr: 1 }} />
                    <Typography variant="h6">{name}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <SupervisorAccount sx={{ mr: 1 }} />
                            <Typography variant="subtitle2">Role</Typography>
                        </Box>
                        <Typography variant="body1">{roleName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Email sx={{ mr: 1 }} />
                            <Typography variant="subtitle2">Email</Typography>
                        </Box>
                        <Typography variant="body1">{email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Phone sx={{ mr: 1 }} />
                            <Typography variant="subtitle2">Phone</Typography>
                        </Box>
                        <Typography variant="body1">{phone}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}