import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Step, StepButton, Stepper } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import type { StaffFormProps } from '../../types';
import { StaffPersonalInfoForm } from '../forms/staff-personal-info-form';
import { StaffEmergencyContactForm } from '../forms/staff-emergency-contact-form';
import { StaffContactForm } from '../forms/staff-contact-form';
import { StaffProfessionalForm } from '../forms/staff-professional-info';
import { COLORS } from '@/theme/custom-colors';

type StaffStepperProps = {
  isLoading?: boolean;
  methods: UseFormReturn<StaffFormProps>;
};
const steps = [
  'Basic Information',
  'Contact Information',
  'Professional Information',
  'Emergency Contact'
];
export const StaffStepper: React.FC<StaffStepperProps> = ({ methods, isLoading = false }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  const stepperContent: Record<number, React.ReactNode> = {
    0: <StaffPersonalInfoForm />,
    1: <StaffContactForm />,
    2: <StaffProfessionalForm />,
    3: <StaffEmergencyContactForm />
  };

  return (
    <FormProvider {...methods}>
      {isLoading && <LinearProgress />}
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color='inherit' onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ border: `2px solid ${COLORS.border}`, borderRadius: '5px', p: 2, mt: 2 }}>
          {stepperContent[activeStep]}
        </Box>
      </Box>
    </FormProvider>
  );
};
