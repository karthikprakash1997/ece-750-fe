import {
  configureStore,
  getDefaultMiddleware,
  // combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import overviewReducer from '../slices/overview/overviewSlice';
import countriesReducer from '../slices/filter/countriesSlice';
import categoriesReducer from '../slices/filter/categoriesSlice';
import mapDataReducer from '../slices/overview/mapDataSlice';
// import anotherReducer from '../slices/another'; // Import your other reducer

const persistConfig = {
  key: 'root',
  storage,
  // You can configure any other options here
};

// const persistedOverviewReducer = persistReducer(persistConfig, overviewReducer);
// const persistedMapDataReducer = persistReducer(persistConfig, mapDataReducer);
const persistedCountriesReducer = persistReducer(
  persistConfig,
  countriesReducer,
);
const persistedCategoriesReducer = persistReducer(
  persistConfig,
  categoriesReducer,
);
// const persistedAnotherReducer = persistReducer(persistConfig, anotherReducer);

const rootReducer = {
  overview: overviewReducer,
  mapData: mapDataReducer,
  countries: persistedCountriesReducer,
  categories: persistedCategoriesReducer,
  // another: persistedAnotherReducer,
  // Add more persisted reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: [...getDefaultMiddleware(), logger], // Include logger middleware
});

const persistor = persistStore(store);

export { store, persistor };
