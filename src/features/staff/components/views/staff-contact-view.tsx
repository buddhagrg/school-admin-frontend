import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from '@mui/icons-material';
import { useStaffDetail } from '../../staff-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StaffContactView = () => {
  const { state } = useStaffDetail();

  const fields = [
    { icon: EmailOutlined, label: 'Email', value: state?.email || '' },
    { icon: PhoneOutlined, label: 'Phone', value: state?.phone || '' },
    { icon: LocationOnOutlined, label: 'Current Address', value: state?.currentAddress || '' },
    { icon: LocationOnOutlined, label: 'Permanent Address', value: state?.permanentAddress || '' }
  ];

  return <AccountDetailLayout heading='Contact' fields={fields} />;
};
