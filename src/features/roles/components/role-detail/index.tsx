import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';

import { RolePermissions } from './role-permissions';
import { RoleUsers } from './role-users';
import { RoleDetailHeading } from './role-detail-heading';
import { TabPanel } from '@/shared/components';

export const RoleDetail = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <Box component={Paper} sx={{ p: 2, maxHeight: '70vh', overflowY: 'auto' }}>
      <RoleDetailHeading />
      <Box mt={2} />
      <Tabs value={tab} onChange={handleChange}>
        <Tab label='Permissions' />
        <Tab label='Assigned Users' />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <RolePermissions />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <RoleUsers />
      </TabPanel>
    </Box>
  );
};
