import React, { useCallback, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';

import { useGetStudentsForAttendanceQuery } from '../../attendance-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ResponsiveBox } from '@/components/responsive-box';
import {
  TakeStudentsAttendanceFilterSchema,
  TakeStudentsAttendanceFilterProps,
  UserAttendanceCommonDetail
} from '../../types';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { TakeStudentsAttendanceFilter } from './take-students-attendance-filter';
import { ListUsersForAttendance } from '../list-users-for-attendance';
import { FilterText } from '@/components/filter-text';

const formState: TakeStudentsAttendanceFilterProps = {
  attendanceDate: formatISO(new Date(), { representation: 'date' }),
  name: '',
  classId: '',
  sectionId: ''
};
export const TakeStudentsAttendance: React.FC<{ setting: React.ReactNode }> = ({ setting }) => {
  const [filter, setFilter] = useState(formState);
  const { data, isLoading, isError, error } = useGetStudentsForAttendanceQuery(
    {
      ...filter,
      attendanceDate: filter.attendanceDate
        ? getFormattedDate(filter.attendanceDate, API_DATE_FORMAT)
        : ''
    },
    {
      skip: !filter.classId
    }
  );
  const methods = useForm<TakeStudentsAttendanceFilterProps>({
    defaultValues: formState,
    resolver: zodResolver(TakeStudentsAttendanceFilterSchema)
  });
  const [users, setUsers] = useState<UserAttendanceCommonDetail[]>([]);

  useEffect(() => {
    if (isError) {
      setUsers([]);
    } else if (data?.students) {
      setUsers(data.students);
    } else {
      setUsers([]);
    }
  }, [data?.students, isError]);
  const handleDataChange = useCallback((userId: number, property: string, value: string) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.userId === userId
          ? {
              ...item,
              [property]: value,
              ...(property === 'attendanceStatusCode' ? { remarks: '' } : {})
            }
          : item
      )
    );
  }, []);
  const clearFilter = () => {
    methods.reset(formState);
  };

  return (
    <>
      <Box component={Paper} sx={{ p: 1, mb: 5 }}>
        {setting}
        <Box sx={{ my: 2 }} />
        <FilterText />
        <TakeStudentsAttendanceFilter
          methods={methods}
          searchUser={methods.handleSubmit(setFilter)}
          clearFilter={clearFilter}
        />
      </Box>
      <ResponsiveBox>
        <ListUsersForAttendance
          attendanceDate={methods.getValues().attendanceDate}
          handleDataChange={handleDataChange}
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
