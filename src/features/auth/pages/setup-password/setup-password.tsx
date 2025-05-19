import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Paper } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useSetupPasswordMutation } from '../../auth-api';
import { type SetupPasswordProps, SetupPasswordSchema } from '../../types';
import { SetupPasswordForm } from './setup-password-form';
import { SubSoftText, TitleText } from '@/shared/components';

const initialState: SetupPasswordProps = {
  password: '',
  confirmPassword: ''
};

export const SetupPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [setupNewPassword, { isLoading: isSettingPassword }] = useSetupPasswordMutation();
  const methods = useForm<SetupPasswordProps>({
    defaultValues: initialState,
    resolver: zodResolver(SetupPasswordSchema)
  });

  const setupPassword = async (data: SetupPasswordProps) => {
    try {
      if (!token) return;

      const payload = { ...data, token };
      const result = await setupNewPassword(payload).unwrap();
      toast.info(result.message);
      navigate('/login');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const clearForm = () => {
    methods.reset();
  };

  return (
    <Box
      component={Paper}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 40px)'
      }}
    >
      <Box
        sx={{
          width: { xs: '400px', md: '500px' },
          border: '1px solid #f3f6f999',
          padding: '20px'
        }}
      >
        <TitleText text='Set Up Your Account Password' />
        <SubSoftText
          text={`You're almost done! Please set your password to complete the setup and access the main application.`}
        />
        <Box mt={3} />
        <SetupPasswordForm
          onSubmit={methods.handleSubmit(setupPassword)}
          methods={methods}
          isLoading={isSettingPassword}
          clearForm={clearForm}
        />
      </Box>
    </Box>
  );
};
