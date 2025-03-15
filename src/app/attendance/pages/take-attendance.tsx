import { useState } from 'react';
import { PageContentHeader } from '@/components/page-content-header';
import { AttendanceSetting, TakeStaffAttendance, TakeStudentsAttendance } from '../components';
import { UserSetting } from '../types';

export const TakeAttendance = () => {
  const [userType, setUserType] = useState<UserSetting>('staff');

  return (
    <>
      <PageContentHeader title='Record Attendance' subtitle={`Take attendance for ${userType}`} />

      {userType === 'students' ? (
        <TakeStudentsAttendance
          setting={<AttendanceSetting userType={userType} handleChange={setUserType} />}
        />
      ) : (
        <TakeStaffAttendance
          setting={<AttendanceSetting userType={userType} handleChange={setUserType} />}
        />
      )}
    </>
  );
};
