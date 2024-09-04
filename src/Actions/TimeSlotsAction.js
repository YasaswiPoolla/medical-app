import { TIMESLOTS_CREATE_SUCCESS, TIMESLOTS_DELETE_SUCCESS, TIMESLOTS_GETALL_SUCCESS, TIMESLOTS_UPDATE_SUCCESS } from '../ActionTypes/TimeSlotsTypes';
import TimeSlotsServices from '../Services/TimeSlotsService';
import { getErrorMessage } from '../Utils';

export const requestTimeSlotsGetALL = () => (dispatch) => {
    return TimeSlotsServices.requestTimeSlotsGetALL().then(
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
export const requestTimeSlotsGetALLSearch = (paramsData) => (dispatch) => {
    return TimeSlotsServices.requestTimeSlotsGetALLSearch(paramsData).then(
        (response) => {
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};

export const createTimeSlotPOSTAPI = (body) => (dispatch) => {
    return TimeSlotsServices.creatTimeSlotPOST(body).then(
        (response) => {
            createTimeSlotPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.resolve(message);
        }
    );
};

export const updateTimeSlotPUTAPI = (body,shiftUUID) => (dispatch) => {
    return TimeSlotsServices.updateTimeSlotPUT(body,shiftUUID).then(
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

export const deleteTimeSlotsDeleteAPI = (shiftUUID) => (dispatch) => {
    return TimeSlotsServices.deleteTimeSlotsAPI(shiftUUID).then(
        (response) => {
            deleteTimeSlotsAPI(response, dispatch);
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
        type: TIMESLOTS_GETALL_SUCCESS,
        payload: response,
    });
}

const createTimeSlotPOST = (response, dispatch) => {
    dispatch({
        type: TIMESLOTS_CREATE_SUCCESS,
        payload: response,
    });
}

const updateTimeSlotPOST = (response, dispatch) => {
    dispatch({
        type: TIMESLOTS_UPDATE_SUCCESS,
        payload: response,
    });
}

const deleteTimeSlotsAPI = (response, dispatch) => {
    dispatch({
        type: TIMESLOTS_DELETE_SUCCESS,
        payload: response,
    });
}