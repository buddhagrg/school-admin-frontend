import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';

import { PolicyForm } from './policy-form';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useAddLeavePolicyMutation } from '../leave-policy-api';
import { DialogModal } from '@/shared/components';
import { type PolicyFormProps, PolicyFormSchema } from '../types';

type AddPolicyProps = {
  closeModal: () => void;
};
export const AddPolicy: React.FC<AddPolicyProps> = ({ closeModal }) => {
  const [addPolicy, { isLoading: isAdding }] = useAddLeavePolicyMutation();

  const methods = useForm<PolicyFormProps>({
    defaultValues: { name: '', isActive: true },
    resolver: zodResolver(PolicyFormSchema)
  });

  const onSave = async (data: PolicyFormProps) => {
    try {
      const result = await addPolicy(data).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Add New Leave Policy'
      contextText='Create a new leave policy for your organization'
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
      isSaving={isAdding}
    >
      <PolicyForm methods={methods} />
    </DialogModal>
  );
};
