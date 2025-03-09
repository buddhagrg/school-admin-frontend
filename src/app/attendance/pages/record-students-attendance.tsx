import { PageContentHeader } from '@/components/page-content-header';
import { ResponsiveBox } from '@/components/responsive-box';
import { Info } from '@mui/icons-material';
import { ListAttendance, StudentsAttendanceFilter } from '../components';
import { Box } from '@mui/material';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useCallback, useEffect, useState } from 'react';
import { useGetStudentsForAttendanceQuery } from '../attendance-api';
import { useForm } from 'react-hook-form';
import {
  StudentsAttendanceCurrentFilterSchema,
  StudentsAttendanceCurrentFilterProps,
  UserAttendanceCommonDetail
} from '../types';
import { zodResolver } from '@hookform/resolvers/zod';

const formState: StudentsAttendanceCurrentFilterProps = {
  name: '',
  classId: '',
  sectionId: ''
};
export const RecordStudentsAttendance = () => {
  const [filter, setFilter] = useState(formState);
  const { data, isLoading, isError, error } = useGetStudentsForAttendanceQuery(filter, {
    skip: !filter.classId
  });
  const methods = useForm<StudentsAttendanceCurrentFilterProps>({
    defaultValues: formState,
    resolver: zodResolver(StudentsAttendanceCurrentFilterSchema)
  });
  const [users, setUsers] = useState<UserAttendanceCommonDetail[]>([]);

  useEffect(() => {
    if (data?.students) {
      setUsers(data.students);
    }
  }, [data?.students]);
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
  const searchUser = (data: StudentsAttendanceCurrentFilterProps) => {
    setFilter(data);
  };
  const clearFilter = () => {
    methods.reset(formState);
  };

  return (
    <>
      <PageContentHeader title='Manage Students attendance' icon={Info} />
      <StudentsAttendanceFilter
        methods={methods}
        searchUser={methods.handleSubmit(searchUser)}
        clearFilter={clearFilter}
      />
      <Box sx={{ my: 10 }} />
      <ResponsiveBox>
        <ListAttendance
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
