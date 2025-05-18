import type { StudentFormProps } from '../types';

export const studentFormInitialState: StudentFormProps = {
  name: '',
  gender: 'MALE',
  dob: new Date(),
  classId: '',
  sectionId: '',
  roll: '',
  admissionDate: new Date(),
  bloodGroup: '',
  hasSystemAccess: true,
  email: '',
  phone: '',
  currentAddress: '',
  permanentAddress: '',
  guardianName: '',
  guardianPhone: '',
  guardianEmail: '',
  guardianRelationship: ''
};
