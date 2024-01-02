import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { signUpReducer } from "./signUpSlice";
import { userSliceReducer } from "./userSlice";
import { expenseMiddleware } from "../Lib/middlewares";

const rootReducer = combineReducers({
    signUpSlice: signUpReducer,
    userSlice: userSliceReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), expenseMiddleware],
});
