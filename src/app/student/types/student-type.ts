import { z } from 'zod';
import {
  AcademicInfoSchema,
  AddressInfoSchema,
  BasicInfoSchema,
  OtherInfoSchema,
  ParentsAndGuardianInfoSchema,
  StudentSchema
} from './student-schema';

export type AddressInfo = z.infer<typeof AddressInfoSchema>;
export type BasicInfo = z.infer<typeof BasicInfoSchema>;
export type AcademicInfo = z.infer<typeof AcademicInfoSchema>;
export type ParentsAndGuardianInfo = z.infer<typeof ParentsAndGuardianInfoSchema>;
export type OtherInfo = z.infer<typeof OtherInfoSchema>;

export type StudentFormState = {
  basicInfo: BasicInfo;
  academicInfo: AcademicInfo;
  parentsAndGuardianInfo: ParentsAndGuardianInfo;
  addressInfo: AddressInfo;
  otherInfo: OtherInfo;
};

type SetFieldAction = {
  type: 'SET_FIELD';
  payload: {
    section: string;
    name: string;
    value: string | number | Date | null | boolean;
  };
};
type SetStateAction = { type: 'SET_STATE'; payload: StudentFormState };
type ResetFieldAction = { type: 'RESET_FIELD'; payload: StudentFormState };
export type StudentFormAction = SetFieldAction | SetStateAction | ResetFieldAction;
export type StudentProps = z.infer<typeof StudentSchema>;
export type StudentPropsWithId = StudentProps & { id: number };
export type GetStudentDetailProps = StudentPropsWithId & { reporterName: string };
export type StudentDetail = {
  student: StudentPropsWithId;
};
export type AddStudent = {
  message: string;
  id: number;
};
