import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';

import { ResponsiveBox } from '@/components/responsive-box';
import {
  RecordDetail,
  GetStaffAttendanceFilterProps,
  GetStaffAttendanceFilterSchema
} from '../../types';
import { useGetStaffAttendanceRecordQuery } from '../../attendance-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { GetStaffAttendanceFilter } from './get-staff-attendance-filter';
import { ListAttendance } from '../list-attendance';
import { FilterText } from '@/components/filter-text';

const filterState: GetStaffAttendanceFilterProps = {
  dateFrom: formatISO(new Date(), { representation: 'date' }),
  dateTo: null,
  name: '',
  academicYearId: '',
  roleId: '',
  dateType: 'S'
};
export const GetStaffAttendance: React.FC<{ setting: React.ReactNode }> = ({ setting }) => {
  const [filter, setFilter] = useState<GetStaffAttendanceFilterProps>(filterState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dateType, dateFrom, dateTo, ...restFilter } = filter;
  const { data, isLoading, isError, error } = useGetStaffAttendanceRecordQuery(
    {
      ...restFilter,
      dateFrom: dateFrom ? getFormattedDate(dateFrom, API_DATE_FORMAT) : null,
      dateTo: dateTo ? getFormattedDate(dateTo, API_DATE_FORMAT) : null
    },
    {
      skip: !filter.academicYearId
    }
  );
  const [users, setUsers] = useState<RecordDetail[]>([]);
  const methods = useForm<GetStaffAttendanceFilterProps>({
    defaultValues: filterState,
    resolver: zodResolver(GetStaffAttendanceFilterSchema)
  });

  useEffect(() => {
    if (isError) {
      setUsers([]);
    } else if (data?.staff) {
      setUsers(data.staff);
    } else {
      setUsers([]);
    }
  }, [data?.staff, isError]);

  const onClear = () => {
    methods.reset(filterState);
  };

  return (
    <>
      <Box component={Paper} sx={{ p: 1, mb: 5 }}>
        {setting}
        <Box sx={{ my: 2 }} />
        <FilterText />
        <GetStaffAttendanceFilter
          methods={methods}
          onSearchBtn={methods.handleSubmit(setFilter)}
          onClearBtn={onClear}
        />
      </Box>
      <ResponsiveBox>
        <ListAttendance
          type='staff'
          data={users}
          isLoading={isLoading}
          isError={isError}
          error={error ? getErrorMsg(error).message : ''}
        />
      </ResponsiveBox>
    </>
  );
};
