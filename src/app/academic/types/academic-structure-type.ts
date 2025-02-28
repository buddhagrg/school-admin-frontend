import { z } from 'zod';
import {
  AcademicLevelFormSchema,
  AcademicPeriodFormSchema,
  AddClassToLevelForm,
  PeriodDateFormSchema
} from './academic-structure-schema';

export type Level = { id: number; name: string };
export type AcademicLevelFormProps = z.infer<typeof AcademicLevelFormSchema>;
export type AcademicLevelFormWithId = AcademicLevelFormProps & { id: number };
export type AcademicPeriodFormProps = z.infer<typeof AcademicPeriodFormSchema>;
export type AcademicPeriodFormWithId = AcademicPeriodFormProps & {
  id: number;
};
export type AcademicLevelData = {
  academicLevels: Level[];
};

export type Period = { id: number; name: string; sortOrder: number };
export type AcademicLevelsWithPeriods = {
  levelsWithPeriods: { id: number; name: string; periods: Period[] }[];
};
export type ManagePeriodOrder = { academicLevelId: number; periods: Period[] };

type LevelClass = {
  id: number;
  name: string;
  classes: Period[];
};
export type AcademicLevelsWithClasses = {
  levelsWithClasses: LevelClass[];
};
type Class = { id: number; name: string; sortOrder: number };
type ClassesWithNoLevel = {
  id: number;
  name: string;
  classes: Class[];
};
export type ClassesWithNoAcademicLevel = {
  classesWithNoLevel: ClassesWithNoLevel[];
};

export type AddClassToLevelFormProps = z.infer<typeof AddClassToLevelForm>;

export type AddClassToAcademicLevel = {
  classId: number | string;
  academicLevelId: number;
};

export type PeriodWithDate = {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
};
export type PeriodsWithDatesData = {
  periodsWithDates: PeriodWithDate[];
};
export type PeriodDateFormProps = z.infer<typeof PeriodDateFormSchema>;
export type PeriodDateFormPropsWithLevelId = {
  periodsDates: PeriodDateFormProps;
  academicLevelId: number;
};
