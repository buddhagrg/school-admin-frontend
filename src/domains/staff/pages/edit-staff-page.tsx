import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StaffAccountEdit } from '../components/views';
import { getAppBase } from '@/domains/auth/slice';

export const EditStaff = () => {
  const { id } = useParams();
  const appBase = useSelector(getAppBase);

  return (
    <StaffAccountEdit
      heading='Edit Staff Account'
      id={id}
      redirectPath={`${appBase}/staffs/${id}`}
    />
  );
};
