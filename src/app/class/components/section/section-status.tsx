import { FC } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useUpdateSectionStatusMutation } from '../../class-api';

type SectionStatusProps = {
  closeModal: () => void;
  classId: number;
  id: number;
  name: string;
  action: string;
};
export const SectionStatus: FC<SectionStatusProps> = ({
  classId,
  id,
  closeModal,
  name,
  action
}) => {
  const [updateSectionStatus, { isLoading: isUpdating }] = useUpdateSectionStatusMutation();

  const handleSave = async () => {
    try {
      const payload = { classId, id, status: action === 'activate' ? true : false };
      const result = await updateSectionStatus(payload).unwrap();
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
      contextText={`Are you sure you want to ${action} the section "${name}"?`}
      handleSave={handleSave}
      closeModal={closeModal}
      isSaving={isUpdating}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
