import * as types from '../../actions/action-types';

const initialState = {
    isMapTopologyFetching: false,
    mapTopology: {},
    isMapTopologyError: false,
    error: null
};

const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MAP_TOPOLOGY_REQUEST:
            return {
                ...state,
                isMapTopologyFetching: true,
                isMapTopologyError: false,
                error: null
            };
        case types.MAP_TOPOLOGY_RESPONSE:
            return {
                ...state,
                isMapTopologyFetching: false,
                mapTopology: action.payload.data,
                isMapTopologyError: false,
                error: null
            };
        case types.MAP_TOPOLOGY_REQUEST_FAIL:
            return {
                ...state,
                isMapTopologyFetching: false,
                isMapTopologyError: true,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export { overviewReducer };
