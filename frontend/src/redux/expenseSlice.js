import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchByTrip",
  async (tripId, thunkAPI) => {
    try {
      const res = await API.get(`/expenses/${tripId}`);
      return { expenses: res.data.data, totalSpent: res.data.totalSpent };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/create",
  async (expenseData, thunkAPI) => {
    try {
      const res = await API.post("/expenses", expenseData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ expenseId, expenseData }, thunkAPI) => {
    try {
      const res = await API.put(`/expenses/${expenseId}`, expenseData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (expenseId, thunkAPI) => {
    try {
      await API.delete(`/expenses/${expenseId}`);
      return expenseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const recalcTotal = (expenses) => expenses.reduce((sum, e) => sum + e.amount, 0);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalSpent: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearExpenseError: (state) => {
      state.error = null;
    },
    clearExpenses: (state) => {
      state.expenses = [];
      state.totalSpent = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.totalSpent = action.payload.totalSpent;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload);
        state.totalSpent = recalcTotal(state.expenses);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.expenses[index] = action.payload;
        state.totalSpent = recalcTotal(state.expenses);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((e) => e._id !== action.payload);
        state.totalSpent = recalcTotal(state.expenses);
      });
  },
});

export const { clearExpenseError, clearExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
