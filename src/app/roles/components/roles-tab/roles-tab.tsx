import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { TabPanel } from '@/components/tab-panel';
import { UserTabs } from './users-tab/users-tab';
import { PermissionsTabs } from './permissions-tab/permissions-tab';
import { useRolePermission } from '../../context/role-provider';
import { ManageRole } from '../manage-role';

export const RoleTabs = () => {
  const [secondaryTab, setSecondaryTab] = useState(0);
  const {
    state: { roles, roleTab }
  } = useRolePermission();

  useEffect(() => {
    setSecondaryTab(0);
  }, [roleTab]);

  const handlePermissionTabChange = (_event: SyntheticEvent, index: number) => {
    setSecondaryTab(index);
  };

  return roles.map(({ id, name }, index) => (
    <TabPanel value={roleTab} index={index + 1} key={id}>
      <ManageRole id={id} name={name} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={secondaryTab} onChange={handlePermissionTabChange}>
          <Tab label='Users' />
          <Tab label='Permissions' />
        </Tabs>
      </Box>
      <TabPanel value={secondaryTab} index={0}>
        <UserTabs roleId={id} />
      </TabPanel>
      <TabPanel value={secondaryTab} index={1}>
        <PermissionsTabs roleId={id} />
      </TabPanel>
    </TabPanel>
  ));
};
