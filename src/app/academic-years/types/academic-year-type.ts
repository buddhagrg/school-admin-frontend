import { z } from 'zod';
import { AcademicYearFormSchema } from './academic-year-schema';

export type AcademicYear = {
  id: number;
  name: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  academicLevelId: number;
  academicLevelName: string;
};
export type AcademicYearData = {
  academicYears: AcademicYear[];
};

export type AcademicYearFormProps = z.infer<typeof AcademicYearFormSchema>;
export type AcademicYearFormPropsWithId = AcademicYearFormProps & { id: number };
export type AcademicYearFormPropsWithOption = AcademicYearFormProps & {
  id: number;
  action: string;
};
