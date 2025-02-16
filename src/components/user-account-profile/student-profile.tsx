import { FC } from 'react';
import { Grid2 } from '@mui/material';
import {
  MiniAvatar,
  Others,
  ParentsAndGuardianInformation,
  PersonalDetail
} from '@/domains/student/components/views';
import { useGetStudentDetailQuery } from '@/domains/student/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '../errors';

type StudentProfileProps = {
  id?: string;
};

export const StudentProfile: FC<StudentProfileProps> = ({ id }) => {
  const { data, isLoading, isError, error } = useGetStudentDetailQuery(id);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }

  if (!data) {
    return <>{ERROR_MESSAGE.NO_RECORD}</>;
  }

  const {
    name,
    email,
    class: className,
    section,
    phone,
    dob,
    gender,
    roll,
    admissionDate,
    currentAddress,
    permanentAddress,
    fatherName,
    fatherPhone,
    motherName,
    motherPhone,
    guardianName,
    guardianPhone,
    relationOfGuardian,
    systemAccess,
    reporterName,
    schoolName
  } = data;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <MiniAvatar
          name={name}
          phone={phone}
          email={email}
          selectedClass={className}
          section={section}
          schoolName={schoolName}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <PersonalDetail
          dob={dob}
          gender={gender}
          roll={roll}
          admissionDate={admissionDate}
          currentAddress={currentAddress}
          permanentAddress={permanentAddress}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <ParentsAndGuardianInformation
          fatherName={fatherName}
          fatherPhone={fatherPhone}
          motherName={motherName}
          motherPhone={motherPhone}
          guardianName={guardianName}
          guardianPhone={guardianPhone}
          relationOfGuardian={relationOfGuardian}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Others systemAccess={systemAccess} reporterName={reporterName} />
      </Grid2>
    </Grid2>
  );
};
