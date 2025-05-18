import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Box } from '@mui/material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useGetStaffDetailQuery, useUpdateStaffMutation } from '../../staff-api';
import { type StaffFormProps, StaffFormSchema } from '../../types';
import { staffFormInitialState } from '../staff-form-initial-state';
import { StaffStepper } from './staff-stepper';
import { DialogModal, RequiredField } from '@/shared/components';

type EditStaffProps = {
  id: number;
  closeModal: () => void;
};
export const EditStaff: React.FC<EditStaffProps> = ({ id, closeModal }) => {
  const { data, isLoading } = useGetStaffDetailQuery({ id, mode: 'edit' }, { skip: !id });
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

  const methods = useForm<StaffFormProps>({
    defaultValues: staffFormInitialState,
    resolver: zodResolver(StaffFormSchema)
  });

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  const onSave = async (data: StaffFormProps) => {
    try {
      const { joinDate, dob, ...rest } = data;
      const result = await updateStaff({
        ...rest,
        id,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        joinDate: getFormattedDate(joinDate, API_DATE_FORMAT)
      }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      titleText='Edit Staff Account'
      contextText='Update staff information in the system'
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isUpdating}
      size='md'
    >
      <StaffStepper methods={methods} isLoading={isLoading} />
      <Box mt={3} />
      <RequiredField />
    </DialogModal>
  );
};
