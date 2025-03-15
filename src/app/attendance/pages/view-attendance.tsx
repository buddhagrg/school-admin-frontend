import { useState } from 'react';
import { PageContentHeader } from '@/components/page-content-header';
import { AttendanceSetting, GetStaffAttendance, GetStudentsAttendance } from '../components';
import { UserSetting } from '../types';

export const ViewAttendance = () => {
  const [userType, setUserType] = useState<UserSetting>('staff');

  return (
    <>
      <PageContentHeader
        title='Attendances Records'
        subtitle={`View and manage ${userType} attendance records`}
      />
      {userType === 'students' ? (
        <GetStudentsAttendance
          setting={<AttendanceSetting userType={userType} handleChange={setUserType} />}
        />
      ) : (
        <GetStaffAttendance
          setting={<AttendanceSetting userType={userType} handleChange={setUserType} />}
        />
      )}
    </>
  );
};
