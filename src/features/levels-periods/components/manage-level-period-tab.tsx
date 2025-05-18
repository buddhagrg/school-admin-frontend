import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { LevelTabContent } from './level';
import { PeriodTabContent } from './period';
import { TabPanel } from '@/shared/components';

const tabs = ['Academic Levels', 'Periods'];
export const ManageLevelPeriodTab = () => {
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
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <TabPanel value={tab} index={0}>
          <LevelTabContent />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <PeriodTabContent />
        </TabPanel>
      </Box>
    </>
  );
};
