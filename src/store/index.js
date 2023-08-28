import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
// import { createBlacklistFilter, createWhitelistFilter } from 'redux-persist-transform-filter';
import localForage from 'localforage';
import { createStore, applyMiddleware } from 'redux';

// import { compileTimeEnv } from 'config';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'reduxPersistState',
  timeout: 0,
  storage: localForage,
//   whitelist: ['login', 'accountSwitcher', 'menuAccessiblity', 'revv'],
//   transforms: [
//     createBlacklistFilter('login', ['error', 'lastActiveDispatchType', 'isLogoutClicked']),
//     createBlacklistFilter('accountSwitcher', ['currentAccountOrFranchisor', 'isAccountFetching', 'error', 'isLocationSelectorFetching', 'locationSelectorError']),
//     createWhitelistFilter('revv', ['login'])
//   ]
};

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];

const pReducer = persistReducer(persistConfig, rootReducer);

/*
To disable logger add a false condition and remove it to enable it again.
ENABLED: (compileTimeEnv.REACT_APP_BUILD_TYPE !== 'PRODUCTION')
DISABLED: (compileTimeEnv.REACT_APP_BUILD_TYPE !== 'PRODUCTION' && false)
*/

// console.log(process.env)
// if (process.env.REACT_APP_BUILD_TYPE !== 'PRODUCTION') {
  const logger = createLogger();
  middleWare.push(logger);
// }

const store = createStore(pReducer, applyMiddleware(...middleWare));

const persistor = persistStore(store);

sagaMiddleWare.run(rootSaga);

export { store, persistor };
