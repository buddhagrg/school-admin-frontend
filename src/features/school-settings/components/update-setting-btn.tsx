import { Button } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { useFormContext } from 'react-hook-form';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import type { SchoolFormProps } from '../types';
import { useUpdateMySchoolMutation } from '../school-setting-api';

export const UpdateSettingBtn = () => {
  const {
    handleSubmit,
    formState: { isDirty }
  } = useFormContext<SchoolFormProps>();
  const text = isDirty ? `Save Changes` : `All Changes Saved`;
  const [updateSchool, { isLoading: isUpdating }] = useUpdateMySchoolMutation();

  const updateSetting = async (data: SchoolFormProps) => {
    try {
      const result = await updateSchool(data).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Button
      sx={{ ml: 'auto' }}
      loading={isUpdating}
      variant='contained'
      disabled={!isDirty}
      color={isDirty ? 'primary' : 'inherit'}
      onClick={handleSubmit(updateSetting)}
    >
      {text}
    </Button>
  );
};
