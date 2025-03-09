import { PageContentHeader } from '@/components/page-content-header';
import { ResponsiveBox } from '@/components/responsive-box';
import { Info } from '@mui/icons-material';
import { ListAttendance, StaffAttendanceFilter } from '../components';
import { Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetStaffForAttendanceQuery } from '../attendance-api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  StaffAttendanceCurrentFilterSchema,
  StaffAttendanceCurrentFilterProps,
  UserAttendanceCommonDetail
} from '../types';

const formState = {
  roleId: '',
  name: ''
};
export const RecordStaffAttendance = () => {
  const [filter, setFilter] = useState({});
  const { data, isLoading, isError, error } = useGetStaffForAttendanceQuery(filter);
  const methods = useForm<StaffAttendanceCurrentFilterProps>({
    defaultValues: formState,
    resolver: zodResolver(StaffAttendanceCurrentFilterSchema)
  });
  const [users, setUsers] = useState<UserAttendanceCommonDetail[]>([]);

  useEffect(() => {
    if (data?.staff) {
      setUsers(data.staff);
    }
  }, [data?.staff]);
  const handleDataChange = useCallback((id: number, property: string, value: string) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [property]: value,
              ...(property === 'attendanceStatusCode' ? { remarks: '' } : {})
            }
          : item
      )
    );
  }, []);
  const searchUser = (data: StaffAttendanceCurrentFilterProps) => {
    setFilter(data);
  };
  const clearFilter = () => {
    methods.reset(formState);
  };

  return (
    <>
      <PageContentHeader title='Manage Staff attendance' icon={Info} />
      <StaffAttendanceFilter
        methods={methods}
        searchUser={methods.handleSubmit(searchUser)}
        clearFilter={clearFilter}
      />
      <Box sx={{ my: 10 }} />
      <ResponsiveBox>
        <ListAttendance
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
