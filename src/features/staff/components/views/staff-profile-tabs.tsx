import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';

import { StaffBasicInfoView } from './staff-basic-info-view';
import { StaffContactView } from './staff-contact-view';
import { StaffEmploymentView } from './staff-employment-view';
import { StaffEmergencyContactView } from './staff-emergency-contact-view';
import { StaffQualificationView } from './staff-qualification-view';
import { AccountDetailTabContent, TabPanel } from '@/shared/components';

const tabs = ['Personal', 'Professional'];
export const StaffProfileTabs = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleTabChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <TabPanel value={tab} index={0}>
        <AccountDetailTabContent
          components={[<StaffBasicInfoView />, <StaffContactView />, <StaffEmergencyContactView />]}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AccountDetailTabContent
          components={[<StaffEmploymentView />, <StaffQualificationView />]}
        />
      </TabPanel>
    </>
  );
};
