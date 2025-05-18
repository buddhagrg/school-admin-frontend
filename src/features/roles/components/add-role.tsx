import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useAddNewRoleMutation } from '../roles-api';
import { type RoleFormProps, RoleFormSchema } from '../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { RoleForm } from './role-list/role-form';
import { DialogModal } from '@/shared/components';

type AddRoleProps = {
  closeModal: () => void;
};
export const AddRole: React.FC<AddRoleProps> = ({ closeModal }) => {
  const [addRole, { isLoading }] = useAddNewRoleMutation();
  const methods = useForm<RoleFormProps>({
    defaultValues: {
      name: '',
      status: true
    },
    resolver: zodResolver(RoleFormSchema)
  });

  const onSave = async (data: RoleFormProps) => {
    try {
      const result = await addRole(data).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      isSaving={isLoading}
      titleText='Add New Role'
      contextText='Create a new role. You can set permissions after creating the role.'
      handleSave={methods.handleSubmit(onSave)}
      closeModal={closeModal}
    >
      <RoleForm methods={methods} />
    </DialogModal>
  );
};
