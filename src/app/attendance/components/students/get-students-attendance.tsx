import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { Group } from '@mui/icons-material';

import { ResponsiveBox } from '@/components/responsive-box';
import {
  GetStudentsAttendanceFilterProps,
  GetStudentsAttendanceFilterSchema,
  StaffAttendanceRecord
} from '../../types';
import { useGetStudentsAttendanceRecordQuery } from '../../attendance-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { GetStudentsAttendanceFilter } from './get-students-attendance-filter';
import { ListAttendance } from '../list-attendance';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { FilterText } from '@/components/filter-text';
import { attendanceData } from '../attendance-list-state';
import { PageContentHeader } from '@/components/page-content-header';
import { ListAttendanceStat } from '../list-attendance-stat';

const filterState: GetStudentsAttendanceFilterProps = {
  dateFrom: formatISO(new Date(), { representation: 'date' }),
  dateTo: null,
  name: '',
  academicYearId: '',
  classId: '',
  sectionId: '',
  dateType: 'S'
};
export const GetStudentsAttendance: React.FC<{ setting: React.ReactNode }> = ({ setting }) => {
  const [filter, setFilter] = useState<GetStudentsAttendanceFilterProps>(filterState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dateType, dateFrom, dateTo, ...restFilter } = filter;
  const { data, isLoading, isError, error } = useGetStudentsAttendanceRecordQuery(
    {
      ...restFilter,
      dateFrom: dateFrom ? getFormattedDate(dateFrom, API_DATE_FORMAT) : null,
      dateTo: dateTo ? getFormattedDate(dateTo, API_DATE_FORMAT) : null
    },
    {
      skip: !filter.academicYearId || !filter.classId
    }
  );
  const [users, setUsers] = useState<StaffAttendanceRecord>(attendanceData);
  const methods = useForm<GetStudentsAttendanceFilterProps>({
    defaultValues: filterState,
    resolver: zodResolver(GetStudentsAttendanceFilterSchema)
  });

  useEffect(() => {
    if (isError) {
      setUsers(attendanceData);
    } else if (data) {
      setUsers(data);
    } else {
      setUsers(attendanceData);
    }
  }, [data, isError]);

  const onClear = () => {
    methods.reset(filterState);
  };

  return (
    <>
      <Box component={Paper} sx={{ p: 1, mb: 5 }}>
        {setting}
        <Box sx={{ my: 2 }} />
        <FilterText />
        <GetStudentsAttendanceFilter
          methods={methods}
          onSearchBtn={methods.handleSubmit(setFilter)}
          onClearBtn={onClear}
        />
      </Box>
      <PageContentHeader title='View Attendances' icon={Group} />
      <ListAttendanceStat data={users} />
      <Box sx={{ my: 3 }} />
      <ResponsiveBox>
        <ListAttendance
          type='students'
          data={users}
          isLoading={isLoading}
          isError={isError}
          error={error ? getErrorMsg(error).message : ''}
        />
      </ResponsiveBox>
    </>
  );
};
