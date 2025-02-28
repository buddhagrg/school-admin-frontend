import { FC } from 'react';
import { Grid2 } from '@mui/material';
import {
  MiniAvatar,
  Others,
  ParentsInformation,
  PersonalDetail
} from '@/app/staff/components/views';
import { useGetStaffDetailQuery } from '@/app/staff/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '../errors';

type StaffProfileProps = {
  id?: string;
};

export const StaffProfile: FC<StaffProfileProps> = ({ id }) => {
  const { data, isLoading, isError, error } = useGetStaffDetailQuery(id);

  if (isLoading) {
    return <>loading...</>;
  }

  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }

  if (!data) {
    return <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  }

  const {
    name,
    roleName,
    gender,
    maritalStatus,
    phone,
    email,
    dob,
    joinDate,
    qualification,
    experience,
    currentAddress,
    permanentAddress,
    fatherName,
    motherName,
    emergencyPhone,
    reporterName,
    hasSystemAccess,
    schoolName
  } = data;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <MiniAvatar
          name={name}
          roleName={roleName}
          email={email}
          phone={phone}
          schoolName={schoolName}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <PersonalDetail
          gender={gender}
          dob={dob}
          joinDate={joinDate}
          maritalStatus={maritalStatus}
          qualification={qualification}
          experience={experience}
          currentAddress={currentAddress}
          permanentAddress={permanentAddress}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <ParentsInformation
          fatherName={fatherName}
          motherName={motherName}
          emergencyPhone={emergencyPhone}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Others hasSystemAccess={hasSystemAccess ?? false} reporterName={reporterName} />
      </Grid2>
    </Grid2>
  );
};
