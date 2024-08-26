import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "@/domains/auth/slice/auth-slice";
import menuSlice from "@/domains/role-and-permission/slice/menu-slice";

export const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    menu: menuSlice
});
