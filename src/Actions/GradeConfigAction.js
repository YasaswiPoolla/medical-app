import { GRADESFETCH_SUCCESS,GRADESFETCH_FAIL,GRADESPOST_SUCCESS,GRADESPOST_FAIL,GRADESEDIT_SUCCESS,GRADESEDIT_FAIL,GRADESDELETE_SUCCESS,GRADESDELETE_FAIL } from "../ActionTypes/GradeConfigTypes";
import {
    SET_MESSAGE
  }from '../ActionTypes/GenericTypes';

import gradeConfigurationServices from '../Services/GradesService'
import { getErrorMessage } from '../Utils';


export const gradesFetchAction = (currentPage,itemsPerPage,searchTerm)=>(dispatch) =>{
    return gradeConfigurationServices.fetchGradeService(currentPage,itemsPerPage,searchTerm).then(
        (response) => {
          
            gradesFetchDispatcher(response,dispatch);
            
            return Promise.resolve(response);
          },
          (error) => {
            const message = getErrorMessage(error);

              gradesFetchError(message,dispatch);
            return Promise.reject(message);
          }
    )
}

export const gradesFetchActionSearch = (paramsData)=>(dispatch) =>{
  return gradeConfigurationServices.fetchGradeServiceSearch(paramsData).then(
      (response) => {
        
          gradesFetchDispatcher(response,dispatch);
          
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);

            gradesFetchError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const gradesFetchDispatcher = (response,dispatch) =>{
    dispatch({
      type: GRADESFETCH_SUCCESS,
      payload: response,
    });
  
  }

  const gradesFetchError=(message,dispatch)=>{
    dispatch({
      type: GRADESFETCH_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
}

export const gradesPostAction = (body)=>(dispatch) =>{
  return gradeConfigurationServices.postGradeService(body).then(
      (response) => {
          gradesPostDispatcher(response,dispatch);
          
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);

            gradesPostError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const gradesPostDispatcher = (response,dispatch) =>{
  dispatch({
    type: GRADESPOST_SUCCESS,
    payload: response,
  });

}

const gradesPostError=(message,dispatch)=>{
  dispatch({
    type: GRADESPOST_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}

export const gradesEditAction = (body,roleId)=>(dispatch) =>{
  return gradeConfigurationServices.editGradeService(body,roleId).then(
      (response) => {
          gradeEditDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {
          const message = getErrorMessage(error);

            gradeEditError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const gradeEditDispatcher = (response,dispatch) =>{
  dispatch({
    type: GRADESEDIT_SUCCESS,
    payload: response,
  });

}

const gradeEditError=(message,dispatch)=>{
  dispatch({
    type: GRADESEDIT_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}

export const gradesDeleteAction = (gradeId)=>(dispatch) =>{
  return gradeConfigurationServices.deleteGradeService(gradeId).then(
      (response) => {
          gradeDeleteDispatcher(response,dispatch);
          return Promise.resolve(response);
        },
        (error) => {

            const message = getErrorMessage(error);

            gradeDeleteError(message,dispatch);
          return Promise.reject(message);
        }
  )
}

const gradeDeleteDispatcher = (response,dispatch) =>{
  dispatch({
    type: GRADESDELETE_SUCCESS,
    payload: response,
  });

}

const gradeDeleteError=(message,dispatch)=>{
  dispatch({
    type: GRADESDELETE_FAIL,
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
  });
}
