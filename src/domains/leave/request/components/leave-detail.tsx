import * as React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { API_DOMAIN_PORT } from "@/config";

type LeaveDetailType = {
    name: string;
    totalDaysUsed: number;
    icon: string;
};

export const LeaveDetail: React.FC<LeaveDetailType> = ({
    name,
    totalDaysUsed,
    icon
}) => {
    return (
        <Grid>
            <Card sx={{ textAlign: "center" }}>
                <CardContent>
                    {/* <Box><img width="40px" height="40px" src={`${API_DOMAIN_PORT}/${icon}`} /></Box> */}
                    <Typography variant="h6" component="div" gutterBottom >{name}</Typography>
                    <Typography component="p" gutterBottom fontSize="14px">{totalDaysUsed} Days taken</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}