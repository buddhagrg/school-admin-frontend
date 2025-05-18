import { Box, Grid2 } from '@mui/material';
import { AddPolicyBtn, ListPolicies, PolicyNotSelected } from './components';
import { PolicyDetail } from './components/policy-users/policy-detail';
import { PolicyContextProvider, usePolicyDetail } from './leave-policy-context-provider';
import { PageContentHeader } from '@/shared/components';

const LeavePolicyPage = () => {
  const { state } = usePolicyDetail();

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}
      >
        <PageContentHeader
          title='Leave Policies'
          subtitle='Define and manage leave policies for your organization'
        />
        <AddPolicyBtn />
      </Box>
      <Box mt={3} />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <ListPolicies />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          {state && state?.id > 0 ? <PolicyDetail /> : <PolicyNotSelected />}
        </Grid2>
      </Grid2>
    </>
  );
};

export const LeavePolicies = () => (
  <PolicyContextProvider>
    <LeavePolicyPage />
  </PolicyContextProvider>
);
