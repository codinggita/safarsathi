import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchTrips = createAsyncThunk(
  "trips/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      const res = await API.get("/trips", { params });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTripById = createAsyncThunk(
  "trips/fetchById",
  async (tripId, thunkAPI) => {
    try {
      const res = await API.get(`/trips/${tripId}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createTrip = createAsyncThunk(
  "trips/create",
  async (tripData, thunkAPI) => {
    try {
      const res = await API.post("/trips", tripData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTrip = createAsyncThunk(
  "trips/update",
  async ({ tripId, tripData }, thunkAPI) => {
    try {
      const res = await API.put(`/trips/${tripId}`, tripData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTrip = createAsyncThunk(
  "trips/delete",
  async (tripId, thunkAPI) => {
    try {
      await API.delete(`/trips/${tripId}`);
      return tripId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tripSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    currentTrip: null,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearTripError: (state) => {
      state.error = null;
    },
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload.data;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTripById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTrip = action.payload;
      })
      .addCase(fetchTripById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.unshift(action.payload);
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.trips[index] = action.payload;
        if (state.currentTrip?._id === action.payload._id) state.currentTrip = action.payload;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTripError, clearCurrentTrip } = tripSlice.actions;
export default tripSlice.reducer;
