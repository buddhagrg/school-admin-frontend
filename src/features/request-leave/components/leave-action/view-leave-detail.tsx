import React from 'react';
import { Box, Divider } from '@mui/material';

import { LEAVE_STATUS_CHIP } from '../leave-status';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import type { LeaveDetail } from '@/shared/types';
import { DialogModal, HeadingText, SubHardText, SubSoftText } from '@/shared/components';

type ViewLeaveDetailProps = {
  data: LeaveDetail;
  closeModal: () => void;
};
export const ViewLeaveDetail: React.FC<ViewLeaveDetailProps> = ({ data, closeModal }) => {
  const {
    policy,
    statusId,
    fromDate,
    toDate,
    note,
    duration,
    submittedDate,
    updatedDate,
    reviewedDate,
    reviewer,
    reviewerNote
  } = data;
  const dateRange = `${getFormattedDate(fromDate, DATE_FORMAT)} - ${getFormattedDate(toDate, DATE_FORMAT)} (${duration} days)`;
  const reviewedBy =
    reviewer && reviewedDate ? `${reviewer} on ${getFormattedDate(reviewedDate, DATE_FORMAT)}` : '';

  return (
    <DialogModal
      isOpen={true}
      titleText='Leave Request Detail'
      contextText='View the details of this leave request'
      showSaveDialogAction={false}
      actionFooterCancelText='Close'
      closeModal={closeModal}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <HeadingText text='Status' />
        <Box ml='auto'>{LEAVE_STATUS_CHIP[statusId]}</Box>
      </Box>
      <Divider />
      <Box mt={1} />
      <SubSoftText text='Leave Type' />
      <SubHardText text={policy} />
      <Box sx={{ mt: 1 }} />
      <SubSoftText text='Date Range' />
      <SubHardText text={dateRange} />
      <Box sx={{ mt: 1 }} />
      <SubSoftText text='Note' />
      <SubHardText text={note} />
      <Box sx={{ mt: 1 }} />
      <SubSoftText text='Applied On' />
      <SubHardText text={getFormattedDate(submittedDate, DATE_FORMAT)} />
      <Box sx={{ mt: 1 }} />
      <SubSoftText text='Updated On' />
      <SubHardText text={getFormattedDate(updatedDate, DATE_FORMAT)} />
      <Box sx={{ mt: 1 }} />
      <SubSoftText text='Reviewed By' />
      <SubHardText text={reviewedBy} />
      <Box sx={{ display: statusId === 'REJECTED' ? '' : 'none' }}>
        <Box sx={{ mt: 1 }} />
        <SubSoftText text='Rejection Reason' />
        <SubHardText text={reviewerNote} />
      </Box>
    </DialogModal>
  );
};
