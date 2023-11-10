import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  queryOne: "",
  queryTwo: "",
  queryTwoBN: 20,
  queryThreeBN: 80,
  queryFourBN: 90,
  queryOneTitle:"",
  queryTwoTitle:"",
  queryThreeTitle:"",
  queryFourTitle:"",
  queryOneData: [],
  queryTwoData: [],
  queryThreeData: [],
  queryFourData: [],
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
  reducers: {
    setQueryOne: (state, action) => {
      state.queryOne = action.payload;
    },
    setQueryTwo: (state, action) => {
      state.queryTwo = action.payload;
    },
    setQueryTwoBN: (state, action) => {
      state.queryTwoBN = action.payload;
    },
    setQueryThreeBN: (state, action) => {
      state.queryThreeBN = action.payload;
    },
    setQueryFourBN: (state, action) => {
      state.queryFourBN = action.payload;
    },
  },
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
        state.queryOneData = action.payload.result || [];
        state.queryOneTitle = `If we lost access to ${state.queryOne.country} as a supplier, the following categories will be effected.`
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
        state.queryTwoData = action.payload.result;
        state.queryTwoTitle = `If we lost access to ${state.queryTwo.country} as a supplier, the following countries are the safe alternatives`
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
        state.queryFourData = action.payload.result;
        state.queryFourTitle = `What countries create a part bottleneck at ${state.queryFourBN}% market share`
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
        state.queryThreeData = action.payload.result;
        state.queryThreeTitle = `What are the most vulnerable categories? (Each listed country
          having more than ${state.queryThreeBN}% global production in the selected category)`
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
// inputString.replace(/ /g, '-').replace(/[A-Z]/g, (match) => match.toLowerCase())