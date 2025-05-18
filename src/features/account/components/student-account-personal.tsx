import { StudentBasicInfoView } from '@/features/students/components/views/student-basic-info-view';
import { StudentClassView } from '@/features/students/components/views/student-class-view';
import { StudentContactView } from '@/features/students/components/views/student-contact-view';
import { StudentParentView } from '@/features/students/components/views/student-parent-view';
import { AccountDetailTabContent } from '@/shared/components';

export const StudentAccountPersonal = () => {
  const components: React.ReactNode[] = [
    <StudentBasicInfoView />,
    <StudentParentView />,
    <StudentContactView />,
    <StudentClassView />
  ];

  return <AccountDetailTabContent components={components} />;
};
