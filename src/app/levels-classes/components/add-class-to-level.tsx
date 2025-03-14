import { FC, useMemo } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetClassesQuery } from '@/app/class/class-api';
import { ClassData } from '@/app/class/types';
import { useAddClassToAcademicLevelMutation } from '../levels-classes-api';
import { AddClassToLevelFormProps, AddClassToLevelFormSchema } from '../types';

type AddClassToLevelProps = {
  academicLevelId: number;
  academicLevelName: string;
  usedClassList: ClassData[];
};
export const AddClassToLevel: FC<AddClassToLevelProps> = ({
  academicLevelId,
  academicLevelName,
  usedClassList
}) => {
  const { data: classData } = useGetClassesQuery();
  const [addClass, { isLoading: isAdding }] = useAddClassToAcademicLevelMutation();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<AddClassToLevelFormProps>({
    defaultValues: { id: '' },
    resolver: zodResolver(AddClassToLevelFormSchema)
  });

  const unusedClasses = useMemo(() => {
    return classData?.classes.filter(
      (item) => !usedClassList.some((uItem) => uItem.id === item.id)
    );
  }, [usedClassList, classData?.classes]);

  const onSave = async (data: AddClassToLevelFormProps) => {
    try {
      const payload = { classId: data.id, academicLevelId };
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
          <Button
            size='small'
            loading={isAdding}
            loadingPosition='start'
            variant='contained'
            onClick={handleSubmit(onSave)}
            sx={{ mt: 1 }}
          >
            Add Class to {academicLevelName}
          </Button>
        </Paper>
      </Grid2>
    </>
  );
};
