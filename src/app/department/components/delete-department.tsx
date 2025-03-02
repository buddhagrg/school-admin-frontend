import { FC } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/components/dialog-modal';
import { useDeleteDepartmentMutation } from '../department-api';

type DeleteDepartmentProps = {
  closeModal: () => void;
  departmentId: number;
};
export const DeleteDepartment: FC<DeleteDepartmentProps> = ({ departmentId, closeModal }) => {
  const [deleteDepartment, { isLoading: isDeletingDepartment }] = useDeleteDepartmentMutation();

  const onSave = async () => {
    try {
      const result = await deleteDepartment(departmentId).unwrap();
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
