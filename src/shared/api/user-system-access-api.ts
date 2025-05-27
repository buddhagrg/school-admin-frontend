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
      invalidatesTags: (_result, _error, { userId: id, entity }) =>
        entity === 'students'
          ? [
              { type: Tag.STUDENTS, id },
              { type: Tag.STUDENTS, id: Tag.LIST },
              { type: Tag.STUDENT_DETAIL, id }
            ]
          : [
              { type: Tag.STAFF, id },
              { type: Tag.STAFF, id: Tag.LIST },
              { type: Tag.STAFF_DETAIL, id }
            ]
    })
  })
});

export const { useUpdateUserSystemAccessMutation } = userSystemAccessApi;
