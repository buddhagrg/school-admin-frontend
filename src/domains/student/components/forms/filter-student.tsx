import { FC, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { StudentFilter } from '../../types';
import { useGetClassSectionStructureQuery } from '@/domains/class/api';
import { SectionDetail } from '@/domains/class/types';

type FilterStudentProps = {
  methods: UseFormReturn<StudentFilter>;
  searchStudent: () => void;
};
export const FilterStudent: FC<FilterStudentProps> = ({ methods, searchStudent }) => {
  const { data } = useGetClassSectionStructureQuery();
  const [sections, setSections] = useState<SectionDetail[]>([]);
  const { control, register, setValue } = methods;

  const handleClassChange = (classId: number | string) => {
    const classes = data?.classSectionStructure || [];
    const selectedClass = classes.find((item) => item.id === Number(classId));
    setValue('section', '');
    setSections(selectedClass?.sections || []);
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Filter Criteria
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='student-class-select'>Class</InputLabel>
            <Controller
              name='class'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId='student-class-select'
                  label='Class'
                  value={value}
                  onChange={(event) => {
                    const selectedClass = event.target.value;
                    onChange(selectedClass);
                    handleClassChange(selectedClass);
                  }}
                >
                  {data?.classSectionStructure?.map((item) => (
                    <MenuItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='student-section-select'>Section</InputLabel>
            <Controller
              name='section'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  labelId='student-section-select'
                  label='Section'
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
        <Grid2 size={{ xs: 8, md: 3 }}>
          <TextField
            {...register('roll')}
            label='Roll'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginLeft: 'auto', mt: 2 }}>
          <Button
            color='primary'
            size='small'
            startIcon={<Search />}
            onClick={searchStudent}
            variant='contained'
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
