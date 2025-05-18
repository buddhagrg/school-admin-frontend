import {
  AddCircleOutline,
  BloodtypeOutlined,
  CalendarMonthOutlined,
  FavoriteBorder,
  PersonOutline
} from '@mui/icons-material';

import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useStaffDetail } from '../../staff-context-provider';
import { AccountDetailLayout } from '@/shared/components';

export const StaffBasicInfoView = () => {
  const { state } = useStaffDetail();

  const fields = [
    { icon: PersonOutline, label: 'Full Name', value: state?.name || '' },
    { icon: AddCircleOutline, label: 'Gender', value: state?.gender || '' },
    {
      icon: CalendarMonthOutlined,
      label: 'Date of Birth',
      value: getFormattedDate(state?.dob || '', DATE_FORMAT)
    },
    { icon: BloodtypeOutlined, label: 'Blood Group', value: state?.bloodGroup || '' },
    { icon: FavoriteBorder, label: 'Marital Status', value: state?.maritalStatus || '' }
  ];

  return <AccountDetailLayout heading='Basic Details' fields={fields} />;
};
