import { all, fork } from 'redux-saga/effects';

import {
  takeOverviewDataRequest,
} from '../sagas';

function* rootSaga() {
  yield all([
    fork(takeOverviewDataRequest),
  ]);
}

export { rootSaga };
