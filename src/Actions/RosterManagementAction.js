import { TEMPLATE_DOWNLOAD_FAILURE } from '../ActionTypes/AdminStaffActionTypes';
import { ROSTER_MANAGEMENT_CREATE_SUCCESS, ROSTER_MANAGEMENT_DELETE_SUCCESS, ROSTER_MANAGEMENT_GETALL_SUCCESS, ROSTER_MANAGEMENT_UPDATE_SUCCESS, WORKER_LIST_GETALL } from '../ActionTypes/RosterManagementTypes';
import RosterManagementService, { roasterTemplateDownloadService } from '../Services/RosterManagementService';
import { downloadTemplate, getErrorMessage, ROASTER_TEMPLATE_FILE_NAME, TEMPLATE_DOWNLOAD_SUCCESS } from '../Utils';

export const requestRosterManagementListGetALL = (startDate,endDate,currentPage, itemsPerPage,searchTerm) => (dispatch) => {
    return RosterManagementService.requestRosterManagementListGetALL(startDate,endDate, currentPage, itemsPerPage,searchTerm).then(
        (response) => {
            requestRosterManagementListGETALL(response, dispatch);
            updatePageDetails(response.data?.pageNo,response.data?.totalPages,dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);     
            return Promise.reject(message);
        }
    );
};

export const requestWorkerListGetALL = (startDate,endDate) => (dispatch) => {
    return RosterManagementService.requestWorkerListGetALL(startDate,endDate).then(
        (response) => {
            requestWorkerListGetALLfn(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.reject(message);
        }
    );
};


export const fetchWorkerWithRoleAction = (roleId, searchTerm) => (dispatch) => {
  return RosterManagementService.workerSearchWithRole(roleId, searchTerm).then(
    (response) => {
      requestWorkerListGetALLfn(response, dispatch);
      return Promise.resolve(response);
    },
    (error) => {
      const message = getErrorMessage(error);
      return Promise.reject(message);
    }
  );
};

export const createRosterManagementPOTAPI = (body) => (dispatch) => {
    return RosterManagementService.createRosterManagementPOSTAPI(body).then(
        (response) => {
            createRosterManagementPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.reject(message);
        }
    );
};

export const updateRosterManagementPUTAPI = (body, rosterId) => (dispatch) => {
    return RosterManagementService.updateRosterManagementPUTAPI(body, rosterId).then(
        (response) => {
            updateRosterManagementPOST(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);      
            return Promise.reject(message);
        }
    );
};

export const deleteRosterManagementDeleteAPI = (body, rosterId) => (dispatch) => {
    return RosterManagementService.deleteRosterManagementDeleteAPI(body, rosterId).then(
        (response) => {
            deleteRosterManagementDelete(response, dispatch);
            return Promise.resolve(response);
        },
        (error) => {
            const message = getErrorMessage(error);
            return Promise.reject(message);
        }
    );
};

export const roasterTemplateDownloadAction = () => async (dispatch) => {
    return roasterTemplateDownloadService().then(
      (response) => {
        const blob = response?.data;
        downloadTemplate(blob, ROASTER_TEMPLATE_FILE_NAME);
    
        requestTemplateDownload(response, dispatch);
        return Promise.resolve(response);
      },
      (error) => {
        const message = getErrorMessage(error);
        templateDownloadError(message, dispatch);
        return Promise.reject(message);
      }
    );
  }

  /**
   * This function handles the dispatch of a successful template download action. 
   * It takes the server's response and dispatches an action indicating that the template download was successful.
   * @param {*} response The response object received from the server after a successful download.
   * @param {*} dispatch The dispatch function provided by the Redux store, used to dispatch actions to the store.
   */

  const requestTemplateDownload = (response, dispatch) => {
    dispatch({
      type: TEMPLATE_DOWNLOAD_SUCCESS,
      payload: response,
    });
  };


  /**
   * This function handles the dispatch of a template download failure action.
   *  It takes the error response and dispatches an action indicating that the template download has failed.
   * @param {*} response The error response object received from the server or generated due to a download failure.
   * @param {*} dispatch The dispatch function provided by the Redux store, used to dispatch actions to the store.
   */
  const templateDownloadError = (response, dispatch) => {
    dispatch({
      type: TEMPLATE_DOWNLOAD_FAILURE,
      payload: response,
    });
  };


const requestRosterManagementListGETALL = (response, dispatch) => {
    dispatch({
        type: ROSTER_MANAGEMENT_GETALL_SUCCESS,
        payload: response,
    });
}

const updatePageDetails = (currentPage,totalPages,dispatch)=>{
    dispatch({ type: 'SET_PAGINATION',
    payload: {currentPage,totalPages},
  });
}

const requestWorkerListGetALLfn = (response, dispatch) => {
    dispatch({
        type: WORKER_LIST_GETALL,
        payload: response,
    });
}

const createRosterManagementPOST = (response, dispatch) => {
    dispatch({
        type: ROSTER_MANAGEMENT_CREATE_SUCCESS,
        payload: response,
    });
}

const updateRosterManagementPOST = (response, dispatch) => {
    dispatch({
        type: ROSTER_MANAGEMENT_UPDATE_SUCCESS,
        payload: response,
    });
}

const deleteRosterManagementDelete = (response, dispatch) => {
    dispatch({
        type: ROSTER_MANAGEMENT_DELETE_SUCCESS,
        payload: response,
    });
}