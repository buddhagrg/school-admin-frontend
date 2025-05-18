import { z } from 'zod';
import { NoticeFilterSchema, NoticeFormSchema, RecipientTypes } from './notice-schema';
import type { NameIdType } from '@/shared/types';
import { NOTICE_STATUS_LIST } from '../constant';

export type RecipientTypeProps = (typeof RecipientTypes)[number];
export type NoticeFormProps = z.infer<typeof NoticeFormSchema>;
export type NoticeFormPropsWithId = NoticeFormProps & { id: number };
export type Notice = {
  id: number;
  title: string;
  description: string;
  author: string;
  statusId: string;
  status: string;
  recipientType: RecipientTypeProps;
  recipientRole: string | number;
  recipientFirstField: string | number;
  authorId: number; //needed for checking delete/edit action
  publishedDate: Date | null;
  createdDate: Date;
  updatedDate: Date | null;
  reviewerName: string;
  reviewedDate: Date | null;
  audience: string;
};

export type NoticeData = {
  notices: Notice[];
};
type RecipientDetail = {
  id: number;
  name: string;
  primaryDependents: {
    name: string;
    list: NameIdType[];
  };
};
export type RecipientResponse = {
  noticeRecipients: RecipientDetail[];
};
export type NoticeStatusCode = (typeof NOTICE_STATUS_LIST)[number]['code'];
export type ReviewNoticeRequest = {
  id: number;
  status: NoticeStatusCode;
};
export type NoticeFilterProps = z.infer<typeof NoticeFilterSchema>;
