import * as React from 'react';
import { useForm } from 'react-hook-form';
import { AcademicPeriodFormProps, AcademicPeriodFormSchema } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatedAcademicPeriodMutation } from '../../api';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { PeriodForm } from './period-form';
import { DialogModal } from '@/components/dialog-modal';

type UpdatePeriodProps = {
  id: number;
  name: string;
  closeModal: () => void;
  academicLevelId: number;
};

const initialState = {
  name: '',
  academicLevelId: 1
};
export const UpdatePeriod: React.FC<UpdatePeriodProps> = ({
  id,
  name,
  closeModal,
  academicLevelId
}) => {
  const methods = useForm<AcademicPeriodFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(AcademicPeriodFormSchema)
  });
  const [updatePeriod, { isLoading: isUpdating }] = useUpdatedAcademicPeriodMutation();

  React.useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('academicLevelId', academicLevelId);
  }, []);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const handleSave = async (data: AcademicPeriodFormProps) => {
    try {
      const { name } = data;
      const result = await updatePeriod({ id, name }).unwrap();
      toast(result?.message);
      handleClear();
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
