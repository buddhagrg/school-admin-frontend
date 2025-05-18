import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useDeleteAcademicLevelMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type DeleteLevelProps = {
  closeModal: () => void;
  id: number;
  name: string;
};
export const DeleteLevel: React.FC<DeleteLevelProps> = ({ closeModal, id, name }) => {
  const [deleteLevel, { isLoading: isDeleting }] = useDeleteAcademicLevelMutation();

  const handleSave = async () => {
    try {
      const result = await deleteLevel(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      titleText='Confirm Deletion'
      contextText={`Are you sure you want to delete the level "${name}"?`}
      isSaving={isDeleting}
      handleSave={handleSave}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
