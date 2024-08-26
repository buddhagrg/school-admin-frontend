import { api } from "@/app/api";
import { LoginRequest, PasswordProps, SetupPasswordProps, User } from "../types";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginRequest>({
            query: (payload) => ({
                url: `/auth/login`,
                method: "POST",
                body: payload
            })
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/auth/logout`,
                method: "POST"
            })
        }),
        changePwd: builder.mutation<{ message: string }, PasswordProps>({
            query: (payload) => ({
                url: `/account/change-password`,
                method: "POST",
                body: payload
            })
        }),
        setupPassword: builder.mutation<{ message: string }, SetupPasswordProps>({
            query: (payload) => ({
                url: `/auth/setup-password`,
                method: "POST",
                body: payload
            })
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useChangePwdMutation,
    useSetupPasswordMutation,
} = authApi;