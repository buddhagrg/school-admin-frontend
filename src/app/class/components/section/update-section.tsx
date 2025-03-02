import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { SectionForm } from './section-form';
import { SectionFormProps, SectionFormSchema } from '../../types';
import { useUpdateSectionMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/components/dialog-modal';

type EditSectionType = {
  closeModal: () => void;
  id: number;
  classId: number;
  name: string;
};
export const UpdateSection: FC<EditSectionType> = ({ closeModal, id, classId, name }) => {
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
