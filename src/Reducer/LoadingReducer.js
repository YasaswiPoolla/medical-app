import { LOADING_START, LOADING_END } from "../ActionTypes/LoadingTypes";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
