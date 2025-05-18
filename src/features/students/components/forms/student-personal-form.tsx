import { useEffect, useMemo, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import { BLOOD_GROUPS, GENDERS, STATUS_LIST } from '@/utils/constants';
import { DATE_FORMAT } from '@/utils/helpers/date';
import type { SectionDetail } from '@/features/class/types';
import type { StudentFormProps } from '../../types';
import { useGetClassesWithSectionsQuery } from '@/features/class/class-api';

export const StudentPersonalForm = () => {
  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext<StudentFormProps>();
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const { data, isError } = useGetClassesWithSectionsQuery();
  const classData = useMemo(() => {
    return isError ? [] : data?.classesWithSections || [];
  }, [data, isError]);
  const classId = watch('classId');

  const handleClassChange = (classId: number | string) => {
    const selectedClass = classData.find((item) => item.id === Number(classId));
    setSections(selectedClass?.sections || []);
  };

  useEffect(() => {
    if (classId && classData) {
      const selectedClass = classData.find((item) => item.id === Number(classId));
      setSections(selectedClass?.sections || []);
    }
  }, [classData, classId]);

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Full Name</FormLabel>
            <TextField
              size='small'
              {...register('name')}
              placeholder={`Student's full name`}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>System Access</FormLabel>
            <Controller
              name='hasSystemAccess'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    row
                    value={value}
                    onChange={(e) => onChange(e.target.value === 'true')}
                  >
                    {STATUS_LIST.map(({ id, label }) => (
                      <FormControlLabel
                        label={label}
                        value={id}
                        key={label}
                        control={<Radio size='small' />}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Date of Birth</FormLabel>
            <Controller
              name='dob'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      size: 'small',
                      placeholder: 'Select date'
                    }
                  }}
                  format={DATE_FORMAT}
                  value={typeof value === 'string' ? parseISO(value) : value}
                  onChange={(newDt) => onChange(newDt)}
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Gender</FormLabel>
            <Controller
              name='gender'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <RadioGroup row value={value} onChange={(e) => onChange(e.target.value)}>
                    {GENDERS.map(({ id, name }) => (
                      <FormControlLabel
                        label={name}
                        key={id}
                        value={id}
                        control={<Radio size='small' />}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Class</FormLabel>
            <Controller
              name='classId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    value={value}
                    displayEmpty
                    onChange={(event) => {
                      const selectedClass = event.target.value;
                      onChange(selectedClass);
                      handleClassChange(selectedClass);
                    }}
                  >
                    <MenuItem value='' disabled>
                      Select Class
                    </MenuItem>
                    {classData?.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Section</FormLabel>
            <Controller
              name='sectionId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value='' disabled>
                      Select Section
                    </MenuItem>
                    {sections.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Roll Number</FormLabel>
            <TextField
              size='small'
              type='number'
              {...register('roll', { valueAsNumber: true })}
              placeholder={`Student's roll number`}
              error={!!errors?.roll}
              helperText={errors?.roll?.message}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Admission Date</FormLabel>
            <Controller
              name='admissionDate'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      size: 'small',
                      placeholder: 'Select date'
                    }
                  }}
                  format={DATE_FORMAT}
                  value={typeof value === 'string' ? parseISO(value) : value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Blood Group</FormLabel>
            <Controller
              name='bloodGroup'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value='' disabled>
                      Select Blood Group
                    </MenuItem>
                    {BLOOD_GROUPS.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
      </Grid2>
    </>
  );
};
