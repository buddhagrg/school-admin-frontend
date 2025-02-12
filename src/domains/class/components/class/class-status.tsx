import { DialogModal } from '@/components/dialog-modal';
import { useActivateClassMutation, useDeactivateClassMutation } from '../../api';
import React from 'react';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

type ClassStatusProps = {
  id: number;
  name: string;
  closeModal: () => void;
  action: string;
};
export const ClassStatus: React.FC<ClassStatusProps> = ({ id, name, closeModal, action }) => {
  const [deactivateClass, { isLoading: isDeactivating }] = useDeactivateClassMutation();
  const [activateClass, { isLoading: isActivating }] = useActivateClassMutation();

  const handleSave = async () => {
    try {
      const result =
        action === 'activate'
          ? await activateClass(id).unwrap()
          : await deactivateClass(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const titleText = action === 'activate' ? 'Confirm Activation' : 'Confirm Deactivation';
  return (
    <DialogModal
      isOpen={true}
      titleText={titleText}
      isSaving={isDeactivating || isActivating}
      contextText={`Are you sure you want to ${action} the class "${name}"?`}
      closeModal={closeModal}
      handleSave={handleSave}
    />
  );
};
