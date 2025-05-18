import React, { useEffect } from 'react';
import { Grid2, LinearProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

import { StaffContextProvider, useStaffDetail } from '../staff-context-provider';
import { useGetStaffDetailQuery } from '../staff-api';
import { StaffMiniProfileView } from './views/staff-mini-profile-view';
import { StaffProfileTabs } from './views/staff-profile-tabs';
import { DialogModal } from '@/shared/components';

type ViewStaffProps = {
  id: number;
  closeModal: () => void;
};
const Staff: React.FC<ViewStaffProps> = ({ id, closeModal }) => {
  const { data, isLoading } = useGetStaffDetailQuery({ id, mode: 'view' }, { skip: !id });
  const { setState } = useStaffDetail();

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data, setState]);

  return (
    <DialogModal
      size='md'
      isOpen={true}
      closeModal={closeModal}
      showCancelDialogAction={false}
      showSaveDialogAction={false}
      bgColor='#f9fafb'
      isModalClosedOnOutClick={false}
    >
      {isLoading && <LinearProgress />}
      <Grid2 container spacing={3}>
        <Grid2
          size={12}
          sx={{ bgcolor: blue[800], p: 2, color: 'white', borderRadius: '8px 8px 0px 0px' }}
        >
          <StaffMiniProfileView />
        </Grid2>
        <StaffProfileTabs />
      </Grid2>
    </DialogModal>
  );
};

export const ViewStaff: React.FC<ViewStaffProps> = (props) => {
  return (
    <StaffContextProvider>
      <Staff {...props} />
    </StaffContextProvider>
  );
};
