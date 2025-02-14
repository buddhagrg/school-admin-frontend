import { FC } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useActivateSectionMutation, useDeactivateSectionMutation } from '../../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

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
  const [deactivateSection, { isLoading: isDeactivating }] = useDeactivateSectionMutation();
  const [activateSection, { isLoading: isActivating }] = useActivateSectionMutation();

  const handleSave = async () => {
    try {
      const payload = { classId, id };
      const result =
        action === 'deactivate'
          ? await deactivateSection(payload).unwrap()
          : await activateSection(payload).unwrap();
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
      contextText={`Are you sure you want to delete the section "${name}"?`}
      handleSave={handleSave}
      closeModal={closeModal}
      isSaving={isDeactivating || isActivating}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
