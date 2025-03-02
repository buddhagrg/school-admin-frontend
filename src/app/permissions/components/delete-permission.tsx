import { FC } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeletePermissionMutation } from '../permission-api';

type DeletePermissionProps = {
  permissionId: number;
  closeModal: () => void;
};

export const DeletePermission: FC<DeletePermissionProps> = ({ permissionId, closeModal }) => {
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const onDelete = async () => {
    try {
      const result = await deletePermission(permissionId).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      isSaving={isDeleting}
      handleSave={onDelete}
      closeModal={closeModal}
      titleText='Confirm Deletion'
      contextText='Are you sure you want to delete this permission?'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
