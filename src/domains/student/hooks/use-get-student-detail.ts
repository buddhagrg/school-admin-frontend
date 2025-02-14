import { useEffect, useState } from 'react';
import { studentFormInitialState } from '../reducer/student-form-reducer';
import { GetStudentDetailProps } from '../types';
import { useLazyGetStudentDetailQuery } from '../api';

const initialState: GetStudentDetailProps = { ...studentFormInitialState, id: 0, reporterName: '' };
export const useGetStudentDetail = (id: string | undefined) => {
  const [student, setStudent] = useState(initialState);

  const [getStudentDetail] = useLazyGetStudentDetailQuery();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getStudentDetail(id).unwrap();
        if (result) {
          setStudent(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [id, getStudentDetail]);

  return student;
};
