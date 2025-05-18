import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';

import { PolicyDetailHeading } from './policy-detail-heading';
import { PolicyUsers } from './policy-users';
import { TabPanel } from '@/shared/components';

export const PolicyDetail = () => {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, []);

  const handleChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <Box component={Paper} sx={{ p: 2, maxHeight: '70vh', overflowY: 'auto' }}>
      <PolicyDetailHeading />
      <Box mt={2} />
      <Tabs value={tab} onChange={handleChange}>
        <Tab label='Assigned Users' />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <PolicyUsers />
      </TabPanel>
    </Box>
  );
};
