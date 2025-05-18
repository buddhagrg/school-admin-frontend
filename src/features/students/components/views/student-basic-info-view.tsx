import { BloodtypeOutlined, CalendarMonthOutlined, PersonOutline } from '@mui/icons-material';
import { useStudentDetail } from '../../student-context-provider';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { AccountDetailLayout } from '@/shared/components';

export const StudentBasicInfoView = () => {
  const { state } = useStudentDetail();

  const fields = [
    { icon: PersonOutline, label: 'Full Name', value: state?.name || '' },
    { icon: PersonOutline, label: 'Gender', value: state?.gender || '' },
    {
      icon: CalendarMonthOutlined,
      label: 'Date of Birth',
      value: getFormattedDate(state?.dob || '', DATE_FORMAT)
    },
    { icon: BloodtypeOutlined, label: 'Blood Group', value: state?.bloodGroup || '' }
  ];

  return <AccountDetailLayout heading='Basic Details' fields={fields} />;
};
