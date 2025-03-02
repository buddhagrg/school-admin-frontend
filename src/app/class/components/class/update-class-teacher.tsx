import { FC, useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { ClassTeacherForm } from './class-teacher-form';
import { ClassTeacherFormProps, ClassTeacherFormSchema } from '../../types';
import { useAssignClassTeacherMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type UpdateClassTeacherProps = {
  closeModal: () => void;
  classId: number;
  className: string;
};
export const UpdateClassTeacher: FC<UpdateClassTeacherProps> = ({
  closeModal,
  classId,
  className
}) => {
  const methods = useForm<ClassTeacherFormProps>({
    defaultValues: {
      classId: '',
      teacherId: ''
    },
    resolver: zodResolver(ClassTeacherFormSchema)
  });
  const [updateClassteacher, { isLoading: isUpdating }] = useAssignClassTeacherMutation();

  useEffect(() => {
    methods.setValue('classId', classId);
    methods.setValue('className', className);
  }, [classId, className, methods]);

  const handleSave = async (data: ClassTeacherFormProps) => {
    try {
      const result = await updateClassteacher(data).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      titleText='Update Class Teacher'
      isSaving={isUpdating}
      handleSave={methods.handleSubmit(handleSave)}
      closeModal={closeModal}
    >
      <ClassTeacherForm methods={methods} action='update' />
    </DialogModal>
  );
};
