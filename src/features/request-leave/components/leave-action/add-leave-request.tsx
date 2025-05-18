import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LeaveForm } from '../leave-form';
import { type LeaveFormProps, LeaveFormSchema } from '../../types';
import { leaveFormState } from './leave-form-initial-state';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useApplyLeaveRequestMutation } from '../../request-leave-api';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/shared/components';

type AddLeaveRequestProps = {
  closeModal: () => void;
};
export const AddLeaveRequest: React.FC<AddLeaveRequestProps> = ({ closeModal }) => {
  const [applyLeave, { isLoading: isApplying }] = useApplyLeaveRequestMutation();

  const methods = useForm<LeaveFormProps>({
    defaultValues: leaveFormState,
    resolver: zodResolver(LeaveFormSchema)
  });

  const onSave = async (data: LeaveFormProps) => {
    try {
      const { toDate, fromDate, ...rest } = data;
      const payload = {
        ...rest,
        fromDate: getFormattedDate(fromDate, API_DATE_FORMAT),
        toDate: getFormattedDate(toDate, API_DATE_FORMAT)
      };
      const result = await applyLeave(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Request Leave'
      closeModal={closeModal}
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isApplying}
    >
      <LeaveForm methods={methods} />
    </DialogModal>
  );
};
