import { combineReducers } from 'redux';

import {overviewReducer }from '../reducers'

const appReducer = combineReducers({
  login: {},
  overview: overviewReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'users/LOGOUT_RESPONSE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export { rootReducer };
