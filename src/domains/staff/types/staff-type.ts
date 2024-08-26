import { z } from "zod";
import { BasicInfoSchema, ParentsInfoSchema, StaffFilterSchema, StaffFormSchema } from "./staff-schema";

export type StaffFilter = z.infer<typeof StaffFilterSchema>;

export type StaffState = {
    staffs: StaffAccountBasic[];
    isLoading: boolean;
    isError: boolean;
    error?: string;
};

export type StaffFormProps = z.infer<typeof StaffFormSchema>;
export type StaffFormPropsWithId = StaffFormProps & { id: number };
export type StaffStatusRequest = {
    id: number;
    status: boolean;
};
export type StaffAccountBasic = {
    id: number;
    name: string;
    email: string;
    role: string;
    systemAccess: boolean;
    lastLogin: Date | null;
};

export type StaffData = {
    staffs: StaffAccountBasic[]
};

export type ParentsInfo = z.infer<typeof ParentsInfoSchema>;

export type BasicInfo = z.infer<typeof BasicInfoSchema>;
