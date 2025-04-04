import { SyntheticEvent, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Policy } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { LeaveDefineProvider, useLeaveDefine } from './context/leave-define-provider';
import { OverviewTab } from './components/overview-tab/overview-tab';
import { PolicyTab } from './components/policy-tab/policy-tab';
import { useGetLeavePoliciesQuery } from '../../leave-api';

const ViewLeaveDefine = () => {
  const { data, isLoading } = useGetLeavePoliciesQuery();
  const { state, dispatch } = useLeaveDefine();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    dispatch({ type: 'SET_POLICY_TAB', payload: newValue });
  };

  useEffect(() => {
    if (data?.leavePolicies) {
      dispatch({ type: 'SET_POLICIES', payload: data.leavePolicies });
    }
  }, [dispatch, data?.leavePolicies]);

  if (isLoading) {
    return <>loading...</>;
  }

  const { policies, policyTab } = state;
  return (
    <>
      <PageContentHeader icon={Policy} title='Leave Define' />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        flexDirection={isSmallScreen ? 'column' : 'row'}
      >
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant='scrollable'
          value={policyTab}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label='Overview' />
          {policies &&
            policies.length > 0 &&
            policies.map(({ id, name, totalUsersAssociated }) => (
              <Tab key={id} label={`${name} (${totalUsersAssociated})`} />
            ))}
        </Tabs>
        <TabPanel value={policyTab} index={0}>
          <OverviewTab />
        </TabPanel>
        <PolicyTab />
      </Box>
    </>
  );
};

export const LeaveDefine = () => {
  return (
    <LeaveDefineProvider>
      <ViewLeaveDefine />
    </LeaveDefineProvider>
  );
};
