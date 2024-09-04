import {
  PRIORITY_FETCH_SUCESS,
  PRIORITY_FETCH_FAIL,
  PRIORITY_DELETE_SUCCESS,
  PRIORITY_DELETE_FAIL,
  PRIORITY_CREATE_SUCCESS,
  PRIORITY_CREATE_FAIL,
  PRIORITY_UPDATE_SUCCESS,
  PRIORITY_UPDATE_FAIL,
} from "../ActionTypes/PriorityActionTypes";
import { getErrorMessage } from "../Utils";
import priorityServices from "../Services/PriorityService";
import { SET_MESSAGE } from "../ActionTypes/GenericTypes";

/**
 *  Fetches priority services based on the current page, items per page, and search term.
 *
 * @param {number} currentPage - The current page number to fetch.
 * @param {number} itemsPerPage - The number of items to fetch per page.
 * @param {string} searchTerm - The search term to filter the priority services.
 * @returns {function} - A function that takes a dispatch method as an argument.
 * 
 */

export const priorityFetchAction =
  (currentPage, itemsPerPage, searchTerm) => (dispatch) => {
    return priorityServices
      .fetchPriorityService(currentPage, itemsPerPage, searchTerm)
      .then(
        (response) => {
          priorityFetchDispatcher(response, dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);
          priorityFetchError(message);
        }
      );
  };

  /**
  * Dispatches an action for successful fetching of priority services.
  *
  * @function
  * @param {Object} response - The response object from the fetch service.
  * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
  */

const priorityFetchDispatcher = (response, dispatch) => {
  dispatch({
    type: PRIORITY_FETCH_SUCESS,
    payload: response,
  });
};

/**
 * Dispatches actions for handling errors during priority service creation.
 *
 * @function
 * @param {string} message - The error message to be dispatched.
 * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
 */

const priorityFetchError = (message, dispatch) => {
  dispatch({
    type: PRIORITY_FETCH_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
};


/**
 * This function handles the process of deleting priority services by dispatching
 * appropriate actions based on the result of the delete service call. It utilizes
 * `priorityServices.deletPriorityService` for deleting the service and then dispatches
 * either a success or error action depending on the outcome.
 *
 * @function
 * @returns {Function} A thunk function that returns a Promise. The Promise
 * resolves with the response on successful deletion or rejects with an error message
 * on failure.
 */
export const priorityDeleteAction = (id) => (dispatch) => {
  return priorityServices.deletPriorityService(id).then(
    (response) => {
      priorityDeleteDispatcher(response, dispatch);
      return Promise.resolve(response);
    },
    (error) => {
      const message = getErrorMessage(error);
      priorityDeleteError(message, dispatch);
    }
  );
};

/**
 * Dispatches an action for successful priority service creation.
 *
 * @function
 * @param {Object} response - The response object from the post service.
 * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
 */


const priorityDeleteDispatcher = (response, dispatch) => {
  dispatch({
    type: PRIORITY_DELETE_SUCCESS,
    payload: response,
  });
};

/**
 * Dispatches actions for handling errors during priority service creation.
 *
 * @function
 * @param {string} message - The error message to be dispatched.
 * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
 */

const priorityDeleteError = (message, dispatch) => {
  dispatch({
    type: PRIORITY_DELETE_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
};

/**
 * This function handles the process of posting priority services by dispatching
 * appropriate actions based on the result of the post service call. It utilizes
 * `priorityServices.postPriorityService` for posting the service and then dispatches
 * either a success or error action depending on the outcome.
 *
 * @function
 * @param {Object} body - The body of the request containing data to be posted.
 * @returns {Function} A thunk function that returns a Promise. The Promise
 * resolves with the response on successful posting or rejects with an error message
 * on failure.
 */

export const priorityPostAction = (body) => (dispatch) => {
  return priorityServices.postPriorityService(body).then(
    (response) => {
      priorityPostDispatcher(response, dispatch);

      return Promise.resolve(response);
    },
    (error) => {
      const message = getErrorMessage(error);

      priorityPostError(message, dispatch);
    }
  );
};

/**
 * Dispatches an action for successful priority service creation.
 *
 * @function
 * @param {Object} response - The response object from the post service.
 * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
 */


const priorityPostDispatcher = (response, dispatch) => {
  dispatch({
    type: PRIORITY_CREATE_SUCCESS,
    payload: response,
  });
};


/**
 * Dispatches actions for handling errors during priority service creation.
 *
 * @function
 * @param {string} message - The error message to be dispatched.
 * @param {Function} dispatch - The dispatch function to send actions to the Redux store.
 */

const priorityPostError = (message, dispatch) => {
  dispatch({
    type: PRIORITY_CREATE_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
};

export const priorityEditAction = (body) => (dispatch) => {
  return priorityServices.editPriorityService(body).then(
    (response) => {
      priorityEditDispatcher(response, dispatch);
      return Promise.resolve(response);
    },
    (error) => {
      const message = getErrorMessage(error);
      priorityEditError(message, dispatch);
    }
  );
};

const priorityEditDispatcher = (response, dispatch) => {
  dispatch({
    type: PRIORITY_UPDATE_SUCCESS,
    payload: response,
  });
};

const priorityEditError = (message, dispatch) => {
  dispatch({
    type: PRIORITY_UPDATE_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
};