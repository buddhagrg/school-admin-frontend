import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { type AcademicPeriodFormProps, AcademicPeriodFormSchema, type Period } from '../../types';
import { useUpdateAcademicPeriodMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { PeriodForm } from './period-form';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/shared/components';

type UpdatePeriodProps = Period & {
  closeModal: () => void;
};

const initialState: Omit<Period, 'id'> = {
  name: '',
  academicLevelId: 0,
  startDate: null,
  endDate: null
};
export const UpdatePeriod: React.FC<UpdatePeriodProps> = ({
  id,
  name,
  closeModal,
  academicLevelId,
  startDate,
  endDate
}) => {
  const methods = useForm<AcademicPeriodFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(AcademicPeriodFormSchema)
  });
  const [updatePeriod, { isLoading: isUpdating }] = useUpdateAcademicPeriodMutation();

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('academicLevelId', academicLevelId);
    methods.setValue('startDate', startDate);
    methods.setValue('endDate', endDate);
  }, [name, academicLevelId, startDate, endDate, methods]);

  const handleSave = async (data: AcademicPeriodFormProps) => {
    const { name, startDate, endDate, academicLevelId } = data;
    try {
      const payload = {
        academicLevelId,
        id,
        name,
        startDate: getFormattedDate(startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(endDate, API_DATE_FORMAT)
      };
      const result = await updatePeriod(payload).unwrap();
      toast(result?.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isUpdating}
      isOpen={true}
      titleText={'Update Period'}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(handleSave)}
    >
      <PeriodForm action='update' methods={methods} />
    </DialogModal>
  );
};
