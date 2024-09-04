import{
    ROLESFETCH_SUCCESS,
}
from '../ActionTypes/RoleConfigurationTypes'

import {
    SET_MESSAGE
} from '../ActionTypes/GenericTypes';

const initialState = {
    roleDetails: "",
    error: "",
};

const myFunction = (state = initialState, action) => {

    switch (action.type) {
        case ROLESFETCH_SUCCESS: {
            return {
                ...state,
                error:null,
                roleDetails: action.payload
            }
        }

        case SET_MESSAGE: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return { ...state};
        }
    }
};

export default myFunction;