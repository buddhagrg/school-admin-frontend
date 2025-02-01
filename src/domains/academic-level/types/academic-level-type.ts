import { z } from 'zod';
import { AcademicLevelFormSchema, AcademicPeriodFormSchema } from './academic-level-schema';
export type Level = { id: number; name: string };
export type AcademicLevelFormProps = z.infer<typeof AcademicLevelFormSchema>;
export type AcademicLevelFormWithId = AcademicLevelFormProps & { id: number };
export type AcademicPeriodFormProps = z.infer<typeof AcademicPeriodFormSchema>;
export type AcademicPeriodFormWithId = Omit<AcademicPeriodFormProps, 'academicLevelId'> & {
  id: number;
};
export type AcademicLevelData = {
  academicLevels: Level[];
};

export type Period = { id: number; name: string };
export type AcademicLevelsWithPeriods = {
  academicLevelsWithPeriods: { id: number; name: string; periods: Period[] }[];
};
export type ManagePeriodOrder = { academicLevelId: number; periods: Period[] };
