import { Middleware } from "@reduxjs/toolkit";
import { persistor } from "./store";

export const purgeMiddleware: Middleware = (_store) => next => async (action: any) => {
    if (action.type === "auth/resetUser") {
        persistor.pause();
        await persistor.flush();
        await persistor.purge();
    } else if (action.type === "auth/setUser") {
        persistor.pause();
        await persistor.flush();
        await persistor.purge();
        persistor.persist();
    }
    return next(action);
};
