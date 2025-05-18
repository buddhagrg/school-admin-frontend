import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUpdateRoleMutation } from '../../roles-api';
import { type RoleFormProps, RoleFormSchema, type RoleWithUsersAssociated } from '../../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { RoleForm } from './role-form';
import { DialogModal } from '@/shared/components';

type UpdateRoleProps = {
  closeModal: () => void;
  role: RoleWithUsersAssociated;
};
const initialState: RoleFormProps = {
  name: '',
  status: true
};
export const UpdateRole: React.FC<UpdateRoleProps> = ({ closeModal, role }) => {
  const [updateRole, { isLoading }] = useUpdateRoleMutation();
  const methods = useForm({
    defaultValues: initialState,
    resolver: zodResolver(RoleFormSchema)
  });

  useEffect(() => {
    if (role) {
      methods.setValue('name', role.name);
      methods.setValue('status', role.status);
    }
  }, [role, methods]);

  const onSave = async (data: RoleFormProps) => {
    try {
      const result = await updateRole({ ...data, id: role.id }).unwrap();
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
      closeModal={closeModal}
      handleSave={methods.handleSubmit(onSave)}
      actionFooterSaveText='Update'
      titleText='Update Role'
      contextText={`Update the role's name and status.`}
    >
      <RoleForm methods={methods} />
    </DialogModal>
  );
};
