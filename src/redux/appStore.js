import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { appReducer } from "./appReducer";

export const appStore = configureStore({
    reducer: {
        appReducer
    },
    middleware: function () {
        return [logger]
    }
})