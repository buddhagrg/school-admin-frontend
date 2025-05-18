import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { SectionForm } from './section-form';
import { type SectionFormProps, SectionFormSchema } from '../../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useAddSectionMutation } from '../../class-api';
import { DialogModal } from '@/shared/components';

const initialState: SectionFormProps = {
  name: '',
  classId: '',
  status: true
};
export const AddSection = ({ closeModal }: { closeModal: () => void }) => {
  const methods = useForm<SectionFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(SectionFormSchema)
  });
  const [addSection, { isLoading: isAdding }] = useAddSectionMutation();

  useEffect(() => {
    methods.reset(initialState);
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const onSave = async (data: SectionFormProps) => {
    try {
      const result = await addSection(data).unwrap();
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
      closeModal={closeModal}
      actionFooterCancelText='Cancel'
      actionFooterSaveText='Add Section'
      titleText='Add Section'
      contextText='Create a new section for a class'
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isAdding}
    >
      <SectionForm methods={methods} />
    </DialogModal>
  );
};
