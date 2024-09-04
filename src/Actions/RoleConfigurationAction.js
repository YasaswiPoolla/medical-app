import {
    ROLESFETCH_SUCCESS,
    ROLESFETCH_FAIL,
    ROLESPOST_SUCCESS,
    ROLESPOST_FAIL,
    ROLESDELETE_SUCCESS,
    ROLESDELETE_FAIL,
    ROLESEDIT_SUCCESS,
    ROLESEDIT_FAIL
} from '../ActionTypes/RoleConfigurationTypes';

import { departmentFetchAction } from './DepartmentAction'; 

import {
    SET_MESSAGE
  }from '../ActionTypes/GenericTypes';

import roleConfigurationServices from '../Services/RoleConfigurationService'
import { getErrorMessage } from '../Utils';



export const rolesFetchAction = (currentPage,itemsPerPage,searchTerm)=>(dispatch) =>{
    return roleConfigurationServices.fetchRoleService(currentPage,itemsPerPage,searchTerm).then(
        (response) => {
          
            rolesFetchDispatcher(response,dispatch);
            updatePageDetails(response.data?.pageNo,response.data?.totalPages,dispatch);
            return Promise.resolve(response);
          },
          (error) => {
            const message = getErrorMessage(error);

              rolesFetchError(message,dispatch);
            return Promise.reject(message);
          }
    )
}

/**
 * This method takes search term as the parameter and the same is passed to the api end point which
 * returns the list of roles based on the search term given.
 * @param {*} searchTerm 
 * @returns List of roles based on the search term given 
 */
export const roleSearchFetchAction = (searchTerm)=>(dispatch) =>{
  return roleConfigurationServices.roleSearchService(searchTerm).then(
      (response) => {   
          rolesFetchDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);
            rolesFetchError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

export const rolesPostAction = (body)=>(dispatch) =>{
  return roleConfigurationServices.postRoleService(body).then(
      (response) => {
          
          rolesPostDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);

            rolesPostError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const updatePageDetails = (currentPage,totalPages,dispatch)=>{
  dispatch({ type: 'SET_PAGINATION',
  payload: {currentPage,totalPages},
});
}

export const rolesDeleteAction = (roleId)=>(dispatch) =>{
  return roleConfigurationServices.deleteRoleService(roleId).then(
      (response) => {
          
          rolesDeleteDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);


            rolesDeleteError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

export const rolesEditAction = (body,roleId)=>(dispatch) =>{
  return roleConfigurationServices.editRoleService(body,roleId).then(
      (response) => {
          
          rolesEditDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);
            rolesEditError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const rolesFetchDispatcher = (response,dispatch) =>{
    dispatch({
      type: ROLESFETCH_SUCCESS,
      payload: response,
    });

    dispatch(departmentFetchAction());
  }

  const rolesFetchError=(message,dispatch)=>{
    dispatch({
      type: ROLESFETCH_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
}

const rolesPostDispatcher=(response,dispatch) =>{
  dispatch({
    type: ROLESPOST_SUCCESS,
    payload: response,
  });
}

const rolesPostError=(message,dispatch)=>{
  dispatch({
    type: ROLESPOST_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}

const rolesDeleteDispatcher=(response,dispatch)=>{
  dispatch({
    type: ROLESDELETE_SUCCESS,
    payload: response,
  });

}
const rolesDeleteError=(message,dispatch)=>{
  dispatch({
    type: ROLESDELETE_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}

const rolesEditDispatcher = (response,dispatch)=>{
  dispatch({
    type: ROLESEDIT_SUCCESS,
    payload: response,
  });
}

const rolesEditError=(message,dispatch)=>{
  dispatch({
    type: ROLESEDIT_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}