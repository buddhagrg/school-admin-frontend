import React, { useEffect } from 'react';
import { Grid2, LinearProgress } from '@mui/material';
import { blue } from '@mui/material/colors';

import { StudentMiniProfileView } from './views/student-mini-profile-view';
import { StudentProfileTabs } from './views/student-profile-tabs';
import { useGetStudentDetailQuery } from '../students-api';
import { StudentContextProvider, useStudentDetail } from '../student-context-provider';
import { DialogModal } from '@/shared/components';

type ViewStudentProps = {
  id: number;
  closeModal: () => void;
};
const Student: React.FC<ViewStudentProps> = ({ id, closeModal }) => {
  const { data, isLoading } = useGetStudentDetailQuery({ id, mode: 'view' }, { skip: !id });
  const { setState } = useStudentDetail();

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
          <StudentMiniProfileView />
        </Grid2>
        <StudentProfileTabs />
      </Grid2>
    </DialogModal>
  );
};

export const ViewStudent: React.FC<ViewStudentProps> = (props) => {
  return (
    <StudentContextProvider>
      <Student {...props} />
    </StudentContextProvider>
  );
};
