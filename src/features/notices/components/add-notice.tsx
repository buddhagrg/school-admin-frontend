import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { type NoticeFormProps, NoticeFormSchema } from '../types';
import { noticeFormState } from './notice-form-state';
import { useAddNoticeMutation } from '../notice-api';
import { NoticeForm } from './notice-form';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type AddNoticeProps = {
  closeModal: () => void;
};
export const AddNotice: React.FC<AddNoticeProps> = ({ closeModal }) => {
  const [addNotice, { isLoading: isAdding }] = useAddNoticeMutation();

  const methods = useForm<NoticeFormProps>({
    defaultValues: noticeFormState,
    resolver: zodResolver(NoticeFormSchema)
  });

  const onSave = async (data: NoticeFormProps) => {
    try {
      const result = await addNotice(data).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Add Notice'
      contextText='Fill in the details to create a new notice'
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
      isSaving={isAdding}
      actionFooterSaveText='Add Notice'
      size='sm'
    >
      <NoticeForm methods={methods} />
    </DialogModal>
  );
};
