import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeleteDepartmentMutation } from '../department-api';
import { DialogModal } from '@/shared/components';

type DeleteDepartmentProps = {
  closeModal: () => void;
  id: number;
};
export const DeleteDepartment: React.FC<DeleteDepartmentProps> = ({ id, closeModal }) => {
  const [deleteDepartment, { isLoading: isDeletingDepartment }] = useDeleteDepartmentMutation();

  const onSave = async () => {
    try {
      const result = await deleteDepartment(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeletingDepartment}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
      titleText='Confirm Deletion'
      contextText='Are you sure you want to delete this department?'
    />
  );
};
