import { Api,REACT_APP_PROCESS_BASE_API_URL } from "../Interceptor/Interceptor";
import {
  GET_ALL_PROCESS_DATA,
  PROCESS_FLOW_API_END_POINT,
  PROCESS_FLOW_GET_TASK_API_END_POINT,
  PROCESS_FLOW_ADD_TASK_API_END_POINT,
  PROCESS_FLOW_UPDATE_TASK_API_END_POINT,
  PROCESS_FLOW_DELETE_TASK_API_END_POINT,
  PROCESS_FLOW_TASKS_FOR_PROCESS_END_POINT,
  PROCESS_FLOW_UPDATE_END_POINST
} from "./processFlowEndPoints";

export const processService = {
  getAllProcess: (hospitalId) => {
    return Api.get(`${REACT_APP_PROCESS_BASE_API_URL}${GET_ALL_PROCESS_DATA}?hospitalUUID=${hospitalId}`);
  },
  deleteProcess: (processId) => {
    return Api.put(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_UPDATE_END_POINST}/${processId}`);
  },
  getProcessTasks: (processId) => {
    return Api.get(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_TASKS_FOR_PROCESS_END_POINT}?processId=${processId}`);
  },
  getProcessById: (processId) => {
    return Api.get(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_API_END_POINT}/${processId}`);
  },
  addProcessFlow: (payload) => {
    return Api.post(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_API_END_POINT}`, payload);
  },
  getTask: () => {
    return Api.get(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_GET_TASK_API_END_POINT}`);
  },
  addTask: (payload) => {
    return Api.post(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_ADD_TASK_API_END_POINT}`, payload);
  },
  updateTask: (taskId, payload) => {
    return Api.put(
      `${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_UPDATE_TASK_API_END_POINT}/${taskId}`,
      payload
    );
  },
  deleteTask: (taskId) => {
    return Api.delete(`${REACT_APP_PROCESS_BASE_API_URL}${PROCESS_FLOW_DELETE_TASK_API_END_POINT}?taskId=${taskId}`);
  },
};
