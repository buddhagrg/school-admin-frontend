import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteClassTeacherMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeleteClassTeacherProps = {
  id: number;
  className: string;
  teacherName: string;
  closeModal: () => void;
};
export const DeleteClassTeacher: FC<DeleteClassTeacherProps> = ({
  id,
  className,
  teacherName,
  closeModal
}) => {
  const [deleteClassTeacher, { isLoading: isDeleting }] = useDeleteClassTeacherMutation();

  const handleSave = async () => {
    try {
      const result = await deleteClassTeacher(id).unwrap();
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
      contextText={`Are you sure you want to delete class teacher "${teacherName}" from class "${className}"?`}
      closeModal={closeModal}
      handleSave={handleSave}
      isSaving={isDeleting}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
    />
  );
};
