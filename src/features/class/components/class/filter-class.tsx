import { useGetAcademicLevelsQuery } from '@/features/levels-periods/levels-periods-api';
import { Loader, SubSoftText, TitleText } from '@/shared/components';

import {
  Box,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent
} from '@mui/material';
import React from 'react';

type FilterClassProps = {
  handleChange: (event: SelectChangeEvent) => void;
  levelId: string | number;
};
export const FilterClass: React.FC<FilterClassProps> = ({ levelId, handleChange }) => {
  const { data, isLoading } = useGetAcademicLevelsQuery();

  return (
    <Box component={Paper} p={3}>
      <TitleText text='Filter Classes' />
      <SubSoftText text='Filter classes by academic level' />

      <Grid2 container mt={3}>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size='small'>
            <FormLabel>Academic Level</FormLabel>
            <Select value={levelId.toString()} onChange={handleChange} displayEmpty>
              <MenuItem value=''>All Levels</MenuItem>
              {isLoading && <Loader />}
              {data?.academicLevels?.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
    </Box>
  );
};
