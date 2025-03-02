import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteAcademicPeriodMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeletePeriodProps = {
  closeModal: () => void;
  id: number;
  name: string;
};
export const DeletePeriod: FC<DeletePeriodProps> = ({ closeModal, id, name }) => {
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
