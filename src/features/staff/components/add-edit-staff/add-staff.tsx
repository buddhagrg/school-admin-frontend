import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useAddStaffMutation } from '../../staff-api';
import { type StaffFormProps, StaffFormSchema } from '../../types';
import { staffFormInitialState } from '../staff-form-initial-state';
import { StaffStepper } from './staff-stepper';
import { DialogModal, RequiredField } from '@/shared/components';

type AddStaffProps = {
  closeModal: () => void;
};
export const AddStaff: React.FC<AddStaffProps> = ({ closeModal }) => {
  const [addStaff, { isLoading }] = useAddStaffMutation();

  const methods = useForm<StaffFormProps>({
    defaultValues: staffFormInitialState,
    resolver: zodResolver(StaffFormSchema)
  });

  const onSave = async (data: StaffFormProps) => {
    try {
      const { joinDate, dob, ...rest } = data;
      const result = await addStaff({
        ...rest,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        joinDate: getFormattedDate(joinDate, API_DATE_FORMAT)
      }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const {
    formState: { errors },
    handleSubmit
  } = methods;
  const hasError = Object.keys(errors).length > 0;
  return (
    <DialogModal
      size='md'
      isOpen={true}
      isModalClosedOnOutClick={false}
      isSaving={isLoading || hasError}
      handleSave={handleSubmit(onSave)}
      closeModal={closeModal}
      titleText='Add New Staff'
      contextText='Enter staff details to add them to the system'
      actionFooterSaveText='Add Staff'
    >
      <StaffStepper methods={methods} />
      <Box mt={3} />
      <RequiredField />
    </DialogModal>
  );
};
