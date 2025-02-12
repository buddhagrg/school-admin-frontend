import { useForm } from 'react-hook-form';
import { SectionForm } from './section-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionFormProps, SectionFormSchema } from '../../types';
import React, { useEffect } from 'react';
import { useUpdateSectionMutation } from '../../api';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { DialogModal } from '@/components/dialog-modal';

type EditSectionType = {
  closeModal: () => void;
  id: number;
  classId: number;
  name: string;
};
export const UpdateSection: React.FC<EditSectionType> = ({ closeModal, id, classId, name }) => {
  const methods = useForm<SectionFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(SectionFormSchema)
  });
  const [editSection, { isLoading: isUpdating }] = useUpdateSectionMutation();

  useEffect(() => {
    methods.setValue('name', name);
  }, []);

  const handleSave = async (data: SectionFormProps) => {
    try {
      const payload = {
        classId,
        id,
        name: data.name
      };
      const result = await editSection(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  return (
    <DialogModal
      closeModal={closeModal}
      titleText='Update Section'
      handleSave={methods.handleSubmit(handleSave)}
      isSaving={isUpdating}
      isOpen={true}
    >
      <SectionForm methods={methods} action='update' />
    </DialogModal>
  );
};
