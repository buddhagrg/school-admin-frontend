import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ApiResponseSuccessMessage } from '@/shared/types';

const unknownError: string = 'Unknown Error';

type Detail = {
  path: string;
  message: string;
};

type ErrorResponse = {
  message: string;
  detail?: Detail[];
  httpStatusCode?: number;
};

export const getErrorMsg = (
  error: FetchBaseQueryError | SerializedError | undefined
): ErrorResponse => {
  if (!error) {
    return { message: unknownError };
  }

  if ('status' in error) {
    const fetchError = error as FetchBaseQueryError;

    const apiError = fetchError.data as { error: string; detail: Detail[]; httpStatusCode: number };
    const httpStatusCode = fetchError.status as number;

    if (apiError?.error) {
      const { error, detail } = apiError;
      return { message: error, detail, httpStatusCode };
    }

    const errorMsg =
      'error' in fetchError
        ? fetchError.error
        : (fetchError.data as ApiResponseSuccessMessage)?.message || unknownError;
    return { message: errorMsg };
  }

  const serializedError = error as SerializedError;
  const errorMsg = serializedError?.message || unknownError;
  return { message: errorMsg };
};
