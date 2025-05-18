import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeletePermissionMutation } from '../permission-api';
import { DialogModal } from '@/shared/components';

type DeletePermissionProps = {
  permissionId: number;
  closeModal: () => void;
};

export const DeletePermission: React.FC<DeletePermissionProps> = ({ permissionId, closeModal }) => {
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
