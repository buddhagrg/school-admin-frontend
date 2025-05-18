import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Box } from '@mui/material';

import { StudenStepper } from './student-stepper';
import { useGetStudentDetailQuery, useUpdateStudentMutation } from '../../students-api';
import { type StudentFormProps, StudentFormSchema } from '../../types';
import { studentFormInitialState } from '../student-initial-state';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal, RequiredField } from '@/shared/components';

type EditStudentProps = {
  id: number;
  closeModal: () => void;
};
export const EditStudent: React.FC<EditStudentProps> = ({ id, closeModal }) => {
  const { data, isLoading } = useGetStudentDetailQuery({ id, mode: 'edit' }, { skip: !id });
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const methods = useForm<StudentFormProps>({
    defaultValues: studentFormInitialState,
    resolver: zodResolver(StudentFormSchema)
  });

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  const onSave = async (data: StudentFormProps) => {
    try {
      const { admissionDate, dob, ...rest } = data;
      const result = await updateStudent({
        ...rest,
        id,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        admissionDate: getFormattedDate(admissionDate, API_DATE_FORMAT)
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
      titleText='Edit Student Account'
      contextText='Update student information in the system'
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isUpdating}
      size='md'
    >
      <StudenStepper methods={methods} isLoading={isLoading} />
      <Box mt={3} />
      <RequiredField />
    </DialogModal>
  );
};
