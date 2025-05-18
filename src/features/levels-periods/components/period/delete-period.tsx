import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { useDeleteAcademicPeriodMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type DeletePeriodProps = {
  closeModal: () => void;
  id: number;
  name: string;
  academicLevelId: number;
};
export const DeletePeriod: React.FC<DeletePeriodProps> = ({
  academicLevelId,
  closeModal,
  id,
  name
}) => {
  const [deletePeriod, { isLoading: isDeleting }] = useDeleteAcademicPeriodMutation();

  const handleSave = async () => {
    try {
      const result = await deletePeriod({ id, academicLevelId }).unwrap();
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
