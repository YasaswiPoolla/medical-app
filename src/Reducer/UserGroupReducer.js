import {
  USERGROUP_FETCH_SUCCESS,
  USERGROUP_FETCH_FAIL,
  USERGROUP_POST_SUCCESS,
  USERGROUP_POST_FAIL,
  USERGROUP_DELETE_SUCCESS,
  USERGROUP_DELETE_FAIL,
  USERGROUP_EDIT_SUCCESS,
  USERGROUP_EDIT_FAIL,
  APPLICATION_MENU_FETCH_FAIL,
  APPLICATION_MENU_FETCH_SUCCESS
} from "../ActionTypes/UserGroupTypes";

const initialState = {
  userGroups: [],
  error: null,
  loading: false,
  applicationMenuList: [],
};

const userGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERGROUP_FETCH_SUCCESS:
      return {
        ...state,
        userGroups: action.payload,
        error: null,
        loading: false,
      };
    case USERGROUP_FETCH_FAIL:
      return {
        ...state,
        userGroups: [],
        error: action.payload,
        loading: false,
      };
      case APPLICATION_MENU_FETCH_SUCCESS:
        return {
          ...state,
          applicationMenuList: action.payload,
          error: null,
          loading: false,
        };
      case APPLICATION_MENU_FETCH_FAIL:
        return {
          ...state,
          applicationMenuList: [],
          error: action.payload,
          loading: false,
        };
    case USERGROUP_POST_SUCCESS:
      return {
        ...state,
        userGroups: [],
        error: null,
        loading: false,
      };
    case USERGROUP_POST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USERGROUP_DELETE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case USERGROUP_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case USERGROUP_EDIT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case USERGROUP_EDIT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userGroupReducer;
