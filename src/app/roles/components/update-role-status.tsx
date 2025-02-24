import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useUpdateRoleStatusMutation } from '../api';

type UpdateRoleStatusProps = {
  roleStatus: boolean;
  roleId: number;
  closeModals: () => void;
  title: string;
  contextText: string;
};

export const UpdateRoleStatus: FC<UpdateRoleStatusProps> = ({
  roleId,
  closeModals,
  roleStatus,
  title,
  contextText
}) => {
  const [updateRoleStatus, { isLoading: isUpdating }] = useUpdateRoleStatusMutation();

  const onSave = async () => {
    try {
      const result = await updateRoleStatus({ id: roleId, status: roleStatus }).unwrap();
      toast.info(result.message);
      closeModals();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isUpdating}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      titleText={title}
      contextText={contextText}
      closeModal={closeModals}
      handleSave={onSave}
    />
  );
};
