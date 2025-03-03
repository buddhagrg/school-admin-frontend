import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DialogModal } from '@/components/dialog-modal';
import { FiscalYearForm } from './fiscal-year-form';
import { useUpdateFiscalYearMutation } from '../fiscal-years-api';
import { FiscalYearFormProps, FiscalYearFormPropsWithId, FiscalYearFormSchema } from '../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { fiscalYearInitialState } from './fiscal-year-initial-state';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type UpdateFiscalYearProps = {
  data: FiscalYearFormPropsWithId;
  closeModal: () => void;
};
export const UpdateFiscalYear: React.FC<UpdateFiscalYearProps> = ({ data, closeModal }) => {
  const { id, name, startDate, endDate } = data;
  const [updateFiscalYear, { isLoading: isUpdating }] = useUpdateFiscalYearMutation();
  const methods = useForm<FiscalYearFormProps>({
    defaultValues: fiscalYearInitialState,
    resolver: zodResolver(FiscalYearFormSchema)
  });

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('startDate', startDate);
    methods.setValue('endDate', endDate);
  }, [methods, name, startDate, endDate]);

  const handleSave = async (data: FiscalYearFormProps) => {
    try {
      const payload = {
        ...data,
        startDate: getFormattedDate(data.startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(data.endDate, API_DATE_FORMAT),
        id
      };
      const result = await updateFiscalYear(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Update Fiscal Year'
      closeModal={closeModal}
      handleSave={methods.handleSubmit(handleSave)}
      isSaving={isUpdating}
    >
      <FiscalYearForm methods={methods} />
    </DialogModal>
  );
};
