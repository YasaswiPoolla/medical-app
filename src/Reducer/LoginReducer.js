import {
    REQUESTOTP_SUCCESS,
    REQUESTOTP_FAIL,
    VALIDATEOTP_SUCCESS,
    VALIDATEOTP_FAIL
} from "../ActionTypes/LoginTypes";

import {
    SET_MESSAGE
} from '../ActionTypes/GenericTypes';
import { TIMESLOTS_GETALL_SUCCESS } from "../ActionTypes/TimeSlotsTypes";

const initialState = {
    userDetails: "",
    error: "",
    timeSlotsGetAll: []
};

const myFunction = (state = initialState, action) => {

    switch (action.type) {
        case REQUESTOTP_SUCCESS: {
            return {
                ...state
            }
        }
        case REQUESTOTP_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }
        case VALIDATEOTP_SUCCESS: {
            return {
                ...state,
                userDetails: action.payload
            }
        }
        case VALIDATEOTP_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }
        case TIMESLOTS_GETALL_SUCCESS: {
            return {
                ...state,
                error: action.payload
            }
        }
        case SET_MESSAGE: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return { ...state };
        }
    }
};


export default myFunction;