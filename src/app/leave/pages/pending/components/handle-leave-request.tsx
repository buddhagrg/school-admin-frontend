import { FC, MouseEvent } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { useHandlePendingLeaveStatusMutation } from '@/app/leave/leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type HandleLeaveReuqestProps = {
  leaveId: number;
  status: number;
  titleText: string;
  closeModal: () => void;
  contextText: string;
};

export const HandleLeaveRequest: FC<HandleLeaveReuqestProps> = ({
  leaveId,
  status,
  titleText,
  closeModal,
  contextText
}) => {
  const [handleLeaveStatus, { isLoading: isHandlingLeaveStatus }] =
    useHandlePendingLeaveStatusMutation();

  const onSave = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      const result = await handleLeaveStatus({ id: leaveId, status }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isHandlingLeaveStatus}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      handleSave={onSave}
      isOpen={true}
      titleText={titleText}
      contextText={contextText}
      closeModal={closeModal}
    />
  );
};
