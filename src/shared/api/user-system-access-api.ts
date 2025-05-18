import { baseApi, Tag } from '@/api';
import type { ApiResponseSuccessMessage, UserSystemAccess } from '@/shared/types';

const userSystemAccessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserSystemAccess: builder.mutation<ApiResponseSuccessMessage, UserSystemAccess>({
      query: ({ hasSystemAccess, entity, userId }) => ({
        url: `/${entity}/${userId}/status`,
        method: 'PATCH',
        body: { hasSystemAccess }
      }),
      invalidatesTags: (_result, error, { userId: id, entity }) =>
        error ? [] : [{ type: entity === 'students' ? Tag.STUDENTS : Tag.STAFF, id }]
    })
  })
});

export const { useUpdateUserSystemAccessMutation } = userSystemAccessApi;
