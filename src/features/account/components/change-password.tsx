import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { type PasswordProps, PasswordSchema } from '@/features/auth/types';
import { DialogModal } from '@/shared/components';
import { useChangeAccountPasswordMutation } from '../account-api';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export const ChangePassword = ({ closeModal }: { closeModal: () => void }) => {
  const [changePassword, { isLoading }] = useChangeAccountPasswordMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<PasswordProps>({
    defaultValues: initialState,
    resolver: zodResolver(PasswordSchema)
  });
  const onSave = async (data: PasswordProps) => {
    try {
      const result = await changePassword(data).unwrap();
      toast.info(result.message);
      reset(initialState);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      handleSave={handleSubmit(onSave)}
      isSaving={isLoading}
      titleText='Change Password'
      contextText={`Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).`}
      actionFooterSaveText='Change password'
      isModalClosedOnOutClick={false}
    >
      <FormControl fullWidth>
        <FormLabel>Current Password</FormLabel>
        <TextField
          size='small'
          type='password'
          {...register('currentPassword')}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword?.message}
        />
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel>New Password</FormLabel>
        <TextField
          size='small'
          type='password'
          {...register('newPassword')}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Re-type New Password</FormLabel>
        <TextField
          size='small'
          type='password'
          {...register('confirmNewPassword')}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
        />
      </FormControl>
    </DialogModal>
  );
};
