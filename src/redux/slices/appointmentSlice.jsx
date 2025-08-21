import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching paginated appointments
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async ({ page, limit, search, filters, API_BASE_URL, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/getAppointments`,
        { page, limit, search, filters },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {
        data: response.data?.data || [],
        total: response.data?.total || 0
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    data: [],
    total: 0,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // Clear error state if needed
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = appointmentSlice.actions;
export default appointmentSlice.reducer;