import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PasswordActionForm } from '../../components/password-action-form';
import {
  ApiResponseAlertType,
  PasswordActionFormProps,
  PasswordActionFormSchema
} from '../../types';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { initialApiResponse } from '@/shared/constants/initial-state';
import { useResetPwdMutation } from '../../auth-api';
import { SubSoftText, TitleText } from '@/shared/components';
import { AuthLayout } from '../../components/auth-layout';
import { Box } from '@mui/material';

const initialState: PasswordActionFormProps = { password: '', confirmPassword: '' };
const REDIRECT_DELAY_MS = 2000;
export const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPwdMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [apiResponse, setApiResponse] = useState<ApiResponseAlertType>(initialApiResponse);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PasswordActionFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(PasswordActionFormSchema)
  });

  const onSubmit = async (data: PasswordActionFormProps) => {
    const token = searchParams.get('token');
    if (!token) return;

    try {
      const result = await resetPassword({ ...data, token }).unwrap();
      setApiResponse({ severity: 'success', messages: [result.message] });
      setSuccess(true);

      setTimeout(() => navigate('/login'), REDIRECT_DELAY_MS);
    } catch (err) {
      setApiResponse({
        severity: 'error',
        messages: formatApiError(err as FetchBaseQueryError | SerializedError)
      });
      setSuccess(false);
    }
  };

  const header = `Reset Your Password`;
  const subHeader = `Please enter a new password to regain access to your account. Make sure it's something secure and easy to remember.`;
  return (
    <AuthLayout>
      <TitleText text={header} />
      <SubSoftText text={subHeader} />
      <Box sx={{ mt: 3 }} />
      <PasswordActionForm
        register={register}
        errors={errors}
        loading={isLoading}
        success={success}
        apiResponse={apiResponse}
        onSubmit={handleSubmit(onSubmit)}
        onClear={() => reset(initialState)}
        submitText='Reset Password'
      />
    </AuthLayout>
  );
};
