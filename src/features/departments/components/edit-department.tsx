import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useUpdateDepartmentMutation } from '../department-api';
import { type DepartmentFormProps, DepartmentFormSchema } from '../types';
import { DepartmentForm } from './department-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { DialogModal } from '@/shared/components';

type EditDepartmentProps = {
  id: number;
  name: string;
  closeModal: () => void;
};
export const EditDepartment: React.FC<EditDepartmentProps> = ({ id, name, closeModal }) => {
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  const methods = useForm<DepartmentFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(DepartmentFormSchema)
  });

  useEffect(() => {
    if (name) {
      methods.setValue('name', name);
    }
  }, [name, methods]);

  const onSave = async (data: DepartmentFormProps) => {
    try {
      const payload = { ...data, id };
      const result = await updateDepartment(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
      titleText='Edit Department'
      actionFooterSaveText='Update Department'
      isSaving={isUpdating}
    >
      <DepartmentForm methods={methods} />
    </DialogModal>
  );
};
