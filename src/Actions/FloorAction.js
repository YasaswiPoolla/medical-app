import { FlOOR_GETALL_SUCCESS, FlOOR_CREATE_SUCCESS, FlOOR_UPDATE_SUCCESS, FlOOR_DELETE_SUCCESS } from '../ActionTypes/TimeSlotsTypes';
import { getErrorMessage } from '../Utils';
import floorService from '../Services/FloorService';

export const requestFloorGetALL = () => (dispatch) => {
    return floorService.requestFloorGetALL().then(
        (response) => {
            requestTimeSlotsGETALL(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const requestFloorGetALLSearch = (paramsData) => (dispatch) => {
    return floorService.requestFloorGetALLSearch(paramsData).then(
        (response) => {
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const createFloorPOSTAPI = (body) => (dispatch) => {
    return floorService.creatFloorPOST(body).then(
        (response) => {
            createFloorPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const updateFloorPUTAPI = (body, shiftLocationId) => (dispatch) => {
    return floorService.updateFloorPUT(body, shiftLocationId).then(
        (response) => {
            updateTimeSlotPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.resolve(message);
        }
    );
};

export const deleteFloorDeleteAPI = (shiftLocationId) => (dispatch) => {
    return floorService.deleteFloorAPI(shiftLocationId).then(
        (response) => {
            deleteFloorAPI(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

const requestTimeSlotsGETALL = (response, dispatch) => {
    dispatch({
        type: FlOOR_GETALL_SUCCESS,
        payload: response,
    });
}

const createFloorPOST = (response, dispatch) => {
    dispatch({
        type: FlOOR_CREATE_SUCCESS,
        payload: response,
    });
}

const updateTimeSlotPOST = (response, dispatch) => {
    dispatch({
        type: FlOOR_UPDATE_SUCCESS,
        payload: response,
    });
}

const deleteFloorAPI = (response, dispatch) => {
    dispatch({
        type: FlOOR_DELETE_SUCCESS,
        payload: response,
    });
}