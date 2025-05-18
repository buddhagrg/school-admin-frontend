import { z } from 'zod';
import { AcademicLevelFormSchema, AcademicPeriodFormSchema } from './levels-periods-schema';

export type Level = { id: number; name: string; totalPeriods: number };
export type AcademicLevelFormProps = z.infer<typeof AcademicLevelFormSchema>;
export type AcademicLevelFormWithId = AcademicLevelFormProps & { id: number };
export type AcademicPeriodFormProps = z.infer<typeof AcademicPeriodFormSchema>;
export type AcademicPeriodFormWithId = AcademicPeriodFormProps & {
  id: number;
};

export type Period = AcademicPeriodFormProps & { id: number };
export type PeriodReorder = { id: number; sortOrder: number };
export type ManagePeriodOrder = { academicLevelId: number; periods: PeriodReorder[] };
export type AcademicLevelsData = {
  academicLevels: Level[];
};
export type AcademicPeriodsData = {
  academicPeriods: Period[];
};
export type LevelPeriodProps = {
  academicLevelId: number;
  id: number;
};
