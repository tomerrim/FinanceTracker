import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../Lib/customFetch";

export const fetchUser = createAsyncThunk(
  "userSlice/fetchUser",
  async (userData) =>{
    if (userData.email && userData.password) {
      return await customFetch("signIn", "POST", userData, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    payments: [],
  },
  reducers: {
    addExpense(state, action) {
        state.payments.push(action.payload);
    }
  },
});

export const userSliceReducer = userSlice.reducer;
export const { addExpense } = userSlice.actions;