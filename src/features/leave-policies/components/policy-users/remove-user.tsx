import React from 'react';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useRemoveUserFromPolicyMutation } from '../../leave-policy-api';
import { usePolicyDetail } from '../../leave-policy-context-provider';
import { DialogModal } from '@/shared/components';

type RemoveUserProps = {
  id: number;
  closeModal: () => void;
};
export const RemoveUser: React.FC<RemoveUserProps> = ({ id, closeModal }) => {
  const [removeUser, { isLoading: isRemoving }] = useRemoveUserFromPolicyMutation();
  const { state } = usePolicyDetail();

  const onSave = async () => {
    try {
      if (!state?.id) return;

      const payload = { userId: id, policyId: state.id };
      const result = await removeUser(payload).unwrap();
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
      contextText='Are you sure you want to remove this user from current leave policy?'
      closeModal={closeModal}
      isSaving={isRemoving}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      handleSave={onSave}
    />
  );
};
