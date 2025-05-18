import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type Notice, type NoticeFormProps, NoticeFormSchema } from '../types';
import { useUpdateNoticeMutation } from '../notice-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { NoticeForm } from './notice-form';
import { noticeFormState } from './notice-form-state';
import { DialogModal } from '@/shared/components';

type EditNoticeProps = {
  closeModal: () => void;
  notice: Notice;
};
export const EditNotice: React.FC<EditNoticeProps> = ({ notice, closeModal }) => {
  const [updateNotice, { isLoading: isUpdating }] = useUpdateNoticeMutation();
  const methods = useForm<NoticeFormProps>({
    defaultValues: noticeFormState,
    resolver: zodResolver(NoticeFormSchema)
  });

  useEffect(() => {
    if (notice) {
      const { setValue } = methods;
      const { title, description, statusId, recipientType, recipientRole, recipientFirstField } =
        notice;
      setValue('title', title);
      setValue('description', description);
      setValue('status', statusId);
      setValue('recipientType', recipientType);
      setValue('recipientRole', recipientRole);
      setValue('firstField', recipientFirstField);
    }
  }, [notice, methods]);

  const onSave = async (data: NoticeFormProps) => {
    try {
      const result = await updateNotice({ ...data, id: notice.id }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Edit notice'
      contextText='Update the notice details below.'
      isSaving={isUpdating}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(onSave)}
      size='sm'
    >
      <NoticeForm methods={methods} />
    </DialogModal>
  );
};
