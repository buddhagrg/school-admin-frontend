import { ReactNode } from 'react';
import { Grid2 } from '@mui/material';
import { LeaveDetail } from '@/app/leave/components';
import { useLeaveRequest } from '../context/leave-request-provider';

export const MyLeavePolicies = () => {
  const { isLoading, isError, errorMessage, myLeavePolicies } = useLeaveRequest();

  let content: ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{errorMessage}</>;
  } else if (myLeavePolicies.length <= 0 && !isLoading) {
    content = <>You are not assigned to any leave policies.</>;
  } else {
    content = myLeavePolicies.map((leave) => (
      <Grid2 size={{ xs: 12, md: 4 }} key={leave.id}>
        <LeaveDetail key={leave.id} {...leave} />
      </Grid2>
    ));
  }

  return (
    <Grid2 container columnSpacing={2} rowSpacing={2}>
      {content}
    </Grid2>
  );
};
