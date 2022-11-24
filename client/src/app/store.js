import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../redux/features/dashboardSlice";
import Call from "../redux/features/callSlice";

export const store = configureStore({
  reducer: {
    dashboard: Dashboard,
    call: Call,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
