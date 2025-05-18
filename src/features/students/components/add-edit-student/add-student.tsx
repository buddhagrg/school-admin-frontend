import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';

import { useAddStudentMutation } from '../../students-api';
import { type StudentFormProps, StudentFormSchema } from '../../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { studentFormInitialState } from '../student-initial-state';
import { StudenStepper } from './student-stepper';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal, RequiredField } from '@/shared/components';

type AddStudentProps = {
  closeModal: () => void;
};
export const AddStudent: React.FC<AddStudentProps> = ({ closeModal }) => {
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const methods = useForm<StudentFormProps>({
    defaultValues: studentFormInitialState,
    resolver: zodResolver(StudentFormSchema)
  });

  const onSave = async (data: StudentFormProps) => {
    try {
      const { admissionDate, dob, ...rest } = data;
      const result = await addStudent({
        ...rest,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        admissionDate: getFormattedDate(admissionDate, API_DATE_FORMAT)
      }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const hasError = Object.keys(methods.formState.errors).length > 0;
  return (
    <DialogModal
      size='md'
      isOpen={true}
      isModalClosedOnOutClick={false}
      isSaving={isLoading || hasError}
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
      titleText='Add New Student'
      contextText='Enter student details to add them to the system'
      actionFooterSaveText='Add Student'
    >
      <StudenStepper methods={methods} />
      <Box mt={3} />
      <RequiredField />
    </DialogModal>
  );
};
