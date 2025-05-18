import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { PolicyForm } from '../policy-form';
import { type PolicyFormProps, PolicyFormSchema } from '../../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { usePolicyDetail } from '../../leave-policy-context-provider';
import { useUpdateLeavePolicyMutation } from '../../leave-policy-api';
import { DialogModal } from '@/shared/components';

type UpdatePolicyProps = {
  closeModal: () => void;
};
export const UpdatePolicy: React.FC<UpdatePolicyProps> = ({ closeModal }) => {
  const { state, setState } = usePolicyDetail();
  const [updatePolicy, { isLoading: isUpdating }] = useUpdateLeavePolicyMutation();
  const methods = useForm<PolicyFormProps>({
    defaultValues: { name: '', isActive: true },
    resolver: zodResolver(PolicyFormSchema)
  });

  useEffect(() => {
    if (state?.name) {
      methods.setValue('name', state?.name);
      methods.setValue('isActive', state?.isActive || false);
    }
  }, [state?.name, state?.isActive, methods]);

  const onSave = async (data: PolicyFormProps) => {
    try {
      if (!state?.id) return;

      const payload = { ...data, id: state.id };
      const result = await updatePolicy(payload).unwrap();
      toast.info(result.message);
      setState(null);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
      titleText='Edit Leave Policy'
      contextText='Update the details of this leave policy'
      isSaving={isUpdating}
      actionFooterSaveText='Update Policy'
    >
      <PolicyForm methods={methods} />
    </DialogModal>
  );
};
