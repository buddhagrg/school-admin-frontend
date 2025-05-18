import { z } from 'zod';
import { DepartmentFormSchema } from './department-schema';

export type DepartmentFormProps = z.infer<typeof DepartmentFormSchema>;
export type DepartmentFormPropsWithId = DepartmentFormProps & { id: number };
export type DepartmentData = {
  departments: DepartmentFormPropsWithId[];
};
