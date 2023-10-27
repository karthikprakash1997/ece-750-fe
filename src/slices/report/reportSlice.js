import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  queryOne: [],
  queryTwo: [],
  queryThree: [],
  queryFour: [],
  isLoadingQ1: false,
  isErrorQ1: false,
  errorQ1: null,
  isLoadingQ2: false,
  isErrorQ2: false,
  errorQ2: null,
  isLoadingQ3: false,
  isErrorQ3: false,
  errorQ3: null,
  isLoadingQ4: false,
  isErrorQ4: false,
  errorQ4: null,
};

export const fetchQueryOneData = createAsyncThunk(
  "report/queryOne",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryOne?${queryString}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchQueryTwoData = createAsyncThunk(
  "report/queryTwo",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryTwo?${queryString}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchQueryThreeData = createAsyncThunk(
  "report/queryThree",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryThree?${queryString}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchQueryFourData = createAsyncThunk(
  "report/queryFour",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryFour?${queryString}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

// Create a slice
const reportSlice = createSlice({
  name: "reportQueryOne",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryOneData.pending, (state) => {
        state.isLoadingQ1 = true;
        state.isErrorQ1 = false;
        state.errorQ1 = null;
      })
      .addCase(fetchQueryOneData.fulfilled, (state, action) => {
        state.isLoadingQ2 = false;
        state.isErrorQ1 = false;
        state.queryOne = action.payload.result || [];
      })
      .addCase(fetchQueryOneData.rejected, (state, action) => {
        state.isLoadingQ2 = false;
        state.isErrorQ1 = true;
        state.errorQ1 = action.error.message;
      })
      .addCase(fetchQueryTwoData.pending, (state) => {
        state.isLoadingQ2 = true;
        state.isErrorQ2 = false;
        state.errorQ2 = null;
      })
      .addCase(fetchQueryTwoData.fulfilled, (state, action) => {
        state.isLoadingQ2 = false;
        state.isErrorQ2 = false;
        state.queryTwo = action.payload.result;
      })
      .addCase(fetchQueryTwoData.rejected, (state, action) => {
        state.isLoadingQ2 = false;
        state.isErrorQ2 = true;
        state.errorQ2 = action.error.message;
      })
      .addCase(fetchQueryFourData.pending, (state) => {
        state.isLoadingQ4 = true;
        state.isErrorQ4 = false;
        state.errorQ4 = null;
      })
      .addCase(fetchQueryFourData.fulfilled, (state, action) => {
        state.isLoadingQ4 = false;
        state.isErrorQ4 = false;
        state.queryFour = action.payload.result;
      })
      .addCase(fetchQueryFourData.rejected, (state, action) => {
        state.isLoadingQ4 = false;
        state.isErrorQ4 = true;
        state.errorQ4 = action.error.message;
      })
      .addCase(fetchQueryThreeData.pending, (state) => {
        state.isLoadingQ3 = true;
        state.isErrorQ3 = false;
        state.errorQ3 = null;
      })
      .addCase(fetchQueryThreeData.fulfilled, (state, action) => {
        state.isLoadingQ3 = false;
        state.isErrorQ3 = false;
        state.queryThree = action.payload.result;
      })
      .addCase(fetchQueryThreeData.rejected, (state, action) => {
        state.isLoadingQ3 = false;
        state.isErrorQ3 = true;
        state.errorQ3 = action.error.message;
      });
  },
});

export const reportActions = {
  ...reportSlice.actions,
  fetchQueryOneData,
  fetchQueryTwoData,
  fetchQueryFourData,
  fetchQueryThreeData,
};

export default reportSlice.reducer;
