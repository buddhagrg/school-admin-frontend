import { z } from 'zod';
import { ClassFormSchema, ClassTeacherFormSchema, SectionFormSchema } from './class-schema';
import { NameIdType } from '@/utils/type/misc';

export type ClassFormProps = z.infer<typeof ClassFormSchema>;
export type ClassFormWithId = ClassFormProps & { id: number };
export type SectionFormProps = z.infer<typeof SectionFormSchema>;
export type SectionFormWithId = SectionFormProps & { id: number };
export type ClassData = { id: number; name: string };
export type GetClassList = {
  classes: ClassData[];
};
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
  sortOrder: number;
  sections: SectionDetail[];
};
export type ClassSectionStructure = {
  classSectionStructure: ClassSection[];
};
export type ClassTeacherDetail = {
  id: number;
  classId: number;
  className: string;
  teacherName: string;
};
export type ClassTeachers = {
  classTeachers: ClassTeacherDetail[];
};
export type ClassTeacherFormProps = z.infer<typeof ClassTeacherFormSchema>;
export type Teachers = {
  teachers: NameIdType[];
};
