import * as React from "react";
import { Grid } from "@mui/material";
import { useGetStudentDetail } from "@/domains/student/hooks/use-get-student-detail";
import { MiniAvatar, Others, ParentsAndGuardianInformation, PersonalDetail } from "@/domains/student/components/views";

type StudentProfileProps = {
    id?: string;
};

export const StudentProfile: React.FC<StudentProfileProps> = ({ id }) => {
    const student = useGetStudentDetail(id);
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
        reporterName
    } = student;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
                <MiniAvatar
                    name={name}
                    phone={phone}
                    email={email}
                    selectedClass={className}
                    section={section}
                />
            </Grid>
            <Grid item xs={12} md={7}>
                <PersonalDetail
                    dob={dob}
                    gender={gender}
                    roll={roll}
                    admissionDate={admissionDate}
                    currentAddress={currentAddress}
                    permanentAddress={permanentAddress}
                />
            </Grid>
            <Grid item xs={12} md={5}></Grid>
            <Grid item xs={12} md={7}>
                <ParentsAndGuardianInformation
                    fatherName={fatherName}
                    fatherPhone={fatherPhone}
                    motherName={motherName}
                    motherPhone={motherPhone}
                    guardianName={guardianName}
                    guardianPhone={guardianPhone}
                    relationOfGuardian={relationOfGuardian}
                />
            </Grid>
            <Grid item xs={12} md={5}></Grid>
            <Grid item xs={12} md={7}>
                <Others
                    systemAccess={systemAccess}
                    reporterName={reporterName}
                />
            </Grid>
        </Grid>
    );
}