import { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { School } from '@mui/icons-material';
import { parseISO } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { StudentProps } from '../../types';
import { SectionDetail } from '@/app/class/types';
import { useGetClassesWithSectionsQuery } from '@/app/class/class-api';

export const AcademicInformationForm = () => {
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StudentProps>();
  const { data } = useGetClassesWithSectionsQuery();

  const handleClassChange = (classId: number | string) => {
    const classes = data?.classesWithSections || [];
    const selectedClass = classes.find((item) => item.id === Number(classId));
    setSections(selectedClass?.sections || []);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <School sx={{ mr: 1 }} />
        <Typography variant='body1'>Academic Information</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors.class)}>
          <InputLabel id='class' shrink>
            Class
          </InputLabel>
          <Controller
            name='class'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Class'
                  labelId='class'
                  notched
                  value={value}
                  onChange={(event) => {
                    const selectedClass = event.target.value;
                    onChange(selectedClass);
                    handleClassChange(selectedClass);
                  }}
                >
                  {data?.classesWithSections.map(({ id, name }) => (
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
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors.section)}>
          <InputLabel id='class' shrink>
            Section
          </InputLabel>
          <Controller
            name='section'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Section'
                  labelId='section'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {sections.map(({ id, name }) => (
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
        <Box>
          <TextField
            {...register('roll')}
            error={Boolean(errors.roll)}
            helperText={errors.roll?.message}
            label='Roll'
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        <Box>
          <Controller
            name='admissionDate'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Admission Date'
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </Box>
      </Stack>
    </>
  );
};
