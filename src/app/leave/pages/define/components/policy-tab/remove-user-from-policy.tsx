import { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useRemoveUserFromPolicyMutation } from '@/app/leave/api';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type RemoveUserFromPolicyProps = {
  policyId: number;
  userId: number;
  closeModal: () => void;
};
export const RemoveUserFromPolicy: FC<RemoveUserFromPolicyProps> = ({
  policyId,
  userId,
  closeModal
}) => {
  const [removeUser, { isLoading: isRemovingUser }] = useRemoveUserFromPolicyMutation();

  const onSave = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const result = await removeUser({ policyId, userId }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isRemovingUser}
      titleText='Remove User'
      contextText='Are you sure you want to remove user from this policy?'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
    />
  );
};
