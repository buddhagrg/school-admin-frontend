import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { AcademicPeriodFormProps, AcademicPeriodFormSchema } from '../../types';
import { useUpdateAcademicPeriodMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
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
  academicLevelId: 0
};
export const UpdatePeriod: FC<UpdatePeriodProps> = ({ id, name, closeModal, academicLevelId }) => {
  const methods = useForm<AcademicPeriodFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(AcademicPeriodFormSchema)
  });
  const [updatePeriod, { isLoading: isUpdating }] = useUpdateAcademicPeriodMutation();

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('academicLevelId', academicLevelId);
  }, []);

  const handleSave = async (data: AcademicPeriodFormProps) => {
    try {
      const payload = {
        academicLevelId,
        id,
        name: data.name
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
