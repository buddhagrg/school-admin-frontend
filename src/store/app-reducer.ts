import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../api';
import { authReducer } from '@/app/auth/auth-slice';

export const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer
});
