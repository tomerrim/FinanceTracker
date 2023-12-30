import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../Lib/customFetch";

export const fetchUser = createAsyncThunk(
  "userSlice/fetchUser",
  async (userData, { rejectWithValue }) => {
    try {
      if (userData.email && userData.password) {
        const response = await customFetch("signIn", "POST", userData, {
          "Content-Type": "application/x-www-form-urlencoded",
        });
        console.log("fetch user response: ", response);
        return response;
      }
    } catch (error) {
      return rejectWithValue({error: error.message});
    }
  }
);

export const addNewExpense = createAsyncThunk(
  "userSlice/addExpense",
  async ( { userId, expense }, { rejectWithValue }) => {
    try {
      return await customFetch(`${userId}/addExpense`, "POST", expense, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
    } catch (error) {
      return rejectWithValue({error: error.message})
    }
  }
)

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    error: null,
    user: null,
    payments: [],
  },
  reducers: {
    addExpense(state, action) {
      state.payments = [...state.payments, action.payload];
    }, 
    updatePayments(state, action) {
      state.payments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.message;
    })
    .addCase(addNewExpense.fulfilled, (state, action) => {})
  }
});

export const userSliceReducer = userSlice.reducer;
export const { addExpense, updatePayments } = userSlice.actions;