import { z } from 'zod';
import { AddEditAccessControlSchema } from './ac-schema';

export type AddEditAccessControlProps = z.infer<typeof AddEditAccessControlSchema>;
export type AddEditAccessControlWithId = AddEditAccessControlProps & { id: number };
