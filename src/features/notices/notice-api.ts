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
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<NoticeData, NoticeFilterProps | void>({
      query: (payload) => {
        const query = getQueryString(payload);
        return `/notices${query}`;
      },
      providesTags: (result) => providesListTags(result?.notices, Tag.NOTICES)
    }),
    addNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormProps>({
      query: (payload) => ({
        url: `/notices`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.NOTICES }]
    }),
    updateNotice: builder.mutation<ApiResponseSuccessMessage, NoticeFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/notices/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.NOTICES, id },
        { type: Tag.NOTICES, id: Tag.LIST }
      ]
    }),
    reviewNoticeStatus: builder.mutation<ApiResponseSuccessMessage, ReviewNoticeRequest>({
      query: ({ id, status }) => ({
        url: `/notices/${id}/review`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.NOTICES, id },
        { type: Tag.NOTICES, id: Tag.LIST }
      ]
    }),
    publishNotice: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/notices/${id}/publish`,
        method: 'PATCH'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tag.NOTICES, id },
        { type: Tag.NOTICES, id: Tag.LIST }
      ]
    }),
    deleteNotice: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tag.NOTICES, id },
        { type: Tag.NOTICES, id: Tag.LIST }
      ]
    }),
    getNoticeRecipients: builder.query<RecipientResponse, void>({
      query: () => `/notices/recipients`,
      providesTags: (result) =>
        providesListTags(result?.noticeRecipients, Tag.NOTICE_RECIPIENT_LIST)
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
