import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from "./slices/appointmentSlice";
import dynamicSelectReducer from "./slices/dynamicSelectSlice";


const store = configureStore({
  reducer: {
    appointments: appointmentReducer, // ✅ must match slice
    dynamicSelect: dynamicSelectReducer,
  },
});

export default store;