import {
    DEPARTMENT_FETCHALL_SUCCESS,
    DEPARTMENT_FETCHALL_FAIL
} from '../ActionTypes/DepartmentTypes';

import {
    SET_MESSAGE
  }from '../ActionTypes/GenericTypes';

import departmentServices from '../Services/DepartmentService';
import { getErrorMessage } from '../Utils';

export const departmentFetchAction = ()=>(dispatch) =>{
    return departmentServices.departmentListWithoutPagination().then(
        (response) => {
            
            departmentFetchDispatcher(response,dispatch);
            return Promise.resolve(response);
          },
          (error) => {

            
            const message = getErrorMessage(error);

              departmentFetchError(message,dispatch);
            return Promise.resolve(message);
          }
    )
}

const departmentFetchDispatcher=(response,dispatch) =>{
    dispatch({
      type: DEPARTMENT_FETCHALL_SUCCESS,
      payload: response,
    });
  }

  const departmentFetchError=(message,dispatch)=>{
    dispatch({
      type: DEPARTMENT_FETCHALL_FAIL,
    });
  
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }