import { api, Tag } from '@/api';
import {
  NoticeData,
  NoticeDetailProps,
  NoticeFormProps,
  NoticeFormPropsWithId,
  RecipientResponse,
  ReviewNotice
} from './types';
import { ApiResponseSuccessMessage } from '@/types';

const noticeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<NoticeData, void>({
      query: () => `/notices`,
      providesTags: (result) =>
        result?.notices?.map(({ id }) => {
          return { type: Tag.NOTICES, id };
        }) || [{ type: Tag.NOTICES }]
    }),
    getAllPendingNotices: builder.query<NoticeData, void>({
      query: () => `/notices/pending`,
      providesTags: (_result, error) => (error ? [] : [Tag.PENDING_NOTICES])
    }),
    getNoticeDetail: builder.query<NoticeDetailProps, string | undefined>({
      query: (id) => `/notices/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.NOTICES, id: result.id }] : [])
    }),
    addNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormProps>({
      query: (payload) => ({
        url: `/notices`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES, Tag.PENDING_NOTICES])
    }),
    updateNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/notices/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.NOTICES, id }, { type: Tag.PENDING_NOTICES }]
    }),
    updateNoticeStatus: builder.mutation<ApiResponseSuccessMessage, ReviewNotice>({
      query: ({ id, status }) => ({
        url: `/notices/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES, Tag.PENDING_NOTICES])
    }),
    getNoticeRecipients: builder.query<RecipientResponse, void>({
      query: () => `/notices/recipients`,
      providesTags: (result) =>
        result?.noticeRecipients?.map(({ id }) => {
          return { type: Tag.NOTICE_RECIPIENT_LIST, id };
        }) || [{ type: Tag.NOTICE_RECIPIENT_LIST }]
    })
  })
});

export const {
  useGetNoticesQuery,
  useGetNoticeDetailQuery,
  useGetNoticeRecipientsQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useUpdateNoticeStatusMutation,
  useGetAllPendingNoticesQuery
} = noticeApi;
