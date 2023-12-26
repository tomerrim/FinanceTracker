import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { signUpReducer } from "./signUpSlice";
import { userSliceReducer } from "./userSlice";

const rootReducer = combineReducers({
    signUpSlice: signUpReducer,
    userSlice: userSliceReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
