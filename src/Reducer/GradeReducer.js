import {
    GRADESFETCH_SUCCESS,
    OPEN_MODAL,
    OPEN_CANVAS
}from '../ActionTypes/GradeConfigTypes'

import {
    SET_MESSAGE
} from '../ActionTypes/GenericTypes';

const initialState = {
    gradeDetails: "",
    error: "",
    openModal:false,
    closeModal:false,
    openCanvas:false,
};

const myFunction = (state = initialState, action) => {

    switch (action.type) {
        case GRADESFETCH_SUCCESS: {
            return {
                ...state,
                error:null,
                gradeDetails: action.payload.data.body
            }
        }

        case SET_MESSAGE: {
            return {
                ...state,
                error: action.payload
            }
        }

        case OPEN_MODAL :{
            return {
                ...state,
                openModal:action.payload
            }
        }

        case OPEN_CANVAS :{
            return {
                ...state,
                openCanvas:action.payload
            }
        }

        default: {
            return { ...state};
        }
    }
};

export default myFunction;