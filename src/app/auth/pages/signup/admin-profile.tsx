import { FC } from 'react';
import { Paper } from '@mui/material';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { AdminStaffProps, BasicInfoSchemaWithoutRole } from '@/app/staff/types';
import { AddressForm, BasicInformationForm, ParentsInformationForm } from '@/app/staff/components';

type AdminProfileProps = {
  step2Method: UseFormReturn<AdminStaffProps>;
};

export const AdminProfile: FC<AdminProfileProps> = ({ step2Method }) => {
  const methods = step2Method;

  return (
    <Paper sx={{ p: 3 }}>
      <FormProvider {...methods}>
        <BasicInformationForm schema={BasicInfoSchemaWithoutRole} />
        <hr />
        <AddressForm />

        <hr />
        <ParentsInformationForm />
      </FormProvider>
    </Paper>
  );
};
