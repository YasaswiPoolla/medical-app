import {
  USERGROUP_FETCH_SUCCESS,
  USERGROUP_FETCH_FAIL,
  USERGROUP_POST_SUCCESS,
  USERGROUP_POST_FAIL,
  USERGROUP_DELETE_SUCCESS,
  USERGROUP_DELETE_FAIL,
  USERGROUP_EDIT_SUCCESS,
  USERGROUP_EDIT_FAIL,
  APPLICATION_MENU_FETCH_SUCCESS,
  APPLICATION_MENU_FETCH_FAIL
} from "../ActionTypes/UserGroupTypes";

import userGroupServices from "../Services/userGroupsService";

const updatePageDetails = (currentPage,totalPages,dispatch)=>{ 
  dispatch({ type: 'SET_PAGINATION',
  payload: {currentPage,totalPages},
});
}

export const fetchUserGroups =
  (currentPage, itemsPerPage, searchTerm) => (dispatch) => {
    return userGroupServices
      .fetchUserGroupService(currentPage, itemsPerPage, searchTerm)
      .then(
        (response) => {
          dispatch({
            type: USERGROUP_FETCH_SUCCESS,
            payload: response.data,
          });
          updatePageDetails(response.data?.pageNo,response.data?.totalPages,dispatch);
        },
        (error) => {
          dispatch({
            type: USERGROUP_FETCH_FAIL,
            payload: error,
          });
        }
      );
  };

  export const fetchApplicationMenus =
  () => (dispatch) => {
    return userGroupServices
      .fetchApplicationMenuService()
      .then(
        (response) => {
          dispatch({
            type: APPLICATION_MENU_FETCH_SUCCESS,
            payload: response.data,
          });
        },
        (error) => {
          dispatch({
            type: APPLICATION_MENU_FETCH_FAIL,
            payload: error,
          });
        }
      );
  };

export const postUserGroup = (body) => (dispatch) => {
  return userGroupServices.postUserGroupService(body).then(
    (response) => {
      dispatch({
        type: USERGROUP_POST_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    },
    (error) => {
      dispatch({
        type: USERGROUP_POST_FAIL,
        payload: error,
      });
    }
  );
};

export const deleteUserGroup = (userGroupId) => (dispatch) => {
  return userGroupServices.deleteUserGroupService(userGroupId).then(
    (response) => {
      dispatch({
        type: USERGROUP_DELETE_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    },
    (error) => {
      dispatch({
        type: USERGROUP_DELETE_FAIL,
        payload: error,
      });
    }
  );
};

export const editUserGroup = (userGroupId, body) => (dispatch) => {
  return userGroupServices.editUserGroupService(userGroupId, body).then(
    (response) => {
      dispatch({
        type: USERGROUP_EDIT_SUCCESS,
        payload: response.data,
      });
      return Promise.resolve(response);
    },
    (error) => {
      dispatch({
        type: USERGROUP_EDIT_FAIL,
        payload: error,
      });
    }
  );
};
