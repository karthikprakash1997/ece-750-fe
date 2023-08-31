import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMapTopologyFetching: false,
  mapTopology: {},
  isMapTopologyError: false,
  error: null,
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    mapTopologyRequest: (state) => {
      state.isMapTopologyFetching = true;
      state.isMapTopologyError = false;
      state.error = null;
    },
    mapTopologyResponse: (state, action) => {
      state.isMapTopologyFetching = false;
      state.mapTopology = action.payload.data;
      state.isMapTopologyError = false;
      state.error = null;
    },
    mapTopologyRequestFail: (state, action) => {
      state.isMapTopologyFetching = false;
      state.isMapTopologyError = true;
      state.error = action.payload.error;
    },
  },
});

export const overviewActions = overviewSlice.actions;
export default overviewSlice.reducer;
