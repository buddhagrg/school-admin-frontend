import { z } from 'zod';
import { FiscalYearFormSchema } from './fiscal-year-schema';

export type FiscalYearFormProps = z.infer<typeof FiscalYearFormSchema>;
export type FiscalYear = FiscalYearFormProps & {
  id: number;
  isActive: boolean;
};
export type FiscalYearData = {
  fiscalYears: FiscalYear[];
};
export type FiscalYearFormPropsWithId = FiscalYearFormProps & { id: number };
export type FiscalYearInitialStateProps = Omit<FiscalYear, 'isActive'> & {
  id: number;
  action: string;
};
