import { api } from "@/app/api";
import { Tag } from "@/app/tag-types";
import { NoticeData, NoticeDetailProps, NoticeFormProps, NoticeFormPropsWithId, RecipientResponse, ReviewNotice } from "../types";

export const noticeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNotices: builder.query<NoticeData, void>({
            query: () => `/notices`,
            providesTags: (result) => result?.notices?.map(({ id }) => {
                return { type: Tag.NOTICES, id }
            }) || [{ type: Tag.NOTICES }]
        }),
        getNoticeDetail: builder.query<NoticeDetailProps, string | undefined>({
            query: (id) => `/notices/${id}`,
            providesTags: (result) => result ? [{ type: Tag.NOTICES, id: result.id }] : []
        }),
        getMyNotices: builder.query<NoticeData, void>({
            query: () => `/notices/me`,
            providesTags: (result) => result?.notices?.map(({ id }) => {
                return { type: Tag.NOTICES, id }
            }) || [{ type: Tag.NOTICES }]
        }),
        getNoticeRecipients: builder.query<RecipientResponse, void>({
            query: () => `/notices/recipients`,
            providesTags: (result) => result?.noticeRecipients?.map(({ id }) => {
                return { type: Tag.NOTICE_RECIPIENTS, id }
            }) || [{ type: Tag.NOTICE_RECIPIENTS }]
        }),
        addNotice: builder.mutation<{ message: string }, NoticeFormProps>({
            query: (payload) => ({
                url: `/notices`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: [Tag.NOTICES]
        }),
        updateNotice: builder.mutation<{ message: string }, NoticeFormPropsWithId>({
            query: ({ id, ...payload }) => ({
                url: `/notices/${id}`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: (result, error, { id }) => [{ type: Tag.NOTICES, id }]
        }),
        handleNoticeStatus: builder.mutation<{ message: string }, ReviewNotice>({
            query: ({ id, status }) => ({
                url: `/notices/${id}/status`,
                method: "POST",
                body: { status }
            }),
            invalidatesTags: (result, error, { id }) => [{ type: Tag.NOTICES, id }]
        }),
    }),
});

export const {
    useGetNoticesQuery,
    useLazyGetNoticesQuery,
    useGetNoticeDetailQuery,
    useGetMyNoticesQuery,
    useLazyGetNoticeRecipientsQuery,
    useAddNoticeMutation,
    useUpdateNoticeMutation,
    useHandleNoticeStatusMutation,
} = noticeApi;