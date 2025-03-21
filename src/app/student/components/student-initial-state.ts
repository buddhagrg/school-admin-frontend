import { StudentProps } from '../types';

export const studentFormInitialState: StudentProps = {
  name: '',
  gender: '',
  dob: new Date(),
  phone: '',
  email: '',
  class: '',
  section: '',
  roll: '',
  joinDate: new Date(),
  fatherName: '',
  fatherPhone: '',
  motherName: '',
  motherPhone: '',
  guardianName: '',
  guardianPhone: '',
  relationOfGuardian: '',
  currentAddress: '',
  permanentAddress: '',
  hasSystemAccess: false
};
