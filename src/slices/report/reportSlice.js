import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  queryOne: [],
  isLoading: false,
  isError: false,
  error: null,
};


export const fetchQueryOneData = createAsyncThunk(
  'overview/fetchMapData',
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join('&');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/report/queryOne?${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch map dara');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryOneData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchQueryOneData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.queryOne = action.payload.data;
      })
      .addCase(fetchQueryOneData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const reportActions = {
  ...reportSlice.actions,
  fetchQueryOneData,
};

export default reportSlice.reducer;
