import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { AcademicYearForm } from '../components/academic-year-form';
import { AcademicYearFormSchema } from '../types/academic-year-schema';
import { AcademicYearFormProps } from '../types';
import { useUpdateAcademicYearMutation } from '../academic-years-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { academicYearInitialState } from './academi-year-initial-state';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type UpdateAcademicYearProps = {
  closeModal: () => void;
  data: {
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
  const { id, name, academicLevelId, startDate, endDate } = data;

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('startDate', startDate);
    methods.setValue('endDate', endDate);
    methods.setValue('academicLevelId', academicLevelId);
  }, [data, methods]);

  const handleSave = async (data: AcademicYearFormProps) => {
    try {
      const payload = {
        ...data,
        startDate: getFormattedDate(data.startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(data.endDate, API_DATE_FORMAT),
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
      isOpen={true}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(handleSave)}
      isSaving={isUpdating}
    >
      <AcademicYearForm methods={methods} />
    </DialogModal>
  );
};
