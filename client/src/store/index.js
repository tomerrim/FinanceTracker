import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { signUpReducer } from "./signUpSlice";

const rootReducer = combineReducers({
    signUpSlice: signUpReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
