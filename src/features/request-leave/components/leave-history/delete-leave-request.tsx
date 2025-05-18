import React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useDeleteLeaveRequestMutation } from '../../request-leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type DeleteLeaveRequestProps = {
  id: number;
  closeModal: () => void;
};
export const DeleteLeaveRequest: React.FC<DeleteLeaveRequestProps> = ({ id, closeModal }) => {
  const [deleteLeave, { isLoading: isDeleting }] = useDeleteLeaveRequestMutation();

  const onSave = async () => {
    try {
      const result = await deleteLeave(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  return (
    <DialogModal
      isOpen={true}
      titleText='Confirm Deletion'
      closeModal={closeModal}
      contextText={`Are you sure you want to delete this leave request?`}
      isSaving={isDeleting}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      handleSave={onSave}
    />
  );
};
