import { z } from 'zod';
import {
  ContactFormSchema,
  ParentFormSchema,
  StudentFilterSchema,
  StudentFormSchema
} from './student-schema';

export type ParentFormProps = z.infer<typeof ParentFormSchema>;
export type ContactFormProps = z.infer<typeof ContactFormSchema>;

export type StudentFormProps = z.infer<typeof StudentFormSchema>;
export type StudentPropsWithId = StudentFormProps & { id: number };
export type AddStudent = {
  message: string;
  id: number;
};
export type GetStudentDetail = {
  id: number;
  mode: 'edit' | 'view';
};

export type Student = {
  id: number;
  studentId: string;
  name: string;
  class: string;
  section: string;
  gender: string;
  hasSystemAccess: boolean;
};
export type StudentsData = {
  students: Student[];
};
export type StudentFilterProps = z.infer<typeof StudentFilterSchema>;
