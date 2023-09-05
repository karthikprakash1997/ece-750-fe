import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../utils/helpers/common'; // Assuming you have your API utility function

const initialState = {
  isMapTopologyFetching: false,
  mapTopology: {},
  isMapTopologyError: false,
  error: null,
};

// Async thunk for fetching map topology data
export const fetchMapTopologyData = createAsyncThunk(
  'overview/fetchMapTopologyData',
  async () => {
    try {
      const response = await apiCall({
        url: 'https://code.highcharts.com/mapdata/custom/world.topo.json',
        action: 'GET',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapTopologyData.pending, (state) => {
        state.isMapTopologyFetching = true;
        state.isMapTopologyError = false;
        state.error = null;
      })
      .addCase(fetchMapTopologyData.fulfilled, (state, action) => {
        state.isMapTopologyFetching = false;
        state.mapTopology = action.payload;
        state.isMapTopologyError = false;
        state.error = null;
      })
      .addCase(fetchMapTopologyData.rejected, (state, action) => {
        state.isMapTopologyFetching = false;
        state.isMapTopologyError = true;
        state.error = action.error.message;
      });
  },
});

export const overviewActions = {
  ...overviewSlice.actions,
  fetchMapTopologyData,
};

export default overviewSlice.reducer;
