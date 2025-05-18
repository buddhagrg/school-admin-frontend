import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { AcademicYearForm } from './academic-year-form';
import { useUpdateAcademicYearMutation } from '../academic-years-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { academicYearInitialState } from './academi-year-initial-state';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/shared/components';
import { type AcademicYearFormProps, AcademicYearFormSchema } from '../types';

type UpdateAcademicYearProps = {
  closeModal: () => void;
  data: {
    isActive: boolean;
    id: number;
    name: string;
    academicLevelId: number | string;
    startDate: Date | null | string;
    endDate: Date | null | string;
  };
};
export const UpdateAcademicYear: React.FC<UpdateAcademicYearProps> = ({ closeModal, data }) => {
  const methods = useForm<AcademicYearFormProps>({
    defaultValues: academicYearInitialState,
    resolver: zodResolver(AcademicYearFormSchema)
  });
  const [updateAcademicYear, { isLoading: isUpdating }] = useUpdateAcademicYearMutation();

  useEffect(() => {
    if (data) {
      const { name, academicLevelId, startDate, endDate, isActive } = data;
      methods.setValue('name', name);
      methods.setValue('startDate', startDate);
      methods.setValue('endDate', endDate);
      methods.setValue('academicLevelId', academicLevelId);
      methods.setValue('isActive', isActive);
    }
  }, [data, methods]);

  const handleSave = async (formData: AcademicYearFormProps) => {
    try {
      const { id } = data;
      const payload = {
        ...formData,
        startDate: getFormattedDate(formData.startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(formData.endDate, API_DATE_FORMAT),
        id
      };
      const result = await updateAcademicYear(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      titleText='Update Academic Year'
      contextText='Update the academic year details.'
      isOpen={true}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(handleSave)}
      isSaving={isUpdating}
    >
      <AcademicYearForm methods={methods} />
    </DialogModal>
  );
};
