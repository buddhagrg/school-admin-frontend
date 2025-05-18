import { z } from 'zod';
import { ClassFormSchema, ClassTeacherFormSchema, SectionFormSchema } from './class-schema';
import type { NameIdType } from '@/shared/types';

export type ClassFormProps = z.infer<typeof ClassFormSchema>;
export type ClassFormWithId = ClassFormProps & { id: number };
export type SectionFormProps = z.infer<typeof SectionFormSchema>;
export type SectionFormWithId = SectionFormProps & { id: number };
export type SectionDetail = {
  id: number;
  name: string;
  sortOrder: number;
  isActive: boolean;
};
export type ClassSection = {
  id: number;
  name: string;
  isActive: boolean;
  academicLevelName: string;
  academicLevelId: number;
  sortOrder: number;
  sections: SectionDetail[];
};
export type ClassesWithSections = {
  classesWithSections: ClassSection[];
};
export type ClassTeacherDetail = {
  id: number;
  classId: number | string;
  className: string;
  teacherName: string;
  teacherId: number | string;
};
export type ClassTeachers = {
  classTeachers: ClassTeacherDetail[];
};
export type ClassTeacherFormProps = z.infer<typeof ClassTeacherFormSchema>;
export type Teachers = {
  teachers: NameIdType[];
};
export type ClassTeacherUpdateRequest = Pick<ClassTeacherDetail, 'id' | 'teacherId'>;
