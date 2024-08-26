import * as React from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";

import { PageContentHeader } from "@/components/page-content-header";
import { TabPanel } from "@/components/tab-panel";
import { StudentProfile } from "../components/student-profile";
import { ChangePassword } from "../../components/change-password";

const tabs = ["Profile", "Change Password"];
export const StudentAccountPage = () => {
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        setTab(0);
    }, []);

    const handleTabChange = (event: any, index: number) => {
        setTab(index);
    }

    return (
        <>
            <PageContentHeader heading="Account Details" />
            <Box component={Paper} sx={{ p: 1 }}>
                <Tabs
                    variant="scrollable"
                    value={tab}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {
                        tabs.map(tab => (
                            <Tab key={tab} label={tab} />
                        ))
                    }
                </Tabs>
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                    <TabPanel value={tab} index={0}>
                        <StudentProfile />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <ChangePassword />
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
}