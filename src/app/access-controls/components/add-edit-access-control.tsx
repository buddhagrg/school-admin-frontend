import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { AccessControlFormProps } from '../pages/access-control-page';
import { AddEditAccessControlProps, AddEditAccessControlSchema } from '../types';
import { useAddAccessControlMutation, useUpdateAccessControlMutation } from '../api';

type AddEditACProps = {
  closeModal: () => void;
  formData: AccessControlFormProps;
};
const initialState = {
  name: '',
  type: '',
  method: '',
  path: '',
  directAllowedRoleId: ''
};
const fields: Array<keyof AddEditAccessControlProps> = [
  'name',
  'type',
  'path',
  'method',
  'directAllowedRoleId'
];

export const AddEditAccessControl: FC<AddEditACProps> = ({ formData, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddEditAccessControlProps>({
    resolver: zodResolver(AddEditAccessControlSchema),
    defaultValues: initialState
  });
  const [addPermission, { isLoading: isAdding }] = useAddAccessControlMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdateAccessControlMutation();
  const { action, id, ...state } = formData;

  useEffect(() => {
    reset(state);
  }, [reset]);

  const onSave = async (data: AddEditAccessControlProps) => {
    try {
      const payload = { ...data, id };
      const result =
        action === 'add'
          ? await addPermission(payload).unwrap()
          : await updatePermission(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      titleText={action === 'add' ? `Add New Access Control` : `Update Access Control`}
      isOpen={true}
      isSaving={isAdding || isUpdating}
      handleSave={handleSubmit(onSave)}
      closeModal={closeModal}
    >
      {fields.map((field) => (
        <div key={field}>
          <TextField
            size='small'
            type='text'
            label={
              field === 'directAllowedRoleId'
                ? 'Direct Allowed Role Id'
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            sx={{ margin: '10px 0' }}
            fullWidth
            {...register(field)}
            error={!!errors?.[field]}
            helperText={errors?.[field]?.message?.toString()}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </div>
      ))}
    </DialogModal>
  );
};
