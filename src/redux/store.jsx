import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from "./slices/appointmentSlice";


const store = configureStore({
  reducer: {
      appointments: appointmentReducer, // ✅ must match slice
  },
});

export default store;