import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionalConflict from "../../utils/helpers/regionalConflict.json";

// Define the initial state
const initialState = {
  queryOne: {
    country: "Argentina",
    country_code: "AR",
    latitude: -34.9964963,
    longitude: -64.9672817,
  },
  queryTwo: {
    country: "Argentina",
    country_code: "AR",
    latitude: -34.9964963,
    longitude: -64.9672817,
  },
  queryFive: regionalConflict[0],
  queryTwoBN: 20,
  queryThreeBN: 80,
  queryFourBN: 90,
  queryFiveBN: 90,
  queryOneTitle: "",
  queryTwoTitle: "",
  queryThreeTitle: "",
  queryFourTitle: "",
  queryFiveTitle: "",
  queryOneData: [],
  queryTwoData: [],
  queryThreeData: [],
  queryFourData: [],
  queryFiveData: [],
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
  isLoadingQ5: false,
  isErrorQ5: false,
  errorQ5: null,
};

export const fetchQueryOneData = createAsyncThunk(
  "report/queryOne",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryOne?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQueryTwoData = createAsyncThunk(
  "report/queryTwo",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryTwo?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQueryThreeData = createAsyncThunk(
  "report/queryThree",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryThree?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQueryFourData = createAsyncThunk(
  "report/queryFour",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryFour?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQueryFiveData = createAsyncThunk(
  "report/queryFive",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/report/queryFive?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch map dara");
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
  name: "reportQueryOne",
  initialState,
  reducers: {
    setQueryOne: (state, action) => {
      state.queryOne = action.payload;
    },
    setQueryTwo: (state, action) => {
      state.queryTwo = action.payload;
    },
    setQueryFive: (state, action) => {
      state.queryFive = action.payload;
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
    setQueryFiveBN: (state, action) => {
      state.queryFiveBN = action.payload;
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
        state.queryOneTitle = `If we lost access to ${state.queryOne.country} as a supplier, the following categories will be affected.`;
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
        state.queryTwoTitle = `If we lost access to ${state.queryTwo.country} as a supplier, the following countries are the alternatives with ${state.queryTwoBN}% global production`;
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
        state.queryFourTitle = `Countries that create a part bottleneck at ${state.queryFourBN}% global production.`;
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
        state.queryThreeTitle = `Most vulnerable categories with each listed country
          having more than ${state.queryThreeBN}% global production in the selected category`;
      })
      .addCase(fetchQueryThreeData.rejected, (state, action) => {
        state.isLoadingQ3 = false;
        state.isErrorQ3 = true;
        state.errorQ3 = action.error.message;
      })
      .addCase(fetchQueryFiveData.pending, (state) => {
        state.isLoadingQ5 = true;
        state.isErrorQ5 = false;
        state.errorQ5 = null;
      })
      .addCase(fetchQueryFiveData.fulfilled, (state, action) => {
        state.isLoadingQ5 = false;
        state.isErrorQ5 = false;
        state.queryFiveData = action.payload.result;
        state.queryFiveTitle = `
        Categories that are affected by at least
        ${state.queryFiveBN}% if neighbouring countries
${state.queryFive.countries}
 become unavailable`;
      })
      .addCase(fetchQueryFiveData.rejected, (state, action) => {
        state.isLoadingQ5 = false;
        state.isErrorQ5 = true;
        state.errorQ5 = action.error.message;
      });
  },
});

export const reportActions = {
  ...reportSlice.actions,
  fetchQueryOneData,
  fetchQueryTwoData,
  fetchQueryFiveData,
  fetchQueryFourData,
  fetchQueryThreeData,
};

export default reportSlice.reducer;
// inputString.replace(/ /g, '-').replace(/[A-Z]/g, (match) => match.toLowerCase())
