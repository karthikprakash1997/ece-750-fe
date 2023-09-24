import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  categoriesList: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'filter/fetchCategories',
  async () => {
    const response = await fetch(
      `https://dev-api-nrcan.esg.uwaterloo.ca/api/filter/categories`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;

  },
);

// Create a slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categoriesList = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const categoriesActions = {
  ...categoriesSlice.actions,
  fetchCategories,
};

export default categoriesSlice.reducer;
