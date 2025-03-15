import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetAcademicYearsQuery } from '@/app/academic-years/academic-years-api';
import { useGetClassesWithSectionsQuery } from '@/app/class/class-api';
import { SectionDetail } from '@/app/class/types';
import { GetStudentsAttendanceFilterProps } from '../../types';
import { AttendanceDateSetting } from '../attendance-date-setting';

type GetStudentsAttendanceFilterType = {
  methods: UseFormReturn<GetStudentsAttendanceFilterProps>;
  onSearchBtn: () => void;
  onClearBtn: () => void;
};
export const GetStudentsAttendanceFilter: React.FC<GetStudentsAttendanceFilterType> = ({
  methods,
  onSearchBtn,
  onClearBtn
}) => {
  const { data: academicYearsData } = useGetAcademicYearsQuery();
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
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.academicYearId)}>
            <InputLabel id='academic-year' shrink>
              Academic Year
            </InputLabel>
            <Controller
              name='academicYearId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='academic-year'
                    label=' Academic Year'
                    value={value}
                    notched
                    onChange={onChange}
                  >
                    <MenuItem value=''>
                      <i>Select None</i>
                    </MenuItem>
                    {academicYearsData?.academicYears.map((item) => (
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
        <Grid2 size={{ xs: 6, md: 3 }}>
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
        <Grid2 size={{ xs: 6, md: 3 }}>
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
        <Grid2 size={{ xs: 8, md: 3 }}>
          <TextField
            {...register('name')}
            label='Name'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
      </Grid2>

      <AttendanceDateSetting methods={methods} />

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 2, marginLeft: { xs: 'none', md: 'auto' } }}>
          <Button
            color='error'
            size='small'
            onClick={onClearBtn}
            variant='contained'
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button color='primary' size='small' onClick={onSearchBtn} variant='contained'>
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
};
