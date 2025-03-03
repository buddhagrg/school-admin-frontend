import { api, Tag } from '@/api';
import { AcademicLevelsWithClasses, AddClassToAcademicLevel } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const levelsClassesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevelsWithClasses: builder.query<AcademicLevelsWithClasses, void>({
      query: () => `/academic/levels/classes`,
      providesTags: (result) =>
        result?.levelsWithClasses.map(({ id }) => {
          return { type: Tag.ACADEMIC_LEVELS_WITH_CLASSES, id };
        }) || [Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    deleteLevelFromClass: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/academic/levels/classes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS_WITH_CLASSES])
    }),
    addClassToAcademicLevel: builder.mutation<ApiResponseSuccessMessage, AddClassToAcademicLevel>({
      query: ({ classId, academicLevelId }) => ({
        url: `/academic/levels/${academicLevelId}/classes`,
        method: 'PUT',
        body: { classId }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS_WITH_CLASSES])
    })
  })
});

export const {
  useGetAcademicLevelsWithClassesQuery,
  useDeleteLevelFromClassMutation,
  useAddClassToAcademicLevelMutation
} = levelsClassesApi;
