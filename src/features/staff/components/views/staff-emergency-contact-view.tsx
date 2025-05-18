import { EmailOutlined, PeopleOutlined, PersonOutlined, PhoneOutlined } from '@mui/icons-material';
import { useStaffDetail } from '../../staff-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StaffEmergencyContactView = () => {
  const { state } = useStaffDetail();

  const fields = [
    { icon: PersonOutlined, label: 'Name', value: state?.guardianName || '' },
    { icon: PhoneOutlined, label: 'Phone', value: state?.guardianPhone || '' },
    { icon: EmailOutlined, label: 'Email', value: state?.guardianEmail || '' },
    {
      icon: PeopleOutlined,
      label: 'Relationship',
      value: state?.guardianRelationship || ''
    }
  ];

  return <AccountDetailLayout heading='Emergency/Primary Contact' fields={fields} />;
};
