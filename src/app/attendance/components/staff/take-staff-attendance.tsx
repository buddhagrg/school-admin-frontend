import { useCallback, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetStaffForAttendanceQuery } from '../../attendance-api';
import { ResponsiveBox } from '@/components/responsive-box';
import {
  TakeStaffAttendanceFilterSchema,
  TakeStaffAttendanceFilterProps,
  UserAttendanceCommonDetail
} from '../../types';
import { TakeStaffAttendanceFilter } from './take-staff-attendance-filter';
import { ListUsersForAttendance } from '../list-users-for-attendance';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { FilterText } from '@/components/filter-text';

const formState: TakeStaffAttendanceFilterProps = {
  attendanceDate: formatISO(new Date(), { representation: 'date' }),
  roleId: '',
  name: ''
};
export const TakeStaffAttendance: React.FC<{ setting: React.ReactNode }> = ({ setting }) => {
  const [filter, setFilter] = useState(formState);
  const { data, isLoading, isError, error } = useGetStaffForAttendanceQuery({
    ...filter,
    attendanceDate: filter.attendanceDate
      ? getFormattedDate(filter.attendanceDate, API_DATE_FORMAT)
      : ''
  });
  const methods = useForm<TakeStaffAttendanceFilterProps>({
    defaultValues: formState,
    resolver: zodResolver(TakeStaffAttendanceFilterSchema)
  });
  const [users, setUsers] = useState<UserAttendanceCommonDetail[]>([]);

  useEffect(() => {
    if (data?.staff) {
      setUsers(data.staff);
    }
  }, [data?.staff]);
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
        <TakeStaffAttendanceFilter
          methods={methods}
          searchUser={methods.handleSubmit(setFilter)}
          clearFilter={clearFilter}
        />
      </Box>
      <ResponsiveBox>
        <ListUsersForAttendance
          attendanceDate={methods.getValues().attendanceDate}
          handleDataChange={handleDataChange}
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
