import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { AccountSecurity } from './account-security';
import { TabPanel } from '@/shared/components';

type AccountTabsProps = {
  component: React.ReactNode;
  pwdLastChanged: string;
  recentDeviceInfo: string;
  lastLoginDate: string;
};
const tabs = ['Personal Information', 'Security'];
export const AccountTabs: React.FC<AccountTabsProps> = ({
  component,
  pwdLastChanged,
  recentDeviceInfo,
  lastLoginDate
}) => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleChange}>
        {tabs.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </Tabs>
      <TabPanel value={tab} index={0}>
        {component}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AccountSecurity
          pwdLastChanged={pwdLastChanged}
          recentDeviceInfo={recentDeviceInfo}
          lastLoginDate={lastLoginDate}
        />
      </TabPanel>
    </>
  );
};
