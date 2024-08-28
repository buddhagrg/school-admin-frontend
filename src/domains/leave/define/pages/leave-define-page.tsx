import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Policy } from '@mui/icons-material';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { useGetLeavePoliciesQuery } from '../../api';
import { Manage, Overview, PolicyUsers } from '../components';

export const LeaveDefine = () => {
    const [tab, setTab] = React.useState(0);
    const { data, isLoading } = useGetLeavePoliciesQuery();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    if (isLoading) {
        return <>loading...</>
    }

    const leavePolicies = data?.leavePolicies ?? [];
    return (
        <>
            <PageContentHeader icon={<Policy sx={{ mr: 1 }} />} heading="Leave Define" />
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tab}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Overview" />
                    {
                        leavePolicies &&
                        leavePolicies.length > 0 &&
                        leavePolicies.map(({ id, name, totalUsersAssociated }) => (
                            <Tab key={id} label={`${name} (${totalUsersAssociated})`} />
                        ))
                    }
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Overview leavePolicies={leavePolicies} />
                </TabPanel>
                {
                    leavePolicies &&
                    leavePolicies.length > 0 &&
                    leavePolicies.map(({ id, name }, index) => (
                        <TabPanel value={tab} index={index + 1} key={id}>
                            <Manage id={id} name={name} />
                            <PolicyUsers id={id} />
                        </TabPanel>
                    ))
                }
            </Box >
        </>
    );
}
