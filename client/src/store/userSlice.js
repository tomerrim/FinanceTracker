import { createSlice } from "@reduxjs/toolkit";

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