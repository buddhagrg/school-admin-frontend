import React from 'react';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useActivateAcademicYearMutation } from '../academic-years-api';

type ActivateAcademicYearProps = {
  closeModal: () => void;
  id: number;
};
export const ActivateAcademicYear: React.FC<ActivateAcademicYearProps> = ({ id, closeModal }) => {
  const [activateAcademicYear, { isLoading: isActivating }] = useActivateAcademicYearMutation();

  const handleSave = async () => {
    try {
      const result = await activateAcademicYear(id).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Activate Academic Year'
      contextText='Are you sure you want to activate this academic year?'
      closeModal={closeModal}
      isSaving={isActivating}
      handleSave={handleSave}
    />
  );
};
