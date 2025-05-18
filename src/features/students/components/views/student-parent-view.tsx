import { EmailOutlined, PeopleOutlined, PersonOutlined, PhoneOutlined } from '@mui/icons-material';
import { useStudentDetail } from '../../student-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StudentParentView = () => {
  const { state } = useStudentDetail();

  const fields = [
    { icon: PersonOutlined, label: 'Name', value: state?.guardianName || '' },
    { icon: PhoneOutlined, label: 'Phone', value: state?.guardianPhone || '' },
    { icon: EmailOutlined, label: 'Email', value: state?.guardianEmail || '' },
    { icon: PeopleOutlined, label: 'Relationship', value: state?.guardianRelationship || '' }
  ];

  return <AccountDetailLayout heading='Parents/Guardian' fields={fields} />;
};
