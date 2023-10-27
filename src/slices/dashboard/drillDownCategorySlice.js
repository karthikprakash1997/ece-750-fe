import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  categoryDrillDownData: [],
  stats: {},
  isLoading: false,
  isError: false,
  error: null,
};

// Create a thunk action for fetching countries
export const fetchCategoryDrillDownData = createAsyncThunk(
  "dashboard/drilldown/category",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/drilldown/category`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category drilldown data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

// Create a slice
const categoryDrillDownDataSlice = createSlice({
  name: "categoryDrillDownData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryDrillDownData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchCategoryDrillDownData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categoryDrillDownData = action.payload.results;
        state.stats = action.payload.stats;
      })
      .addCase(fetchCategoryDrillDownData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const categoryDrillDownDataActions = {
  ...categoryDrillDownDataSlice.actions,
  fetchCategoryDrillDownData,
};

export default categoryDrillDownDataSlice.reducer;
