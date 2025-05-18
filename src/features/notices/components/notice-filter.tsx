import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { RestartAlt, Search } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';

import type { NoticeFilterProps } from '../types';
import { useGetRolesQuery } from '@/features/roles/roles-api';
import { DATE_RANGES, NOTICE_STATUS_LIST } from '../constant';
import { DATE_FORMAT } from '@/utils/helpers/date';

type NoticeFilterType = {
  applyFilter: () => void;
  resetFilter: () => void;
  methods: UseFormReturn<NoticeFilterProps>;
};
export const NoticeFilter: React.FC<NoticeFilterType> = ({ applyFilter, methods, resetFilter }) => {
  const { control, watch } = methods;
  const { data } = useGetRolesQuery();

  const dateFields: Array<{ name: 'fromDate' | 'toDate'; label: string }> = [
    { name: 'fromDate', label: 'From Date' },
    { name: 'toDate', label: 'To Date' }
  ];
  const dtRange = watch('dateRangeId');

  return (
    <Card>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Status</FormLabel>
              <Controller
                name='statusId'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value=''>Select Status</MenuItem>
                    {NOTICE_STATUS_LIST.map(({ code, name }) => (
                      <MenuItem value={code} key={code}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 2 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Role</FormLabel>
              <Controller
                name='roleId'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value=''>Select Role</MenuItem>
                    {data?.roles?.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Date Range</FormLabel>
              <Controller
                name='dateRangeId'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    {DATE_RANGES.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid2>
          {dtRange === 'CUSTOM' &&
            dateFields.map(({ name, label }) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 2 }} key={name}>
                <FormControl fullWidth size='small' key={name}>
                  <FormLabel>{label}</FormLabel>
                  <Controller
                    name={name}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: 'small',
                            error: Boolean(error),
                            helperText: error?.message,
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
            ))}
        </Grid2>
        <Stack direction='row' spacing={2} mt={2}>
          <Box flexGrow={1} />
          <Button
            size='small'
            variant='contained'
            color='inherit'
            startIcon={<RestartAlt />}
            onClick={resetFilter}
          >
            Reset
          </Button>
          <Button size='small' variant='contained' startIcon={<Search />} onClick={applyFilter}>
            Search
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
