import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  name: "",
  age: "",
  location: "",
  educationalStatus: "",
  employmentStatus: "",
  maritalStatus: "",
  residence:"",
  emotions: [],
  sex: "",
  race: "",
  prompt: "",
  feedback: "",
  sugg: "",
  finalFeed:[],
  isLoading: false,
  isError: false,
  error: null,
};

// Create a thunk action for fetching countries
export const fetchSuggestions = createAsyncThunk(
  "api/suggestions",
  async (queryParams) => {
    try {
      const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
        .join("&");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/suggestions?${queryString}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category drilldown data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchFeedback = createAsyncThunk("api/feedback", async (queryParams) => {
  try {
    const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${JSON.stringify(queryParams[key])}`)
    .join("&");
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/feedback?${queryString}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch category drilldown data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// Create a slice
const categoryDrillDownDataSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setState: (state, action) => {
      state[`${action.payload.key}`] = action.payload.value;
    },
    setFeedback:(state, action)=>{
        state.finalFeed = [...state.finalFeed, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sugg = action.payload.results;
        state.stats = action.payload.stats;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(fetchFeedback.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sugg = action.payload.results;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const categoryDrillDownDataActions = {
  ...categoryDrillDownDataSlice.actions,
  fetchFeedback,
  fetchSuggestions,
};

export default categoryDrillDownDataSlice.reducer;
