import * as React from 'react';
import { DialogModal } from '@/components/dialog-modal';
import { useDeleteAcademicPeriodMutation } from '../../api';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

type DeletePeriodProps = {
  closeModal: () => void;
  id: number;
  name: string;
};
export const DeletePeriod: React.FC<DeletePeriodProps> = ({ closeModal, id, name }) => {
  const [deletePeriod, { isLoading: isDeleting }] = useDeleteAcademicPeriodMutation();

  const handleSave = async () => {
    try {
      const result = await deletePeriod(id).unwrap();
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
      contextText={`Are you sure you want to delete the period "${name}"?`}
      isSaving={isDeleting}
      handleSave={handleSave}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
