import { SyntheticEvent, useEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';

import { SchoolGeneralInfo } from './school-general-info';
import { SchoolContactInfo } from './school-contact-info';
import { SchoolLegalInfo } from './school-legal-info';
import { SchoolPreferences } from './school-preferences';
import { TabPanel } from '@/shared/components';

const tabs = [
  { label: 'General', component: <SchoolGeneralInfo /> },
  { label: 'Contact', component: <SchoolContactInfo /> },
  { label: 'Legal', component: <SchoolLegalInfo /> },
  { label: 'Preferences', component: <SchoolPreferences /> }
];
export const SchoolTabs = () => {
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
        {tabs.map(({ label }) => (
          <Tab label={label} key={label} />
        ))}
      </Tabs>
      {tabs.map(({ component, label }, index) => (
        <TabPanel value={tab} index={index} key={label}>
          {component}
        </TabPanel>
      ))}
    </>
  );
};
