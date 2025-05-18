import React from 'react';
import { Box } from '@mui/material';

import type { Notice } from '../types';
import { NoticeDetail } from './notice-detail';
import { DialogModal } from '@/shared/components';

type ViewNoticeProps = {
  notice: Notice;
  closeModal: () => void;
};
export const ViewNotice: React.FC<ViewNoticeProps> = ({ notice, closeModal }) => {
  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      actionFooterCancelText='Close'
      showSaveDialogAction={false}
      size='md'
      showDialogTitle={false}
    >
      <Box p={2}>
        <NoticeDetail notice={notice} />
      </Box>
    </DialogModal>
  );
};
