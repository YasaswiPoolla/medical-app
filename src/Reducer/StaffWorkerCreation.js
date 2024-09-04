import {
  CREATE_STAFFWORKER_FAILURE,
  CREATE_STAFFWORKER_SUCCESS,
} from "../ActionTypes/AdminStaffActionTypes";
import { SET_MESSAGE } from "../ActionTypes/GenericTypes";

const initialstate = {
  addStaffWorkerResponse: [],
  errorMessage: "",
};

const staffCreationReducerFn = (state = initialstate, action) => {
  switch (action.type) {
    case CREATE_STAFFWORKER_SUCCESS: {
      return {
        ...state,
        errorMessage: null,
        addStaffWorkerResponse: buildAddStaffWorker(action.payload),
      };
    }
    case CREATE_STAFFWORKER_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case SET_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
  function buildAddStaffWorker(response) {
    const createStaffWorker = [];

    createStaffWorker.push(Object.assign(response));

    return createStaffWorker;
  }
};
export default staffCreationReducerFn;
