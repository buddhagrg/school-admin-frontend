import { baseApi, Tag } from '@/api';
import type {
  NoticeData,
  NoticeFilterProps,
  NoticeFormProps,
  NoticeFormPropsWithId,
  RecipientResponse,
  ReviewNoticeRequest
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { getQueryString } from '@/utils/helpers/get-query-string';

const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<NoticeData, NoticeFilterProps | void>({
      query: (payload) => {
        const query = getQueryString(payload);
        return `/notices${query}`;
      },
      providesTags: (result) =>
        result?.notices?.map(({ id }) => {
          return { type: Tag.NOTICES, id };
        }) || [{ type: Tag.NOTICES }]
    }),
    addNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormProps>({
      query: (payload) => ({
        url: `/notices`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES])
    }),
    updateNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/notices/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.NOTICES, id }])
    }),
    reviewNoticeStatus: builder.mutation<ApiResponseSuccessMessage, ReviewNoticeRequest>({
      query: ({ id, status }) => ({
        url: `/notices/${id}/review`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES])
    }),
    publishNotice: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/notices/${id}/publish`,
        method: 'PATCH'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES])
    }),
    deleteNotice: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.NOTICES])
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
  useGetNoticeRecipientsQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useReviewNoticeStatusMutation,
  useDeleteNoticeMutation,
  usePublishNoticeMutation
} = noticeApi;
