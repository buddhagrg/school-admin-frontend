import { baseApi } from '@/api';
import type { ApiResponseSuccessMessage, UserSystemAccess } from '@/shared/types';

const userSystemAccessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserSystemAccess: builder.mutation<ApiResponseSuccessMessage, UserSystemAccess>({
      query: ({ hasSystemAccess, entity, userId }) => ({
        url: `/${entity}/:${userId}/status`,
        method: 'PATCH',
        body: { hasSystemAccess }
      })
    })
  })
});

export const { useUpdateUserSystemAccessMutation } = userSystemAccessApi;
