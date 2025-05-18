import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { ClassTeacherForm } from './class-teacher-form';
import { type ClassTeacherFormProps, ClassTeacherFormSchema } from '../../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useAssignClassTeacherMutation } from '../../class-api';
import { DialogModal } from '@/shared/components';

const initialState = {
  classId: '',
  teacherId: ''
};
type AddClassTeacherProps = {
  closeModal: () => void;
};
export const AddClassTeacher: React.FC<AddClassTeacherProps> = ({ closeModal }) => {
  const methods = useForm<ClassTeacherFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassTeacherFormSchema)
  });
  const [assignClassTeacher, { isLoading: isAssigning }] = useAssignClassTeacherMutation();

  useEffect(() => {
    methods.reset(initialState);
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const onSave = async (data: ClassTeacherFormProps) => {
    try {
      const payload = { classId: data.classId, teacherId: data.teacherId };
      const result = await assignClassTeacher(payload).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      handleSave={methods.handleSubmit(onSave)}
      isSaving={isAssigning}
      titleText='Assign Class Teacher'
      contextText='Assign a teacher to a specific class'
    >
      <ClassTeacherForm methods={methods} action='add' />
    </DialogModal>
  );
};
