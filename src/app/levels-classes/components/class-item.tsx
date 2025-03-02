import { FC, useState } from 'react';
import { Chip } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';

import { useDeleteLevelFromClassMutation } from '../levels-classes-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/components/dialog-modal';

type ClassItemProps = {
  classId: number;
  className: string;
};
export const ClassItem: FC<ClassItemProps> = ({ classId, className }) => {
  const [deleteClass, { isLoading: isDeleting }] = useDeleteLevelFromClassMutation();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setModalOpen((isModalOpen) => !isModalOpen);
  };
  const handleSave = async () => {
    try {
      const result = await deleteClass(classId).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Chip label={className} variant='outlined' onDelete={toggleDeleteModal} sx={{ mr: 1 }} />
      {isModalOpen && (
        <DialogModal
          isOpen={true}
          titleText='Confirm Deletion'
          contextText={`Are you sure you want to delete the class "${className}"?`}
          closeModal={toggleDeleteModal}
          handleSave={handleSave}
          isSaving={isDeleting}
          actionFooterCancelText='No'
          actionFooterSaveText='Yes'
        />
      )}
    </>
  );
};
