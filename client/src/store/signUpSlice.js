import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../Lib/customFetch";

export const createUser = createAsyncThunk(
  "signUpSlice/createUser",
  async (userData) =>
    await customFetch("signUp", "POST", userData, {
      "Content-Type": "application/x-www-form-urlencoded",
    })
);

export const signUpSlice = createSlice({
    name: "signUpSlice",
    initialState: {
        error: null,
        loading: false,
        isSignedUp: false,        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isSignedUp = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error.message;
            });
    }
});

export const signUpReducer = signUpSlice.reducer;
export const { } = signUpSlice.actions;