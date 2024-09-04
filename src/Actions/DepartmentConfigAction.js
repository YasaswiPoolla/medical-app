import {
  DEPARTMENT_CONFIG_CREATE_SUCCESS,
  DEPARTMENT_CONFIG_GETALL_SUCCESS,
  DEPARTMENT_CONFIG_UPDATE_SUCCESS,
  DEPARTMENT_CONFIG_DELETE_SUCCESS,
} from "../ActionTypes/DepartmentConfigTypes";
import DepartmentConfigService from '../Services/DepartmentService';
import { getErrorMessage } from '../Utils';

export const requestDepartmentListGETAll = (currentPage, itemsPerPage, searchTerm) => (dispatch) => {
    return DepartmentConfigService.requestDepartmentListGETAll(currentPage, itemsPerPage,searchTerm).then(
        (response) => {
            requestDepartmentListsGETAll(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.resolve(message);
        }
    );
};

export const createDepartmentConfigPOSTAPI = (body) => (dispatch) => {
    return DepartmentConfigService.createDepartmentConfigPOSTAPI(body).then(
        (response) => {
            createDepartmentPOSTAPI(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.resolve(message);
        }
    );
};

export const updateDepartmentConfigPUTAPI = (body, departmentId) => (dispatch) => {
    return DepartmentConfigService.updateDepartmentConfigPUTAPI(body, departmentId).then(
        (response) => {
            updateDepartmentPUTAPI(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);

            return Promise.resolve(message);
        }
    );
};
export const deleteDepartmentConfigDELETEAPI = (id) => (dispatch) => {
  return DepartmentConfigService.deleteDepartmentConfigDeleteAPI(id).then(
    (response) => {
      deleteDepartmentDELETEAPI(response, dispatch);
      return Promise.resolve(response);
    },
    (error) => {
      const message = getErrorMessage(error);

      return Promise.reject(message);
    }
  );
};

const requestDepartmentListsGETAll = (response, dispatch) => {
    dispatch({
        type: DEPARTMENT_CONFIG_GETALL_SUCCESS,
        payload: response,
    });
}

const createDepartmentPOSTAPI = (response, dispatch) => {
    dispatch({
        type: DEPARTMENT_CONFIG_CREATE_SUCCESS,
        payload: response,
    });
}

const updateDepartmentPUTAPI = (response, dispatch) => {
    dispatch({
        type: DEPARTMENT_CONFIG_UPDATE_SUCCESS,
        payload: response,
    });
}
const deleteDepartmentDELETEAPI = (response, dispatch) => {
  dispatch({
    type: DEPARTMENT_CONFIG_DELETE_SUCCESS,
    payload: response,
  });
};