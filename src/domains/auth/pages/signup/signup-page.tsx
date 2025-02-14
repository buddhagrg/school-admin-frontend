import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { SchoolProfile } from './school-profile';
import { AdminProfile } from './admin-profile';
import { SchoolProfileProps, SchoolProfileSchema } from '../../types';
import { AdminStaffProps, AdminStaffSchema } from '@/domains/staff/types';
import { staffInitialStateForAdminProfile } from '@/domains/staff/components/forms';
import { useSetupAdminProfileMutation, useSetupSchoolProfileMutation } from '../../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { HomeBar } from '@/components/home-bar';

const steps = ['School Profile', 'Admin Profile'];
const schoolProfile = {
  id: '',
  name: '',
  email: '',
  phone: ''
};

export const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [saveSchoolProfile, { isLoading: savingSchoolProfile }] = useSetupSchoolProfileMutation();
  const [saveAdminProfile, { isLoading: savingAdminProfile }] = useSetupAdminProfileMutation();

  const step1Method = useForm<SchoolProfileProps>({
    mode: 'onChange',
    resolver: zodResolver(SchoolProfileSchema),
    defaultValues: schoolProfile
  });

  const step2Method = useForm<AdminStaffProps>({
    mode: 'onChange',
    resolver: zodResolver(AdminStaffSchema),
    defaultValues: staffInitialStateForAdminProfile
  });

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        await setupSchoolProfile();
        break;
      case 1:
        await setupAdminProfile();
        break;
      default:
        return null;
    }
  };
  const setupSchoolProfile = async () => {
    const isValid = await step1Method.trigger();
    if (isValid) {
      const { id, name, email, phone } = step1Method.getValues();
      if (id) {
        setActiveStep((activeStep) => activeStep + 1);
      } else {
        try {
          const payload = { id, name, email, phone };
          const result = await saveSchoolProfile(payload).unwrap();
          toast.info(result.message);
          step1Method.setValue('id', result.schoolId.toString());
          setActiveStep((activeStep) => activeStep + 1);
        } catch (error) {
          toast.info(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
        }
      }
    }
  };
  const setupAdminProfile = async () => {
    const isValid = await step2Method.trigger();
    if (isValid) {
      const payload = step2Method.getValues();
      try {
        const result = await saveAdminProfile({
          ...payload,
          schoolId: parseInt(step1Method.getValues().id)
        }).unwrap();
        toast.info(result.message);
        setActiveStep((activeStep) => activeStep + 1);
      } catch (error) {
        toast.info(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
      }
    }
  };
  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };

  const stepperContent = (step: number) => {
    switch (step) {
      case 0:
        return <SchoolProfile step1Method={step1Method} />;
      case 1:
        return <AdminProfile step2Method={step2Method} />;
      default:
        return null;
    }
  };

  return (
    <>
      <HomeBar
        actions={
          <Button
            component={Link}
            to='/auth/login'
            sx={{
              textTransform: 'none',
              fontSize: 16,
              color: 'inherit',
              border: '1px solid lightgray'
            }}
          >
            Sign In
          </Button>
        }
      />
      <Container sx={{ p: 2 }}>
        <Alert severity='info' sx={{ my: 2 }}>
          You're almost there! Just complete these two quick steps to join us.
        </Alert>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box sx={{ my: 2 }}>{stepperContent(activeStep)}</Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    onClick={handleNext}
                    variant='contained'
                    sx={{ mr: 2 }}
                    disabled={savingSchoolProfile || savingAdminProfile}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper sx={{ p: 3 }}>
            <Typography gutterBottom>
              Profile setup completed. You can <i>close</i> this window now.
            </Typography>
            <Typography>
              Please expect a <strong>verification email</strong> shortly.
            </Typography>
          </Paper>
        )}
      </Container>
    </>
  );
};
