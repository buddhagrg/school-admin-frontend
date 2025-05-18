import { Grid2, Paper } from '@mui/material';
import { LeavePolicyItem } from './leave-policy-item';
import { NoLeavePolicy } from './no-leave-policy';
import { Loader } from '@/shared/components';
import { useGetMyLeavePoliciesQuery } from '@/features/leave-policies/leave-policy-api';

export const LeavePolicies = () => {
  const { data, isLoading, isError } = useGetMyLeavePoliciesQuery();
  const policies = isError
    ? []
    : data?.leavePolicies && data?.leavePolicies.length > 0
      ? data?.leavePolicies
      : [];

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Loader />
      </Paper>
    );
  }

  if (!isLoading && policies.length <= 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <NoLeavePolicy />
      </Paper>
    );
  }

  return (
    <Grid2 container spacing={3}>
      {policies.map(({ id, name, daysUsed }) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={id}>
          <LeavePolicyItem key={id} name={name} daysUsed={daysUsed} />
        </Grid2>
      ))}
    </Grid2>
  );
};
