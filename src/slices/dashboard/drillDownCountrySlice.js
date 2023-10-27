import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  countryDrillDownData: [],
  stats: {},
  isLoading: false,
  isError: false,
  error: null,
};

// Create a thunk action for fetching countries
export const fetchCountryDrillDownData = createAsyncThunk(
  "dashboard/drilldown/country",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/drilldown/country`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch country drilldown data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

// Create a slice
const countryDrillDownDataSlice = createSlice({
  name: "countryDrillDownData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryDrillDownData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchCountryDrillDownData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.countryDrillDownData = action.payload.results;
        state.stats = action.payload.stats;
      })
      .addCase(fetchCountryDrillDownData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const countryDrillDownDataActions = {
  ...countryDrillDownDataSlice.actions,
  fetchCountryDrillDownData,
};

export default countryDrillDownDataSlice.reducer;
