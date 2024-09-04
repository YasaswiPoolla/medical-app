import {
  TEMPLATE_UPLOAD_FAILURE,
  TEMPLATE_UPLOAD_SUCCESS,
} from "../ActionTypes/AdminStaffActionTypes";
import { templateUploadService } from "../Services/AdminStaffManagementService";
import {
  blobType,
  CONTENT_TYPE_HEADER,
  getErrorMessage,
  JSON_CONTENT_TYPE,
  ROASTER_COMPONENT_KEY,
  ROASTER_TEMPLATE_FILE_NAME,
  STAFF_COMPONENT_KEY,
  TEMPLATE_FILE_NAME,
} from "../Utils";
import RosterManagementService from "../Services/RosterManagementService";
import { saveAs } from "file-saver";

/**
 * This function handles the process of uploading a template file by dispatching
 * appropriate actions based on the result of the upload service call. It utilizes
 * `templateUploadService` for uploading the file and then dispatches either a
 * success or error action depending on the outcome.
 *
 * @function
 * @param {File} file - The file object to be uploaded.
 * @returns {Function} A thunk function that returns a Promise. The Promise
 * resolves with the response on successful upload or rejects with an error message
 * on failure.
 */

export const templateUploadAction =
  (componentName, file) => async (dispatch) => {
    let Service;
    let fileName;
    if (componentName === STAFF_COMPONENT_KEY) {
      Service = templateUploadService;
      fileName = TEMPLATE_FILE_NAME;
    } else if (componentName === ROASTER_COMPONENT_KEY) {
      Service = RosterManagementService.rosterTemplateUploadService;
      fileName = ROASTER_TEMPLATE_FILE_NAME
    }
    return Service(file).then(
      (response) => {
        if(response?.headers[CONTENT_TYPE_HEADER] === JSON_CONTENT_TYPE) {
        requestTemplateUpload(response, dispatch);
        return Promise.resolve(response);
        }
        else {
          const blob = new Blob([response?.data], { type: blobType });
          saveAs(blob, fileName);
          requestTemplateUpload(response, dispatch);
          return Promise.resolve(response);
        
        }
      },
      (error) => {
        const message = getErrorMessage(error);
        templateUploadError(message, dispatch);
        return Promise.reject(message);
      }
    );
  };
  
  const requestTemplateUpload = (response, dispatch) => {
    dispatch({
      type: TEMPLATE_UPLOAD_SUCCESS,
      payload: response,
    });
  };
  
  const templateUploadError = (response, dispatch) => {
    dispatch({
      type: TEMPLATE_UPLOAD_FAILURE,
      payload: response,
    });
  };