import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { type ClassFormProps, ClassFormSchema } from '../../types';
import { useUpdateClassMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassForm } from './class-form';
import { DialogModal } from '@/shared/components';

type UpdateClassProps = {
  closeModal: () => void;
  id: number;
  name: string;
  academicLevelId: number;
  status: boolean;
};
export const UpdateClass: React.FC<UpdateClassProps> = ({
  closeModal,
  academicLevelId,
  status,
  id,
  name
}) => {
  const methods = useForm<ClassFormProps>({
    defaultValues: { name: '', academicLevelId: '', status: false },
    resolver: zodResolver(ClassFormSchema)
  });
  const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('academicLevelId', academicLevelId);
    methods.setValue('status', status);
  }, [methods, name, academicLevelId, status]);

  const handleSave = async (data: ClassFormProps) => {
    try {
      const payload = { ...data, id };
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
      contextText='Update class details'
      closeModal={closeModal}
      isSaving={isUpdating}
      handleSave={methods.handleSubmit(handleSave)}
    >
      <ClassForm methods={methods} />
    </DialogModal>
  );
};
