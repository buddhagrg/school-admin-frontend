import { FC, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { ClassFormProps, ClassFormSchema } from '../../types';
import { useUpdateClassMutation } from '../../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassForm } from './class-form';

type UpdateClassProps = {
  closeModal: () => void;
  id: number;
  name: string;
};
export const UpdateClass: FC<UpdateClassProps> = ({ closeModal, id, name }) => {
  const methods = useForm<ClassFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(ClassFormSchema)
  });
  const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();

  useEffect(() => {
    methods.setValue('name', name);
  }, []);

  const handleSave = async (data: ClassFormProps) => {
    try {
      const payload = { id, name: data.name };
      const result = await updateClass(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Update Class'
      closeModal={closeModal}
      isSaving={isUpdating}
      handleSave={methods.handleSubmit(handleSave)}
    >
      <ClassForm methods={methods} action='update' />
    </DialogModal>
  );
};
