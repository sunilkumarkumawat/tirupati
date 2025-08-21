// store/dynamicSelectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  const API_BASE_URL = import.meta.env.VITE_API_URL;
// Async fetch options per column
export const fetchOptions = createAsyncThunk(
  "dynamicSelect/fetchOptions",
  async (columnName) => {
    const res = await fetch(`${API_BASE_URL}/getOptions?column=${columnName}`);
    const data = await res.json();
    return { columnName, options: data.slice(0, 20) }; // slice first 20
  }
);

const dynamicSelectSlice = createSlice({
  name: "dynamicSelect",
  initialState: {
    options: {},        // { gender: [...], payment_mode: [...] }
    loading: {},        // { gender: true/false }
    selectedFilters: {} // { gender: 'Male', payment_mode: 'Card' }
  },
  reducers: {
    setSelectedFilter: (state, action) => {
      const { column, value } = action.payload;
      state.selectedFilters[column] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.pending, (state, action) => {
        const col = action.meta.arg;
        state.loading[col] = true;
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        const { columnName, options } = action.payload;
        state.options[columnName] = options;
        state.loading[columnName] = false;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        const col = action.meta.arg;
        state.loading[col] = false;
      });
  },
});

export const { setSelectedFilter } = dynamicSelectSlice.actions;
export default dynamicSelectSlice.reducer;
