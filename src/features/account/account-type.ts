export type BaseAccount = {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  isEmailVerified: boolean;
  hasSystemAccess: boolean;
  role: string;
  passwordLastChangedDate: string | null;
  recentDeviceInfo: string;
  phone: string;
  gender: string;
  dob: string;
  currentAddress: string;
  permanentAddress: string;
  bloodGroup: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianRelationship: string;
};
export type StaffAccount = BaseAccount & {
  staffId: string;
  joinDate: string;
  qualification: string;
  experience: string;
  department: string;
  maritalStatus: string;
};

export type StudentAccount = BaseAccount & {
  studentId: string;
  admissionDate: string;
  class: string;
  section: string;
  roll: number;
};

export type AccountMeResponse = StaffAccount | StudentAccount;
export type AccountMode = 'view' | 'edit';
