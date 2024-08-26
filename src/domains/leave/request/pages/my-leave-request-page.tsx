import { Box } from "@mui/material";
import { LeavePolicyDetail } from "../components";
import { RequestHistory } from "../../components";

export const MyLeaveRequest = () => {
    return (
        <>
            <LeavePolicyDetail />
            <Box sx={{ marginBottom: "50px" }} />
            <RequestHistory />
        </>
    );
}
