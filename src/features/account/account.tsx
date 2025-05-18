import { useSelector } from 'react-redux';
import { getUserRoleId } from '../auth/auth-slice';
import { ViewStudentAccount } from './components/view-student-account';
import { ViewStaffAccount } from './components/view-staff-account';
import { StudentContextProvider } from '../students/student-context-provider';
import { StaffContextProvider } from '../staff/staff-context-provider';

export const Account = () => {
  const role = useSelector(getUserRoleId);
  if (role === 'STUDENT') {
    return (
      <StudentContextProvider>
        <ViewStudentAccount />
      </StudentContextProvider>
    );
  }

  return (
    <StaffContextProvider>
      <ViewStaffAccount />
    </StaffContextProvider>
  );
};
