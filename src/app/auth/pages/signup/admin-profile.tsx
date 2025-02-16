import { FC } from 'react';
import { Paper } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Address, BasicInformation, ParentsInformation } from '@/domains/staff/components/forms';
import { AdminStaffProps, BasicInfoSchemaWithoutRole } from '@/domains/staff/types';

type AdminProfileProps = {
  step2Method: UseFormReturn<AdminStaffProps>;
};

export const AdminProfile: FC<AdminProfileProps> = ({ step2Method }) => {
  const methods = step2Method;

  return (
    <Paper sx={{ p: 3 }}>
      <FormProvider {...methods}>
        <BasicInformation schema={BasicInfoSchemaWithoutRole} />
        <hr />
        <Address />

        <hr />
        <ParentsInformation />
      </FormProvider>
    </Paper>
  );
};
