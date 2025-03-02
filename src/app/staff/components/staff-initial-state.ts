import { StaffFormProps } from '../types';

export const staffInitialState: StaffFormProps = {
  name: '',
  role: '',
  roleName: '',
  gender: '',
  maritalStatus: '',
  phone: '',
  email: '',
  dob: new Date(),
  joinDate: new Date(),
  qualification: '',
  experience: '',
  currentAddress: '',
  permanentAddress: '',
  fatherName: '',
  motherName: '',
  emergencyPhone: '',
  reporterId: '',
  hasSystemAccess: false
};

export const {
  role,
  roleName,
  reporterId,
  reporterName,
  hasSystemAccess,
  ...staffInitialStateForAdminProfile
} = staffInitialState;
