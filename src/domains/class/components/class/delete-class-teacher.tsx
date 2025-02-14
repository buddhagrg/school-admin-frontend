import { FC } from 'react';
import { DialogModal } from '@/components/dialog-modal';
import { useDeleteClassTeacherMutation } from '../../api';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

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
