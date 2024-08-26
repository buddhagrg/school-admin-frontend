import { z } from "zod";
import { NameIdType } from "@/utils/type/misc";
import { NoticeFormSchema, RecipientDetailSchema } from "./notice-schema";

export type Section = {
    [key: number]: NameIdType[]
};

export type Notice = {
    id: number;
    title: string;
    description?: string;
    author: string;
    statusId: number;
    status: string;
    authorId: number; //needed for checking delete/edit action
    createdDate: Date;
    updatedDate: Date;
    reviewerName: string;
    reviewedDate: Date;
    whoHasAccess: string;
};

export type NoticeFormProps = z.infer<typeof NoticeFormSchema>;

export type NoticeDetailProps = NoticeFormProps & {
    id: number;
    author: string;
    createdDate: Date;
};

export type RecipientData = z.infer<typeof RecipientDetailSchema>[];

export type RecipientResponse = {
    noticeRecipients: RecipientData;
}

export type NoticeFormPropsWithId = NoticeFormProps & { id: string };

export type NoticeData = {
    notices: Notice[]
};

export type ReviewNotice = {
    id: number;
    status: number;
};
