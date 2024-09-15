import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
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
import { useGetClassesQuery } from '@/domains/class/api';

type FilterStudentProps = {
  methods: UseFormReturn<StudentFilter>;
  searchStudent: () => void;
};

export const FilterStudent: React.FC<FilterStudentProps> = ({ methods, searchStudent }) => {
  const { data: classResult } = useGetClassesQuery();
  const [sections, setSections] = React.useState<string[]>([]);

  const { control, register } = methods;

  const handleClassChange = (selectedClass: number | string) => {
    const classes = classResult?.classes || [];
    const selectedSections = classes.find((cl) => cl.id === Number(selectedClass));
    if (selectedSections) {
      setSections(selectedSections.sections.length > 0 ? selectedSections.sections.split(',') : []);
    } else {
      setSections([]);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Filter Criteria
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3} xs={8}>
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
                  {classResult?.classes?.map((c) => (
                    <MenuItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item md={3} xs={8}>
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
                  {sections.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item md={3} xs={8}>
          <TextField
            {...register('name')}
            label='Name'
            fullWidth
            size='small'
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item md={3} xs={8}>
          <TextField
            {...register('roll')}
            label='Roll'
            fullWidth
            size='small'
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
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
