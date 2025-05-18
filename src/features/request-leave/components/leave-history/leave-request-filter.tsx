import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  MenuItem,
  Select
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { RestartAlt, Search } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import type { LeaveRequestFilterProps } from '../../types';
import { filterState } from './filter-state';
import { LEAVE_HISTORY_DATE_RANGES, LEAVE_STATUS_LIST } from '../../constant';
import { DATE_FORMAT } from '@/utils/helpers/date';
import { HeadingText } from '@/shared/components';
import { useGetMyLeavePoliciesQuery } from '@/features/leave-policies/leave-policy-api';

type LeaveRequestFilterType = {
  searchLeaves: () => void;
  methods: UseFormReturn<LeaveRequestFilterProps>;
};
export const LeaveRequestFilter: React.FC<LeaveRequestFilterType> = ({ methods, searchLeaves }) => {
  const { control, watch } = methods;
  const { data } = useGetMyLeavePoliciesQuery();
  const dtRange = watch('dateRangeId');

  const dateFields: Array<{ name: 'fromDate' | 'toDate'; label: string }> = [
    { name: 'fromDate', label: 'From Date' },
    { name: 'toDate', label: 'To Date' }
  ];

  const resetFilter = () => {
    methods.reset(filterState);
  };

  return (
    <Card>
      <CardContent>
        <HeadingText text='Filters' />
        <Box mt={3} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Status</FormLabel>
              <Controller
                control={control}
                name='statusId'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <>
                    <Select
                      displayEmpty
                      error={Boolean(error?.message)}
                      onChange={(event) => onChange(event.target.value)}
                      value={value}
                    >
                      <MenuItem value=''>Select Status</MenuItem>
                      {LEAVE_STATUS_LIST.map(({ code, name }) => (
                        <MenuItem value={code} key={code}>
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
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Leave Type</FormLabel>
              <Controller
                control={control}
                name='policyId'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <>
                    <Select
                      displayEmpty
                      onChange={(event) => onChange(event.target.value)}
                      value={value}
                    >
                      <MenuItem value=''>Select Policy</MenuItem>
                      {data?.leavePolicies?.map(({ id, name }) => (
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
          <Grid2 size={{ xs: 12, sm: 6, lg: 2 }}>
            <FormControl fullWidth size='small'>
              <FormLabel>Date Range</FormLabel>
              <Controller
                control={control}
                name='dateRangeId'
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <>
                    <Select
                      displayEmpty
                      onChange={(event) => onChange(event.target.value)}
                      value={value}
                    >
                      {LEAVE_HISTORY_DATE_RANGES.map(({ id, name }) => (
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
        <Grid2 container spacing={2} sx={{ mt: { xs: 2, md: 2 } }}>
          <Button
            variant='outlined'
            color='inherit'
            sx={{ ml: 'auto' }}
            size='small'
            onClick={resetFilter}
            startIcon={<RestartAlt />}
          >
            Reset Filters
          </Button>
          <Button
            size='small'
            color='primary'
            variant='contained'
            onClick={searchLeaves}
            startIcon={<Search />}
          >
            Search Leaves
          </Button>
        </Grid2>
      </CardContent>
    </Card>
  );
};
