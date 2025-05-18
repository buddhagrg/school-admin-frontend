import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LeaveForm } from '../leave-form';
import { type LeaveFormProps, type LeaveFormPropsWithId, LeaveFormSchema } from '../../types';
import { leaveFormState } from './leave-form-initial-state';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useUpdateLeaveRequestMutation } from '../../request-leave-api';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/shared/components';

type EditLeaveRequestProps = {
  closeModal: () => void;
  data: LeaveFormPropsWithId;
};
export const EditLeaveRequest: React.FC<EditLeaveRequestProps> = ({ data, closeModal }) => {
  const [updateLeave, { isLoading: isUpdating }] = useUpdateLeaveRequestMutation();
  const { policyId, fromDate, toDate, note, id } = data;
  const methods = useForm<LeaveFormProps>({
    defaultValues: leaveFormState,
    resolver: zodResolver(LeaveFormSchema)
  });

  useEffect(() => {
    if (data) {
      const { setValue } = methods;
      setValue('policyId', policyId);
      setValue('fromDate', fromDate);
      setValue('toDate', toDate);
      setValue('note', note);
    }
  }, [data, methods]);

  const onSave = async (data: LeaveFormProps) => {
    try {
      const { toDate, fromDate, ...rest } = data;
      const payload = {
        ...rest,
        fromDate: getFormattedDate(fromDate, API_DATE_FORMAT),
        toDate: getFormattedDate(toDate, API_DATE_FORMAT),
        id
      };
      const result = await updateLeave(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Update Request Leave'
      closeModal={closeModal}
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isUpdating}
      actionFooterSaveText='Update'
    >
      <LeaveForm methods={methods} />
    </DialogModal>
  );
};
