import { z } from 'zod';
import { NoticeFormSchema, NoticeRecipientSchema, RecipientDetailSchema } from './notice-schema';
import { NameIdType } from '@/types';
import { noticeStatusList } from '@/constants';

export type Section = {
  [key: number]: NameIdType[];
};

export type Notice = {
  id: number;
  title: string;
  description?: string;
  author: string;
  statusId: string;
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

export type RecipientListData = z.infer<typeof RecipientDetailSchema>[];

export type RecipientResponse = {
  noticeRecipients: RecipientListData;
};
export type NoticeFormPropsWithId = NoticeFormProps & { id: string };

export type NoticeData = {
  notices: Notice[];
};

export type NoticeStatusType = (typeof noticeStatusList)[number]['id'];
export type ReviewNotice = {
  id: number;
  status: NoticeStatusType;
};

export type NoticeRecipient = z.infer<typeof NoticeRecipientSchema>;
export type NoticeRecipientWithId = NoticeRecipient & { id: number };
export type NoticeRecipientWithIdAndRoleName = NoticeRecipient & { id: number; roleName: string };
export type RecipientData = {
  noticeRecipients: NoticeRecipientWithIdAndRoleName[];
};
