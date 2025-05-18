import { useEffect } from 'react';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type SchoolFormProps, SchoolFormSchema } from './types';
import { schoolFormState } from './school-form-init-state';
import { SchoolTabs, UpdateSettingBtn } from './components';
import { useGetMySchoolQuery } from './school-setting-api';
import { PageContentHeader } from '@/shared/components';

export const SchoolSetting = () => {
  const { data } = useGetMySchoolQuery();
  const methods = useForm<SchoolFormProps>({
    defaultValues: schoolFormState,
    resolver: zodResolver(SchoolFormSchema)
  });

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  return (
    <FormProvider {...methods}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PageContentHeader
          title='School Settings'
          subtitle="Configure and manage your school's settings and preferences."
        />
        <UpdateSettingBtn />
      </Box>
      <SchoolTabs />
    </FormProvider>
  );
};
