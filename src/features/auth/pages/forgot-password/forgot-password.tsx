import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, TextField, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/auth-layout';
import {
  type ApiResponseAlertType,
  type ForgotPwdFormProps,
  ForgotPwdFormSchema
} from '../../types';
import { useRequestPwdResetMutation } from '../../auth-api';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { ApiResponseAlert } from '@/shared/components';

const initialApiResponse: ApiResponseAlertType = {
  severity: 'success',
  messages: []
};
export const ForgotPassword = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponseAlertType>(initialApiResponse);

  const [requestPwdReset, { isLoading }] = useRequestPwdResetMutation();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ForgotPwdFormProps>({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotPwdFormSchema)
  });

  const onSave = async (data: ForgotPwdFormProps) => {
    let response: ApiResponseAlertType = initialApiResponse;
    try {
      const result = await requestPwdReset({ email: data.email }).unwrap();
      response = { severity: 'success', messages: [result.message] };
    } catch (error) {
      const messages = formatApiError(error as FetchBaseQueryError | SerializedError);
      response = { severity: 'error', messages };
    } finally {
      setApiResponse(response);
    }
  };

  return (
    <AuthLayout>
      <Typography variant='h6' gutterBottom>
        Forgot Your Password?
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

        {apiResponse.messages.length > 0 && (
          <ApiResponseAlert
            open={true}
            messages={apiResponse.messages}
            severity={apiResponse.severity}
            shouldShowCloseIcon={false}
          />
        )}

        <Box mt={2} />
        <Button size='small' type='submit' loading={isLoading} variant='contained'>
          Send Reset Link
        </Button>
      </form>
    </AuthLayout>
  );
};
