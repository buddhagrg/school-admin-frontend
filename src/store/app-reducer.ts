import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/auth-slice';
import { baseApi } from '@/api';

export const appReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer
});
