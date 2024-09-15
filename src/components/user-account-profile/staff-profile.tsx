import {
  MiniAvatar,
  Others,
  ParentsInformation,
  PersonalDetail
} from '@/domains/staff/components/views';
import { useGetStaffDetail } from '@/domains/staff/hooks';
import { Grid } from '@mui/material';

type StaffProfileProps = {
  id?: string;
};

export const StaffProfile: React.FC<StaffProfileProps> = ({ id }) => {
  const staffDetail = useGetStaffDetail(id);

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
    systemAccess
  } = staffDetail;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <MiniAvatar name={name} roleName={roleName} email={email} phone={phone} />
      </Grid>
      <Grid item xs={12} md={7}>
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
      </Grid>
      <Grid item xs={12} md={5}></Grid>
      <Grid item xs={12} md={7}>
        <ParentsInformation
          fatherName={fatherName}
          motherName={motherName}
          emergencyPhone={emergencyPhone}
        />
      </Grid>
      <Grid item xs={12} md={5}></Grid>
      <Grid item xs={12} md={7}>
        <Others systemAccess={systemAccess} reporterName={reporterName} />
      </Grid>
    </Grid>
  );
};
