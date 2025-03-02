import { Period } from '@/app/levels-periods/types';
import { AddClassToLevelFormSchema } from './levels-classes-schema';
import { z } from 'zod';

type LevelClass = {
  id: number;
  name: string;
  classes: Period[];
};
export type AcademicLevelsWithClasses = {
  levelsWithClasses: LevelClass[];
};
export type AddClassToAcademicLevel = {
  classId: number | string;
  academicLevelId: number;
};
export type AddClassToLevelFormProps = z.infer<typeof AddClassToLevelFormSchema>;
