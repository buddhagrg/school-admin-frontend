import { z } from 'zod';
import { PeriodsDatesFormSchema } from './periods-dates-schema';

export type PeriodWithDate = {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
};
export type PeriodsWithDatesData = {
  periodsWithDates: PeriodWithDate[];
};
export type PeriodDateFormProps = z.infer<typeof PeriodsDatesFormSchema>;
export type PeriodDateFormPropsWithLevelId = {
  periodsDates: PeriodDateFormProps;
  academicLevelId: number;
};
