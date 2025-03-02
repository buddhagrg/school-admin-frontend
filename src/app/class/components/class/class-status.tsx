import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useUpdateClassStatusMutation } from '../../class-api';

type ClassStatusProps = {
  id: number;
  name: string;
  closeModal: () => void;
  action: string;
};
export const ClassStatus: FC<ClassStatusProps> = ({ id, name, closeModal, action }) => {
  const [updateClassStatus, { isLoading: isUpdating }] = useUpdateClassStatusMutation();

  const handleSave = async () => {
    try {
      const payload = {
        id,
        status: action === 'activate' ? true : false
      };
      const result = await updateClassStatus(payload).unwrap();
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
      isSaving={isUpdating}
      contextText={`Are you sure you want to ${action} the class "${name}"?`}
      closeModal={closeModal}
      handleSave={handleSave}
    />
  );
};
