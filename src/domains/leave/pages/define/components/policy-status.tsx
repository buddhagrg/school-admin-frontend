import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useHandleLeavePolicyMutation } from '../../../api/leave-api';

type PolicyStatusProps = {
  title: string;
  contextText: string;
  policyId: number;
  policyStatus: boolean;
  closeModal: () => void;
};

export const PolicyStatus: React.FC<PolicyStatusProps> = ({
  title,
  contextText,
  policyId,
  closeModal,
  policyStatus
}) => {
  const [handlePolicyStatus, { isLoading: isHandlingPolicyStatus }] =
    useHandleLeavePolicyMutation();

  const handlePolicyStatusSubmit = async () => {
    try {
      const result = await handlePolicyStatus({ id: policyId, status: policyStatus }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isHandlingPolicyStatus}
      isOpen={true}
      titleText={title}
      closeModal={closeModal}
      handleSave={handlePolicyStatusSubmit}
      contextText={<Typography variant='body1'>{contextText}</Typography>}
    />
  );
};
