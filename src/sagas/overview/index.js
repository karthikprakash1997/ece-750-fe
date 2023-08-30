import { takeEvery, put } from 'redux-saga/effects';

import * as types from '../../actions/action-types';
import { mapTopologyResponse, mapTopologyRequestFail } from '../reducers/overviewSlice';
import { apiCall } from '../../utils/common';

function* getOverviewMAPData() {
  try {
    const response = yield apiCall({
      url: 'https://code.highcharts.com/mapdata/custom/world.topo.json',
      action: 'GET'
    });
    yield put(mapTopologyResponse({ ...response }));
  } catch (error) {
    yield put(mapTopologyRequestFail('Something went wrong'));
  }
}

export function* takeOverviewDataRequest() {
  //   yield takeEvery(types.GET_OVERVIEW_REQUEST, getOverviewData);
  yield takeEvery(types.MAP_TOPOLOGY_REQUEST, getOverviewMAPData);
}
