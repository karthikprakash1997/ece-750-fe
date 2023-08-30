import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../slices/loginSlice';
import overviewReducer from '../slices/overviewSlice';

const appReducer = combineReducers({
  login: loginReducer,
  overview: overviewReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'users/LOGOUT_RESPONSE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
