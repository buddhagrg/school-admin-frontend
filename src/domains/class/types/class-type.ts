import { z } from 'zod';
import { ClassFormSchema, SectionFormSchema } from './class-schema';

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
