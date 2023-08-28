import { createAction } from '../../utils/common';
import * as actionTypes from '../action-types';

// ACCOUNT SWITCHER
export const mapTopologyRequest = () => createAction(actionTypes.MAP_TOPOLOGY_REQUEST);
export const mapTopologyResponse = (data) => createAction(actionTypes.MAP_TOPOLOGY_RESPONSE, data);
export const mapTopologyRequestFail = (error) => createAction(actionTypes.MAP_TOPOLOGY_REQUEST_FAIL, error);
