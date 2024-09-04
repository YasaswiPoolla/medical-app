import { STATION_GETALL_SUCCESS, STATION_CREATE_SUCCESS, STATION_UPDATE_SUCCESS, STATION_DELETE_SUCCESS } from '../ActionTypes/TimeSlotsTypes';
import StationService from '../Services/StationService';
import { getErrorMessage } from '../Utils';

export const requestStationGetALL = () => (dispatch) => {
    return StationService.requestStationGetALL().then(
        (response) => {
            requestStationGETALL(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const requestStationGetALLSearch = (paramsData) => (dispatch) => {
    return StationService.requestStationGetALLSearch(paramsData).then(
        (response) => {
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const createStationPOSTAPI = (body) => (dispatch) => {
    return StationService.creatStationPOST(body).then(
        (response) => {
            createStationPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const updateStationPUTAPI = (body,shiftLocationId) => (dispatch) => {
    return StationService.updateStationPUT(body,shiftLocationId).then(
        (response) => {
            updateStationPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const deleteStationDeleteAPI = (shiftStationId) => (dispatch) => {
    return StationService.deleteStationAPI(shiftStationId).then(
        (response) => {
            deleteStationAPI(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.resolve(message);
        }
    );
};

const requestStationGETALL = (response, dispatch) => {
    dispatch({
        type: STATION_GETALL_SUCCESS,
        payload: response,
    });
}

const createStationPOST = (response, dispatch) => {
    dispatch({
        type: STATION_CREATE_SUCCESS,
        payload: response,
    });
}

const updateStationPOST = (response, dispatch) => {
    dispatch({
        type: STATION_UPDATE_SUCCESS,
        payload: response,
    });
}

const deleteStationAPI = (response, dispatch) => {
    dispatch({
        type: STATION_DELETE_SUCCESS,
        payload: response,
    });
}