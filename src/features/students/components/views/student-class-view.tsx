import { MenuBookOutlined, PeopleOutlined, PersonOutlined } from '@mui/icons-material';
import { useStudentDetail } from '../../student-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StudentClassView = () => {
  const { state } = useStudentDetail();

  const fields = [
    { icon: MenuBookOutlined, label: 'Class', value: state?.class || '' },
    { icon: PeopleOutlined, label: 'Section', value: state?.section || '' },
    { icon: PersonOutlined, label: 'Roll Number', value: state?.roll || '' }
  ];

  return <AccountDetailLayout heading='Class Detail' fields={fields} />;
};
