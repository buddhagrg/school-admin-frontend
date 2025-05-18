import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { AcademicYearFormSchema, type AcademicYearFormProps } from '../types';
import { AcademicYearForm } from './academic-year-form';
import { useAddAcademicYearMutation } from '../academic-years-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { academicYearInitialState } from './academi-year-initial-state';
import { DialogModal } from '@/shared/components';

type AddAcademicYearProps = {
  closeModal: () => void;
};
export const AddAcademicYear: React.FC<AddAcademicYearProps> = ({ closeModal }) => {
  const methods = useForm<AcademicYearFormProps>({
    defaultValues: academicYearInitialState,
    resolver: zodResolver(AcademicYearFormSchema)
  });
  const [addAademicYear, { isLoading: isAdding }] = useAddAcademicYearMutation();

  const handleClear = () => {
    methods.reset(academicYearInitialState);
  };
  const onSave = async (data: AcademicYearFormProps) => {
    try {
      const result = await addAademicYear(data).unwrap();
      toast.info(result.message);
      handleClear();
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Add Academic Year'
      contextText='Create a new academic year. Set start and end dates.'
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isAdding}
      closeModal={closeModal}
    >
      <AcademicYearForm methods={methods} />
    </DialogModal>
  );
};
