import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { SectionForm } from './section-form';
import { type SectionFormProps, SectionFormSchema } from '../../types';
import { useUpdateSectionMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type UpdateSectionProps = {
  closeModal: () => void;
  id: number;
  classId: number;
  name: string;
  status: boolean;
};
export const UpdateSection: React.FC<UpdateSectionProps> = ({
  closeModal,
  id,
  classId,
  name,
  status
}) => {
  const methods = useForm<SectionFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(SectionFormSchema)
  });
  const [editSection, { isLoading: isUpdating }] = useUpdateSectionMutation();

  useEffect(() => {
    methods.setValue('name', name);
    methods.setValue('classId', classId);
    methods.setValue('status', status);
  }, [methods, name, classId, status]);

  const handleSave = async (data: SectionFormProps) => {
    try {
      const payload = {
        ...data,
        id
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
      contextText='Update section details'
      handleSave={methods.handleSubmit(handleSave)}
      isSaving={isUpdating}
      isOpen={true}
    >
      <SectionForm methods={methods} />
    </DialogModal>
  );
};
