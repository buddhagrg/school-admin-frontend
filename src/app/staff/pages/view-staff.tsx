import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { StaffProfile } from '@/components/user-account-profile';

const tabs = ['Profile'];
export const ViewStaff = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleTabChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <>
      <PageContentHeader title='Account Details' />
      <Box component={Paper} sx={{ p: 1 }}>
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
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <TabPanel value={tab} index={0}>
            <StaffProfile id={id} />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
