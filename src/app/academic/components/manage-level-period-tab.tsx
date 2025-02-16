import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@/components/tab-panel';
import { AddLevel } from './level/add-level';
import { AddPeriod } from './period/add-period';

const tabs = ['Create Academic Level', 'Create Period'];
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
      <Box component={Paper} sx={{ p: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant='scrollable'
            value={tab}
            onChange={handleTabChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <TabPanel value={tab} index={0}>
            <AddLevel />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <AddPeriod />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
