import { useState } from 'react';
import { CalendarMonth } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useLeaveRequest } from '../context/leave-request-provider';
import { DialogModal } from '@/components/dialog-modal';
import { useApplyLeaveRequestMutation } from '@/app/leave/leave-api';
import { LeaveRequestForm, LeaveRequestFormSchema } from '@/app/leave/types';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { LeaveForm } from '@/app/leave/components';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const RequestNewLeave = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [applyLeaveRequest, { isLoading: isApplyingLeave }] = useApplyLeaveRequestMutation();
  const { myLeavePolicies } = useLeaveRequest();

  const methods = useForm<LeaveRequestForm>({
    defaultValues: {
      policyId: myLeavePolicies.length > 0 ? myLeavePolicies[0].id : '',
      from: new Date(),
      to: new Date(),
      note: ''
    },
    resolver: zodResolver(LeaveRequestFormSchema)
  });

  const toggleModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const onSave = async (data: LeaveRequestForm) => {
    try {
      const { policyId, from, to, note } = data;
      const payload = {
        policyId,
        from: getFormattedDate(from, API_DATE_FORMAT),
        to: getFormattedDate(to, API_DATE_FORMAT),
        note
      };
      const result = await applyLeaveRequest(payload).unwrap();
      toast.success(result.message);
      toggleModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Button
        size='small'
        variant='contained'
        onClick={toggleModal}
        startIcon={<CalendarMonth />}
        sx={{ marginBottom: '10px' }}
      >
        Request Leave
      </Button>

      {isOpen && (
        <DialogModal
          isSaving={isApplyingLeave}
          titleText='Submit Request'
          isOpen={true}
          closeModal={toggleModal}
          handleSave={methods.handleSubmit(onSave)}
        >
          <LeaveForm methods={methods} leavePolicies={myLeavePolicies} />
        </DialogModal>
      )}
    </>
  );
};
