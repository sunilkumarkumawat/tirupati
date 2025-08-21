// src/redux/slices/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk for fetching appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async ({ API_BASE_URL, token }) => {
    const response = await axios.post(
      `${API_BASE_URL}/getAppointments`,
      {}, // 👈 If API requires payload, pass it here
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data?.data || [];
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // If you want to add extra reducers later (like addAppointment, deleteAppointment, etc.)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
