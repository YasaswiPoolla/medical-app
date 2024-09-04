import { processService } from "../Services/ProcessFlowService";
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
  GET_PROCESS_FROM_ID_FLOW_SUCCESS,
  GET_PROCESS_FROM_ID_FLOW_FAILURE,
  SET_PROCESS_ID_DATA_EMPTY,
  PROCESS_FLOW_SUCCESS_START,
  PROCESS_FLOW_SUCCESS_STOP,
  SET_PROCESS_TASKS_DATA_EMPTY,
  PROCESS_FLOW_DELETE_PROCESS_SUCCESS,
  PROCESS_FLOW_DELETE_PROCESS_FAILURE
} from "../ActionTypes/ProcessFlowActionTypes";
import { SNACK_HIDE_DURATION } from '../Utils'

export const fetchProcessTasks = (processId) => (dispatch) => {
  return processService
    .getProcessTasks(processId)
    .then((response) => {
      dispatch({
        type: GET_PROCESS_TASKS_FLOW_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: GET_PROCESS_TASKS_FLOW_FAILURE, payload: error });
    });
};

export const fetchAllProcessAction = (hospitalId) => (dispatch) => {
  return processService
    .getAllProcess(hospitalId)
    .then((response) => {
      dispatch({
        type: GET_ALL_PROCESS_DATA_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: GET_ALL_PROCESS_DATA_FAILURE, payload: error });
    });
};

export const deleteProcess = (processId) => (dispatch) => {
  return processService
    .deleteProcess(processId)
    .then((response) => {
      dispatch({ type: PROCESS_FLOW_DELETE_PROCESS_SUCCESS, payload: response.data });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: PROCESS_FLOW_DELETE_PROCESS_FAILURE, payload: error });
    });
}

export const getProcessByIdAction = (processId) => (dispatch) => {
  return processService
    .getProcessById(processId)
    .then((response) => {
      dispatch({
        type: GET_PROCESS_FROM_ID_FLOW_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: GET_PROCESS_FROM_ID_FLOW_FAILURE, payload: error });
    });
};

export const setProcessIdDataEmptyAction = () => (dispatch) => {
  dispatch({ type: SET_PROCESS_ID_DATA_EMPTY });
};

export const setProcessTasksDataEmptyAction = () => (dispatch) => {
  dispatch({ type: SET_PROCESS_TASKS_DATA_EMPTY });
};

export const processFlowSuccessStart = (message) => (dispatch) => {
  dispatch({ type: PROCESS_FLOW_SUCCESS_START, payload: message });

  setTimeout(() => {
    dispatch({ type: PROCESS_FLOW_SUCCESS_STOP });
  }, SNACK_HIDE_DURATION);
};

export const addProcessFlow = (payload) => (dispatch) => {
  return processService
    .addProcessFlow(payload)
    .then((response) => {
      dispatch({ type: ADD_PROCESS_FLOW_SUCCESS, payload: response.data });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: ADD_PROCESS_FLOW_FAILURE, payload: error });
    });
};

export const getTask = () => (dispatch) => {
  return processService
    .getTask()
    .then((response) => {
      dispatch({ type: PROCESS_FLOW_GET_TASK_SUCCESS, payload: response.data });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: PROCESS_FLOW_GET_TASK_FAILURE, payload: error });
    });
};

export const addTask = (payload) => (dispatch) => {
  return processService
    .addTask(payload)
    .then((response) => {
      dispatch({ type: PROCESS_FLOW_ADD_TASK_SUCCESS, payload: response.data });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: PROCESS_FLOW_ADD_TASK_FAILURE, payload: error });
    });
};

export const updateTask = (taskId, payload) => (dispatch) => {
  return processService
    .updateTask(taskId, payload)
    .then((response) => {
      dispatch({
        type: PROCESS_FLOW_UPDATE_TASK_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: PROCESS_FLOW_UPDATE_TASK_FAILURE, payload: error });
    });
};

export const deleteTask = (taskId) => (dispatch) => {
  return processService
    .deleteTask(taskId)
    .then((response) => {
      dispatch({
        type: PROCESS_FLOW_DELETE_TASK_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({ type: PROCESS_FLOW_DELETE_TASK_FAILURE, payload: error });
    });
};
