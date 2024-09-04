import {
  GET_ALL_PROCESS_DATA_SUCCESS,
  GET_ALL_PROCESS_DATA_FAILURE,
  ADD_PROCESS_FLOW_SUCCESS,
  ADD_PROCESS_FLOW_FAILURE,
  GET_PROCESS_TASKS_FLOW_SUCCESS,
  GET_PROCESS_TASKS_FLOW_FAILURE,
  PROCESS_FLOW_GET_TASK_SUCCESS,
  PROCESS_FLOW_GET_TASK_FAILURE,
  PROCESS_FLOW_ADD_TASK_SUCCESS,
  PROCESS_FLOW_ADD_TASK_FAILURE,
  PROCESS_FLOW_UPDATE_TASK_SUCCESS,
  PROCESS_FLOW_UPDATE_TASK_FAILURE,
  PROCESS_FLOW_DELETE_TASK_SUCCESS,
  PROCESS_FLOW_DELETE_TASK_FAILURE,
  ADD_PROCESS_DATA,
  GET_PROCESS_FROM_ID_FLOW_SUCCESS,
  GET_PROCESS_FROM_ID_FLOW_FAILURE,
  SET_PROCESS_ID_DATA_EMPTY,
  PROCESS_FLOW_SUCCESS_START,
  PROCESS_FLOW_SUCCESS_STOP,
  SET_PROCESS_TASKS_DATA_EMPTY
} from "../ActionTypes/ProcessFlowActionTypes";

const initialState = {
  taskData: null,
  error: null,
  processFlowData: [],
  // processTotals: [],
  processTasks: [],
  processIdData: {},
  processFlowSuccessMsg: "",
  processFlowSuccessSnack: false,
};

const processReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROCESS_DATA:
      return {
        ...state,
        processTotals: action?.payload || [],
        error: null,
      };
      case GET_ALL_PROCESS_DATA_SUCCESS:
      return {
        ...state,
        processFlowData: action.payload.body || [],
        error: null,
      };
    case GET_ALL_PROCESS_DATA_FAILURE:
      return {
        ...state,
        processFlowData: [],
        error: action.payload,
      };
    case ADD_PROCESS_FLOW_SUCCESS:
      return {
        ...state,
        processFlowData: [],
        error: null,
      };
    case ADD_PROCESS_FLOW_FAILURE:
      return {
        ...state,
        processFlowData: [],
        error: action.payload,
      };
    case GET_PROCESS_FROM_ID_FLOW_SUCCESS:
      return {
        ...state,
        processIdData: action.payload.body || [],
        error: null,
      };
    case GET_PROCESS_FROM_ID_FLOW_FAILURE:
      return {
        ...state,
        processIdData: {},
        error: action.payload,
      };
    case SET_PROCESS_ID_DATA_EMPTY:
      return {
        ...state,
        processIdData: {},
        error: null,
      };
    case PROCESS_FLOW_SUCCESS_START:
      return {
        ...state,
        processFlowSuccessMsg: action.payload,
        processFlowSuccessSnack: true,
        error: null,
      };
    case PROCESS_FLOW_SUCCESS_STOP:
      return {
        ...state,
        processFlowSuccessMsg: "",
        processFlowSuccessSnack: false,
        error: null,
      };
      case SET_PROCESS_TASKS_DATA_EMPTY:
      return {
        ...state,
        processTasks: [],
        error: null,
      };
    case GET_PROCESS_TASKS_FLOW_SUCCESS:
      return {
        ...state,
        processTasks: action.payload.body || [],
        error: null,
      };
    case GET_PROCESS_TASKS_FLOW_FAILURE:
      return {
        ...state,
        processTasks: [],
        error: action.payload,
      };
    case PROCESS_FLOW_GET_TASK_SUCCESS:
      return {
        ...state,
        taskData: action.payload,
        error: null,
      };
    case PROCESS_FLOW_GET_TASK_FAILURE:
      return {
        ...state,
        taskData: null,
        error: action.payload,
      };
    case PROCESS_FLOW_ADD_TASK_SUCCESS:
      return {
        ...state,
        taskData: null,
        error: null,
      };
    case PROCESS_FLOW_ADD_TASK_FAILURE:
      return {
        ...state,
        taskData: null,
        error: action.payload,
      };
    case PROCESS_FLOW_UPDATE_TASK_SUCCESS:
      return {
        ...state,
        taskData: null,
        error: null,
      };
    case PROCESS_FLOW_UPDATE_TASK_FAILURE:
      return {
        ...state,
        taskData: null,
        error: action.payload,
      };
    case PROCESS_FLOW_DELETE_TASK_SUCCESS:
      return {
        ...state,
        taskData: null,
        error: null,
      };
    case PROCESS_FLOW_DELETE_TASK_FAILURE:
      return {
        ...state,
        taskData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default processReducer;
