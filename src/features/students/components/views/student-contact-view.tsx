import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from '@mui/icons-material';
import { useStudentDetail } from '../../student-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StudentContactView = () => {
  const { state } = useStudentDetail();

  const fields = [
    { icon: EmailOutlined, label: 'Email', value: state?.email || '' },
    { icon: PhoneOutlined, label: 'Phone', value: state?.phone || '' },
    { icon: LocationOnOutlined, label: 'Current Address', value: state?.currentAddress || '' },
    { icon: LocationOnOutlined, label: 'Permanent Address', value: state?.permanentAddress || '' }
  ];

  return <AccountDetailLayout heading='Contact' fields={fields} />;
};
