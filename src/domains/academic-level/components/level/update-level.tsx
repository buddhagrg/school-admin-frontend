import * as React from 'react';
import { DialogModal } from '@/components/dialog-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AcademicLevelFormProps, AcademicLevelFormSchema } from '../../types';
import { useUpdateAcademicLevelMutation } from '../../api';
import { LevelForm } from './level-form';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

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

  React.useEffect(() => {
    methods.setValue('name', name);
  }, []);

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
