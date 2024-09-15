import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import { authReducer } from '@/domains/auth/slice';
import { menuReducer } from '@/domains/role-and-permission/slice';

export const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  menu: menuReducer
});
