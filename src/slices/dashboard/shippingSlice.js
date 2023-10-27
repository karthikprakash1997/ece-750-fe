import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  shippingData: [],
  stats: {},
  isLoading: false,
  isError: false,
  error: null,
};

// Create a thunk action for fetching countries
export const fetchShippingData = createAsyncThunk(
  "dashboard/shipping",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/shipping?${queryString}`,
      );

      // const response = await fetch("http://127.0.0.1:5000/api/shipping?countryCode=[\"JP\", \"TW\"]&categoryHierarchy=[\"Magnetics/Transformers/Telecom Transformers\", \"Magnetics/Transformers/Current Transformers\",\"RF and Microwave/RF ICs/Up-Down Converters and Mixers\"]");

      // const response = await fetch("https://dev-api-nrcan.esg.uwaterloo.ca/api/overview?countryCode=[\"JP\", \"TW\"]&categoryHierarchy=[\"Magnetics/Transformers/Telecom Transformers\", \"Magnetics/Transformers/Current Transformers\",\"RF and Microwave/RF ICs/Up-Down Converters and Mixers\"]");
      if (!response.ok) {
        throw new Error("Failed to fetch shipping dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

// Create a slice
const shippingDataSlice = createSlice({
  name: "shippingData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchShippingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.shippingData = action.payload.results;
        state.stats = action.payload.stats;
      })
      .addCase(fetchShippingData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const shippingDataActions = {
  ...shippingDataSlice.actions,
  fetchShippingData,
};

export default shippingDataSlice.reducer;
