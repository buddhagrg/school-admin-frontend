import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { ClassForm } from './class-form';
import { type ClassFormProps, ClassFormSchema } from '../../types';
import { useAddClassMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

const initialState: ClassFormProps = {
  name: '',
  academicLevelId: '',
  status: true
};
export const AddClass = ({ closeModal }: { closeModal: () => void }) => {
  const methods = useForm<ClassFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassFormSchema)
  });
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  useEffect(() => {
    methods.reset(initialState);
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const onSave = async (data: ClassFormProps) => {
    try {
      const result = await addClass(data).unwrap();
      toast(result.message);
      handleClear();
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Add new class'
      contextText='Add a new class for your institution'
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isAdding}
      actionFooterCancelText='Cancel'
      actionFooterSaveText='Add Class'
      closeModal={closeModal}
    >
      <ClassForm methods={methods} />
    </DialogModal>
  );
};
