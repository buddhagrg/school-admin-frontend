import React from 'react';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useActivateFiscalYearMutation } from '../fiscal-years-api';

type ActivateFiscalYearProps = {
  id: number;
  closeModal: () => void;
};
export const ActivateFiscalYear: React.FC<ActivateFiscalYearProps> = ({ id, closeModal }) => {
  const [activateFiscalYear, { isLoading: isActivating }] = useActivateFiscalYearMutation();

  const handleSave = async () => {
    try {
      const result = await activateFiscalYear(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  return (
    <DialogModal
      isOpen={true}
      titleText='Activate Fiscal Year'
      contextText='Are you sure you want to activate this fiscal year?'
      closeModal={closeModal}
      handleSave={handleSave}
      isSaving={isActivating}
    />
  );
};
