import { FC, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetClassesWithSectionsQuery } from '@/app/class/class-api';
import { SectionDetail } from '@/app/class/types';
import { StudentsAttendanceCurrentFilterProps } from '../types';

type StudentsAttendanceFilterType = {
  methods: UseFormReturn<StudentsAttendanceCurrentFilterProps>;
  searchUser: () => void;
  clearFilter: () => void;
};
export const StudentsAttendanceFilter: FC<StudentsAttendanceFilterType> = ({
  methods,
  searchUser,
  clearFilter
}) => {
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const { data: classSectionData } = useGetClassesWithSectionsQuery();
  const {
    control,
    register,
    setValue,
    formState: { errors }
  } = methods;

  const handleClassChange = (classId: number | string) => {
    const classes = classSectionData?.classesWithSections || [];
    const selectedClass = classes.find((item) => item.id === Number(classId));
    setValue('sectionId', '');
    setSections(selectedClass?.sections || []);
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Filter Criteria
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <TextField
            {...register('name')}
            label='Name'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small' error={Boolean(errors?.classId)}>
            <InputLabel id='student-class-select' shrink>
              Class
            </InputLabel>
            <Controller
              name='classId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='student-class-select'
                    label='Class'
                    value={value}
                    notched
                    onChange={(event) => {
                      const selectedClass = event.target.value;
                      onChange(selectedClass);
                      handleClassChange(selectedClass);
                    }}
                  >
                    {classSectionData?.classesWithSections?.map((item) => (
                      <MenuItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='student-section-select' shrink>
              Section
            </InputLabel>
            <Controller
              name='sectionId'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId='student-section-select'
                  label='Section'
                  notched
                  value={value}
                  onChange={onChange}
                  size='small'
                >
                  {sections.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 2, marginLeft: { xs: 'none', md: 'auto' } }}>
          <Button
            color='error'
            size='small'
            onClick={clearFilter}
            variant='contained'
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button color='primary' size='small' onClick={searchUser} variant='contained'>
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
