import type { StaffFormProps } from '../types';

export const staffFormInitialState: StaffFormProps = {
  name: '',
  roleId: '',
  gender: '',
  maritalStatus: '',
  dob: new Date(),
  joinDate: new Date(),
  hasSystemAccess: false,
  bloodGroup: '',

  phone: '',
  email: '',
  departmentId: '',
  qualification: '',
  experience: '',
  currentAddress: '',
  permanentAddress: '',

  guardianName: '',
  guardianEmail: '',
  guardianPhone: '',
  guardianRelationship: ''
};
