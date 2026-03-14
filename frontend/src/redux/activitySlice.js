import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchActivities = createAsyncThunk(
  "activities/fetchByTrip",
  async (tripId, thunkAPI) => {
    try {
      const res = await API.get(`/activities/${tripId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createActivity = createAsyncThunk(
  "activities/create",
  async (activityData, thunkAPI) => {
    try {
      const res = await API.post("/activities", activityData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateActivity = createAsyncThunk(
  "activities/update",
  async ({ activityId, activityData }, thunkAPI) => {
    try {
      const res = await API.put(`/activities/${activityId}`, activityData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/delete",
  async (activityId, thunkAPI) => {
    try {
      await API.delete(`/activities/${activityId}`);
      return activityId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const activitySlice = createSlice({
  name: "activities",
  initialState: {
    activities: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearActivityError: (state) => {
      state.error = null;
    },
    clearActivities: (state) => {
      state.activities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
        state.activities.sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.activities.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.activities[index] = action.payload;
        state.activities.sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter((a) => a._id !== action.payload);
      });
  },
});

export const { clearActivityError, clearActivities } = activitySlice.actions;
export default activitySlice.reducer;
