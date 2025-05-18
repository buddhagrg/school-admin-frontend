import { Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { AuthLayout } from '../../components/auth-layout';
import { useForm } from 'react-hook-form';
import { type ResetPwdFormProps, ResetPwdFormSchema } from '../../types';
import { useResetMyPwdMutation } from '../../auth-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPwd, { isLoading: resettingPwd }] = useResetMyPwdMutation();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ResetPwdFormProps>({
    defaultValues: { email: '' },
    resolver: zodResolver(ResetPwdFormSchema)
  });

  const onSave = async (data: ResetPwdFormProps) => {
    try {
      const result = await resetPwd({ email: data.email }).unwrap();
      toast.info(result.message);
      navigate('/');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <AuthLayout>
      <Typography variant='h6' gutterBottom>
        Reset Your Password
      </Typography>
      <Typography variant='subtitle1' color='text.secondary'>
        Enter your email address and we will send you a password reset link.
      </Typography>
      <Box sx={{ mt: 3 }} />
      <form onSubmit={handleSubmit(onSave)}>
        <FormControl variant='outlined' fullWidth>
          <FormLabel>Email</FormLabel>
          <TextField
            size='small'
            placeholder='Your email'
            {...register('email')}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </FormControl>
        <Box mt={2} />
        <Button size='small' type='submit' loading={resettingPwd} variant='contained'>
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
};
