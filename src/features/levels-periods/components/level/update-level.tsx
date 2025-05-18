import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { type AcademicLevelFormProps, AcademicLevelFormSchema } from '../../types';
import { useUpdateAcademicLevelMutation } from '../../levels-periods-api';
import { LevelForm } from './level-form';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type UpdateLevelProps = {
  closeModal: () => void;
  id: number;
  name: string;
};
export const UpdateLevel: React.FC<UpdateLevelProps> = ({ id, name, closeModal }) => {
  const methods = useForm<AcademicLevelFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(AcademicLevelFormSchema)
  });
  const [updateLevel, { isLoading: isUpdating }] = useUpdateAcademicLevelMutation();

  useEffect(() => {
    methods.setValue('name', name);
  }, [methods, name]);

  const handleClear = () => {
    methods.reset({ name: '' });
  };
  const handleSave = async ({ name }: AcademicLevelFormProps) => {
    try {
      const result = await updateLevel({ id, name }).unwrap();
      toast(result.message);
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
      titleText={'Update Level'}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(handleSave)}
    >
      <LevelForm methods={methods} />
    </DialogModal>
  );
};
