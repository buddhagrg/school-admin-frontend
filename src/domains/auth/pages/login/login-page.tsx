import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { LoginRequest, LoginSchema } from "../../types";
import { LoginForm } from "./login-form";
import { useLoginMutation } from "../../api/auth-api";
import { setUser } from "../../slice/auth-slice";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const methods = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });
    const [apiError, setApiError] = React.useState("");

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data: LoginRequest) => {
        try {
            const user = await login(data).unwrap();
            if (user) {
                dispatch(setUser({ user }));
                navigate("/app");
            }
        } catch (error) {
            const { detail, message } = getErrorMsg(error as FetchBaseQueryError | SerializedError);
            if (detail) {
                Object.entries(detail).map(([name, value]) =>
                    methods.setError(name as keyof LoginRequest, { type: "string", message: value })
                );
            } else {
                setApiError(message);
            }
        }
    }

    return (
        <Box
            component={Paper}
            sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                overflow: "auto",
                maxHeight: "calc(100vh - 40px)"
            }}>
            <Box
                sx={{
                    width: { xs: "300px", md: "400px" },
                    border: "1px solid #f3f6f999",
                    padding: "20px"
                }}
            >
                <Typography component="div" variant="h6">
                    Welcome!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Sign in to continue.
                </Typography>
                <LoginForm
                    methods={methods}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    isFetching={isLoading}
                />
                {
                    apiError &&
                    <Box>
                        <Typography sx={{ mt: 2, color: "red", fontSize: "15px" }}>{apiError}</Typography>
                    </Box>
                }
            </Box>
        </Box>
    );
}