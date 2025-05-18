import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';

import { StudentBasicInfoView } from './student-basic-info-view';
import { StudentContactView } from './student-contact-view';
import { StudentClassView } from './student-class-view';
import { StudentParentView } from './student-parent-view';
import { AccountDetailTabContent, TabPanel } from '@/shared/components';

const tabs = ['Personal', 'Academic'];
export const StudentProfileTabs = () => {
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
          components={[<StudentBasicInfoView />, <StudentContactView />, <StudentParentView />]}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AccountDetailTabContent components={[<StudentClassView />]} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AccountDetailTabContent components={[<StudentParentView />]} />
      </TabPanel>
    </>
  );
};
