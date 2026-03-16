import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tripReducer from "./tripSlice";
import activityReducer from "./activitySlice";
import expenseReducer from "./expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    trips: tripReducer,
    activities: activityReducer,
    expenses: expenseReducer,
  },
});

export default store;
