import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StudentAccountEdit } from '../components/views';
import { getAppBase } from '@/domains/auth/slice';

export const EditStudent = () => {
  const { id } = useParams();
  const appBase = useSelector(getAppBase);

  return (
    <StudentAccountEdit
      heading='Edit Student Account'
      id={id}
      redirectPath={`${appBase}/students/${id}`}
    />
  );
};
