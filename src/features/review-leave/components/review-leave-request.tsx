import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  Stack,
  TextField
} from '@mui/material';

import type { LeaveDetail } from '@/shared/types';
import { useApproveLeaveRequestMutation, useRejectLeaveRequestMutation } from '../review-leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { LEAVE_STATUS_CHIP } from '@/features/request-leave/components/leave-status';
import { DialogModal, HeadingText, SubHardText, SubSoftText } from '@/shared/components';

type ReviewLeaveRequestProps = {
  closeModal: () => void;
  leave: LeaveDetail;
};
export const ReviewLeaveRequest: React.FC<ReviewLeaveRequestProps> = ({ leave, closeModal }) => {
  const [rejectionNote, setRejectionNote] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [approve, { isLoading: isApproving }] = useApproveLeaveRequestMutation();
  const [reject, { isLoading: isRejecting }] = useRejectLeaveRequestMutation();

  useEffect(() => {
    setErr('');
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRejectionNote(event.target.value);
  };
  const onSave = async (action: 'approve' | 'reject') => {
    try {
      const { id } = leave;
      if (action === 'reject' && !rejectionNote.trim()) {
        setErr('Rejection reason is required');
        return;
      }

      const result =
        action === 'approve'
          ? await approve(id).unwrap()
          : await reject({ id, note: rejectionNote }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const { user, statusId, policy, fromDate, toDate, duration, submittedDate, updatedDate, note } =
    leave;
  const dateRange = `${getFormattedDate(fromDate, DATE_FORMAT)} - ${getFormattedDate(toDate, DATE_FORMAT)}`;

  return (
    <DialogModal
      isOpen={true}
      titleText='Review Leave Request'
      contextText='Approve or reject this leave request'
      closeModal={closeModal}
      showSaveDialogAction={false}
      showCancelDialogAction={false}
      size='sm'
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <HeadingText text={user} />
        <Box ml='auto'>{LEAVE_STATUS_CHIP[statusId]}</Box>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <SubSoftText text='Leave Type' />
          <SubHardText text={policy} />
          <Box sx={{ mt: 1 }} />
          <SubSoftText text='Date Range' />
          <SubHardText text={dateRange} />
          <Box sx={{ mt: 1 }} />
          <SubSoftText text='Duration' />
          <SubHardText text={`${duration} days`} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <SubSoftText text='Applied On' />
          <SubHardText text={getFormattedDate(submittedDate, DATE_FORMAT)} />
          <Box sx={{ mt: 1 }} />
          <SubSoftText text='Updated On' />
          <SubHardText text={getFormattedDate(updatedDate, DATE_FORMAT)} />
          <Box sx={{ mt: 1 }} />
          <SubSoftText text='Note' />
          <SubHardText text={note || '-'} />
        </Grid2>
      </Grid2>
      <FormControl fullWidth sx={{ mt: 3 }} error={!!err}>
        <FormLabel>Rejection Reason (required if rejecting)</FormLabel>
        <TextField
          value={rejectionNote}
          onChange={handleChange}
          size='small'
          multiline
          minRows={4}
          error={!!err}
          helperText={err}
        />
      </FormControl>
      <Box sx={{ mt: 3, display: 'flex' }}>
        <Stack sx={{ ml: 'auto', gap: 1 }} direction='row'>
          <Button size='small' variant='outlined' onClick={closeModal}>
            Close
          </Button>
          <Button
            size='small'
            color='error'
            variant='contained'
            loading={isRejecting}
            onClick={() => onSave('reject')}
          >
            Reject
          </Button>
          <Button
            size='small'
            variant='contained'
            loading={isApproving}
            onClick={() => onSave('approve')}
          >
            Approve
          </Button>
        </Stack>
      </Box>
    </DialogModal>
  );
};
