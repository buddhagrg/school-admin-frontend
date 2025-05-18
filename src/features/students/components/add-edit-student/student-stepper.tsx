import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Step, StepButton, Stepper } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import type { StudentFormProps } from '../../types';
import { StudentContactForm } from '../forms/student-contact-form';
import { StudentParentForm } from '../forms/student-parent-form';
import { StudentPersonalForm } from '../forms/student-personal-form';
import { COLORS } from '@/theme/custom-colors';

type StudenStepperProps = {
  isLoading?: boolean;
  methods: UseFormReturn<StudentFormProps>;
};
const steps = ['Basic Information', 'Contact Details', 'Parents/Guardian'];
export const StudenStepper: React.FC<StudenStepperProps> = ({ methods, isLoading = false }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
  }, []);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  const stepperContent: Record<number, React.ReactNode> = {
    0: <StudentPersonalForm />,
    1: <StudentContactForm />,
    2: <StudentParentForm />
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
