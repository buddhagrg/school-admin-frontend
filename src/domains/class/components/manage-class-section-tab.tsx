import * as React from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@/components/tab-panel';
import { AddClass } from './class/add-class';
import { AddSection } from './section/add-section';

const tabs = ['Add Class', 'Add Section'];
export const ManageClassSectionTab = () => {
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    setTab(0);
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, index: number) => {
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
            <AddClass />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <AddSection />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
