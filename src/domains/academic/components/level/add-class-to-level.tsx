import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useAddAcademicLevelToClassMutation } from '../../api';
import { AddClassToLevelForm, AddClassToLevelFormProps } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useGetClassesQuery } from '@/domains/class/api';
import { ClassData } from '@/domains/class/types';

type AddClassToLevelProps = {
  academicLevelId: number;
  academicLevelName: string;
  usedClassList: ClassData[];
};
export const AddClassToLevel: React.FC<AddClassToLevelProps> = ({
  academicLevelId,
  academicLevelName,
  usedClassList
}) => {
  const { data: classData } = useGetClassesQuery();
  const [addClass, { isLoading: isAdding }] = useAddAcademicLevelToClassMutation();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<AddClassToLevelFormProps>({
    defaultValues: { id: '' },
    resolver: zodResolver(AddClassToLevelForm)
  });

  const unusedClasses = React.useMemo(() => {
    return classData?.classes.filter(
      (item) => !usedClassList.some((uItem) => uItem.id === item.id)
    );
  }, [usedClassList, classData?.classes]);

  const onSave = async (data: AddClassToLevelFormProps) => {
    try {
      const payload = { id: data.id, academicLevelId };
      const result = await addClass(payload).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Grid2 size={{ xs: 10, xl: 4 }}>
        <Paper sx={{ p: 2 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.id)}>
            <InputLabel id='class-label' shrink>
              Class
            </InputLabel>
            <Controller
              name='id'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    label='Class'
                    labelId='class-label'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    notched
                  >
                    {unusedClasses?.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
          <LoadingButton
            size='small'
            loading={isAdding}
            variant='contained'
            onClick={handleSubmit(onSave)}
            sx={{ mt: 1 }}
          >
            Add Class to {academicLevelName}
          </LoadingButton>
        </Paper>
      </Grid2>
    </>
  );
};
