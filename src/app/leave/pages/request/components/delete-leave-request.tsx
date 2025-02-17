import { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteLeaveRequestMutation } from '@/app/leave/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeleteLeaveRequestProps = {
  id: number;
  closeModal: () => void;
};
export const DeleteLeaveRequest: FC<DeleteLeaveRequestProps> = ({ id, closeModal }) => {
  const [deleteLeaveRequest, { isLoading: isDeleting }] = useDeleteLeaveRequestMutation();

  const onSave = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      const result = await deleteLeaveRequest(id).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeleting}
      isOpen={true}
      titleText='Confirm Deletion'
      contextText='Are you sure you want to delete this leave request?'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      handleSave={onSave}
      closeModal={closeModal}
    />
  );
};
