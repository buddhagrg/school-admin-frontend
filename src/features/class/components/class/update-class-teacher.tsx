import React, { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { ClassTeacherForm } from './class-teacher-form';
import { type ClassTeacherFormProps, ClassTeacherFormSchema } from '../../types';
import { useUpdateClassTeacherMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/shared/components';

type UpdateClassTeacherProps = {
  closeModal: () => void;
  classId: number | string;
  teacherId: number | string;
  id: number;
};
export const UpdateClassTeacher: React.FC<UpdateClassTeacherProps> = ({
  closeModal,
  classId,
  teacherId,
  id
}) => {
  const methods = useForm<ClassTeacherFormProps>({
    defaultValues: {
      classId: '',
      teacherId: ''
    },
    resolver: zodResolver(ClassTeacherFormSchema)
  });
  const [updateClassteacher, { isLoading: isUpdating }] = useUpdateClassTeacherMutation();

  useEffect(() => {
    methods.setValue('classId', classId);
    methods.setValue('teacherId', teacherId);
  }, [classId, teacherId, methods]);

  const handleSave = async (data: ClassTeacherFormProps) => {
    try {
      const result = await updateClassteacher({ id, teacherId: data.teacherId }).unwrap();
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
      contextText='Update the class teacher assignment'
      isSaving={isUpdating}
      handleSave={methods.handleSubmit(handleSave)}
      closeModal={closeModal}
      actionFooterSaveText='Update'
    >
      <ClassTeacherForm methods={methods} action='update' />
    </DialogModal>
  );
};
