import { AccessTime, SchoolOutlined } from '@mui/icons-material';
import { useStaffDetail } from '@/features/staff/staff-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StaffQualificationView = () => {
  const { state } = useStaffDetail();

  const fields = [
    { icon: SchoolOutlined, label: 'Education', value: state?.qualification || '' },
    { icon: AccessTime, label: 'Experience', value: state?.experience || '' }
  ];

  return <AccountDetailLayout heading='Qualification' fields={fields} />;
};
