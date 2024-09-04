import {deleteStaffService, departmentListService, getAllStaffList,getAllStaffListOnSearch,gradesListService,managersListService,rolesListServiceFn,staffWorkerCreation,staffWorkerEditService,templateDownloadService} from '../Services/AdminStaffManagementService'
import {REQUEST_STAFFLIST_SUCCESS,REQUEST_STAFFLIST_FAIL,CREATE_STAFFWORKER_FAILURE,CREATE_STAFFWORKER_SUCCESS,ROLES_LIST_SUCCESS,ROLES_LIST_FAILURE,EDIT_STAFFWORKER_SUCCESS,EDIT_STAFFWORKER_FAILURE,TEMPLATE_DOWNLOAD_FAILURE,TEMPLATE_DOWNLOAD_SUCCESS} from '../ActionTypes/AdminStaffActionTypes'
import {
    SET_MESSAGE
  }from '../ActionTypes/GenericTypes';
import { AddStaff} from '../Model/AddStaffWorkerModel';
import { downloadTemplate, getErrorMessage, TEMPLATE_FILE_NAME } from '../Utils';


  
export const staffList = (currentPage,itemsPerPage,search)=>async (dispatch)=>{
    return await getAllStaffList(currentPage,itemsPerPage,search).then(
        (response) => {
          
    requestStaffList(response, dispatch);
    updatePageDetails(response.data?.pageNo,response.data?.totalPages,dispatch);
    return Promise.resolve(response);
        },
        (error) => {
            
              const message = getErrorMessage(error);
              requestStaffListError(message,dispatch);
            return Promise.reject(message);
          }
    )
}
const updatePageDetails = (currentPage,totalPages,dispatch)=>{
    dispatch({ type: 'SET_PAGINATION',
    payload: {currentPage,totalPages},
  });
}

const requestStaffList= (response,dispatch) =>{
    dispatch({
      type: REQUEST_STAFFLIST_SUCCESS,
      payload: response,
    });
}
const requestStaffListError = (message,dispatch) =>{
    dispatch({
      type: REQUEST_STAFFLIST_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
}


export const staffCreation = (payload,departmentId)=> (dispatch)=>{
    return  staffWorkerCreation(buildPayloadForStaffCreation(payload,departmentId)).then(
    (response) => {
    requestStaffCreation(response, dispatch);
    return Promise.resolve(response);
        },
        (error) => {
            
            const message = getErrorMessage(error); 
            requestStaffCreationError(message,dispatch);
            return Promise.reject(message);
        }
    )
}
function buildPayloadForStaffCreation(payloadData,departmentPayload){
    
    let staffData = new AddStaff();
    staffData.empId = payloadData?.empId;
    staffData.emailId = payloadData?.emailID;
    staffData.firstName = payloadData?.firstName.trim();
    staffData.lastName = payloadData?.lastName.trim();
    staffData.phoneNo = payloadData?.mobileNumber;
    staffData.managerId = payloadData?.manager?.workerId;
    staffData.gradeId =  payloadData?.grade;
    staffData.department = departmentPayload?.departmentId;
    staffData.roleId = payloadData?.role;
    return staffData;
     
}

const requestStaffCreation= (response,dispatch) =>{
    dispatch({
      type: CREATE_STAFFWORKER_SUCCESS,
      payload: response,
    });
    
}
const requestStaffCreationError = (message,dispatch) =>{
    dispatch({
      type: CREATE_STAFFWORKER_FAILURE,
      payload:message
    });
    
}




export const staffEditAction = (body)=>(dispatch)=>{
  
  return staffWorkerEditService(body).then(
    (response) => {
        workerEditDispatcher(response,dispatch);
        return Promise.resolve(response);
      },
      (error) => {
         const message = getErrorMessage(error);
          workerEditError(message,dispatch);
        return Promise.reject(message);
      }
)

}

const workerEditDispatcher = (response,dispatch) =>{
  dispatch({
    type: EDIT_STAFFWORKER_SUCCESS,
    payload: response,
  });

}

const workerEditError =(message,dispatch)=>{

  dispatch({
    type: EDIT_STAFFWORKER_FAILURE,
  });
  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });

}


export const rolesList = ()=>async (dispatch)=>{
    return  rolesListServiceFn().then(
        (response) => {
     requestRolesList(response, dispatch);
    return Promise.resolve(response);
        },
        (error) => {
            
              const message = getErrorMessage(error);
              requestRolesListError(message,dispatch);
            return Promise.reject(message);
          }
    )
}
const requestRolesList = (response,dispatch) =>{
    dispatch({
      type: ROLES_LIST_SUCCESS,
      payload: response,
    });
}
const requestRolesListError= (response,dispatch) =>{
    dispatch({
      type: ROLES_LIST_FAILURE,
      payload: response,
    });
}


export const templateDownloadAction = () => async (dispatch) => {
  return templateDownloadService().then(
    (response) => {
      const blob = response.data;
      downloadTemplate(blob,TEMPLATE_FILE_NAME)
  
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

const requestTemplateDownload = (response, dispatch) => {
  dispatch({
    type: TEMPLATE_DOWNLOAD_SUCCESS,
    payload: response,
  });
};
const templateDownloadError = (response, dispatch) => {
  dispatch({
    type: TEMPLATE_DOWNLOAD_FAILURE,
    payload: response,
  });
};




export const departmentList = ()=>async (dispatch)=>{
    return  departmentListService().then(
        (response) => {
     requestRolesList(response, dispatch);
    return Promise.resolve(response);
        },
        (error) => {
            
              const message = getErrorMessage(error);

              requestRolesListError(message,dispatch);
            return Promise.reject(message);
          }
    )
}
export const managersList = (searchTerm,roleId,gradeName)=>async (dispatch)=>{
    return  managersListService(searchTerm,roleId,gradeName).then(
        (response) => {
     requestRolesList(response, dispatch);
    return Promise.resolve(response);
        },
        (error) => {
              const message = getErrorMessage(error);

              requestRolesListError(message,dispatch);
            return Promise.reject(message);
          }
    )
}

export const gradesList = ()=>async (dispatch)=>{
    return  gradesListService().then(
        (response) => {
     requestRolesList(response, dispatch);
    return Promise.resolve(response);
        },
        (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.message) ||
              error.message ||
              error.toString();
              requestRolesListError(message,dispatch);
            return Promise.reject(message);
          }
    )
}
export const staffListSearch = (searchTerm)=>async (dispatch)=>{
    return await getAllStaffListOnSearch(searchTerm).then(
        (response) => {
    requestStaffList(response, dispatch);
    
    return Promise.resolve(response);
        },
        (error) => {
            
              const message = getErrorMessage(error);

              requestStaffListError(message,dispatch);

            return Promise.reject(message);
          }
    )
}
export const deleteStaffAction = (workerId)=>async (dispatch)=>{
    return deleteStaffService(workerId).then(
        (response) => {
            return Promise.resolve(response);
                },
                (error) => {
                      const message = getErrorMessage(error);
                      requestStaffListError(message,dispatch);
                    return Promise.reject(message);
                      });
}
