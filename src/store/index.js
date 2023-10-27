import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import overviewReducer from "../slices/overview/overviewSlice";
import countriesReducer from "../slices/filter/countriesSlice";
import categoriesReducer from "../slices/filter/categoriesSlice";
import mapDataReducer from "../slices/overview/mapDataSlice";
import reportReducer from "../slices/report/reportSlice";
import shippingReducer from "../slices/dashboard/shippingSlice";
import categoryDrillDownReducer from "../slices/dashboard/drillDownCategorySlice";
import countryDrillDownReducer from "../slices/dashboard/drillDownCountrySlice";

// import anotherReducer from '../slices/another'; // Import your other reducer

const persistConfig = {
  key: "root",
  storage,
  // You can configure any other options here
};

const persistedOverviewReducer = persistReducer(persistConfig, overviewReducer);
// const persistedMapDataReducer = persistReducer(persistConfig, mapDataReducer);
const persistedCountriesReducer = persistReducer(
  persistConfig,
  countriesReducer,
);
const persistedCategoriesReducer = persistReducer(
  persistConfig,
  categoriesReducer,
);
const persistedReportReducer = persistReducer(persistConfig, reportReducer);
const persistedShippingReducer = persistReducer(persistConfig, shippingReducer);
const persistedCategoryDrillDownReducer = persistReducer(
  persistConfig,
  categoryDrillDownReducer,
);
const persistedCountryDrillDownReducer = persistReducer(
  persistConfig,
  countryDrillDownReducer,
);

// const persistedAnotherReducer = persistReducer(persistConfig, anotherReducer);

const rootReducer = combineReducers({
  overview: persistedOverviewReducer,
  mapData: mapDataReducer,
  countries: persistedCountriesReducer,
  categories: persistedCategoriesReducer,
  report: persistedReportReducer,
  shipping: persistedShippingReducer,
  categoryDrillDown: persistedCategoryDrillDownReducer,
  countryDrillDown: persistedCountryDrillDownReducer,
  // another: persistedAnotherReducer,
  // Add more persisted reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: [...getDefaultMiddleware(), logger], // Include logger middleware
});

const persistor = persistStore(store);

export { store, persistor };
