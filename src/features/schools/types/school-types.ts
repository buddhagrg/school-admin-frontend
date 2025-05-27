import { z } from 'zod';
import { SchoolSchema } from './school-schema';

export type School = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastModifiedByName: number;
  createdDate: Date | null;
  updatedDate: Date | null;
  isActive: boolean;
  isEmailVerified: boolean;
};

export type SchoolsData = {
  schools: School[];
};

export type SchoolProps = z.infer<typeof SchoolSchema>;
export type SchoolWithIdProps = SchoolProps & { schoolId: number };
