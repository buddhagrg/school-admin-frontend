import * as React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeleteAccessControlMutation } from '../api';

type DeleteAccessControlProps = {
  permissionId: number;
  closeModal: () => void;
};

export const DeleteAccessControl: React.FC<DeleteAccessControlProps> = ({
  permissionId,
  closeModal
}) => {
  const [deletePermission, { isLoading: isDeleting }] = useDeleteAccessControlMutation();

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
      contextText='Are you sure you want to delete this access control?'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
