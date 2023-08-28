import { takeEvery, put } from 'redux-saga/effects';

import * as types from '../../actions/action-types';
import {
    mapTopologyResponse,
    mapTopologyRequestFail
} from '../../actions/modules';
import { apiCall } from '../../utils/common';


// function* getOverviewData() {
//   try {
//     const response = yield apiCall({ apiPath: 'overview', action: 'GET' });
//     //   yield put(accountSwitcherResponse({ ...response.data, userOwnership: requestDetails.payload.userOwnership, id: requestDetails.payload.id }));
//   } catch (error) {
//     // yield put(accountSwitcherRequestFail(MSG_ACC_SWITCHER_ERROR));
//   }
// }

function* getOverviewMAPData() {
    try {
        const response = yield apiCall({ url: 'https://code.highcharts.com/mapdata/custom/world.topo.json', action: 'GET' });
        yield put(mapTopologyResponse({ ...response }));
    } catch (error) {
        yield put(mapTopologyRequestFail('Something went wrong'));
    }
}

export function* takeOverviewDataRequest() {
    //   yield takeEvery(types.GET_OVERVIEW_REQUEST, getOverviewData);
    yield takeEvery(types.MAP_TOPOLOGY_REQUEST, getOverviewMAPData);

}
