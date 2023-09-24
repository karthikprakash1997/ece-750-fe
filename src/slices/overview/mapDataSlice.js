import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  mapData: [],
  stats: {},
  isLoading: false,
  isError: false,
  error: null,
};

// Create a thunk action for fetching countries
export const fetchMapData = createAsyncThunk(
  'overview/fetchMapData',
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join('&');
      const response = await fetch(
        `https://dev-api-nrcan.esg.uwaterloo.ca/api/overview?${queryString}`,
      );
      // const response = await fetch("https://dev-api-nrcan.esg.uwaterloo.ca/api/overview?countryCode=[\"JP\", \"TW\"]&categoryHierarchy=[\"Magnetics/Transformers/Telecom Transformers\", \"Magnetics/Transformers/Current Transformers\",\"RF and Microwave/RF ICs/Up-Down Converters and Mixers\"]");
      if (!response.ok) {
        throw new Error('Failed to fetch map dara');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

// Create a slice
const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.mapData = action.payload.results;
        state.stats = action.payload.stats;
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const mapDataActions = {
  ...mapDataSlice.actions,
  fetchMapData,
};

export default mapDataSlice.reducer;
