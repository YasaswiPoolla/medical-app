import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_CURRENT_PAGE, SET_PAGINATION, NEXT_PAGE, PREV_PAGE, ITEMS_PER_PAGE, DEFAULT_PAGE,SEARCH_TERM } from "../Utils";

const initialState = {
  currentPage: DEFAULT_CURRENT_PAGE,
  totalPages: 1,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  isLoading: false,
  error: null,
  data: [],
  searchTerm:''
};

export const setPagination = (currentPage, totalPages, dispatch) => {
  dispatch({ type: SET_PAGINATION, payload: { currentPage, totalPages } });
};

export const nextPage = (dispatch, currentPage) => {
 
  dispatch({
    type: NEXT_PAGE,
    payload: { currentPage },
  });
  initialState.currentPage = currentPage;
};

export const prevPage = (dispatch) => {
  dispatch({
    type: PREV_PAGE,
  });
};
export const itemsPerPage = (dispatch, itemsPerPage) => {
  dispatch({
    type: ITEMS_PER_PAGE,
    payload: itemsPerPage,
  });
};
export const defaultPage = (dispatch) => {
  dispatch({
    type: DEFAULT_PAGE,
  });
};

const PaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGINATION:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case NEXT_PAGE:
       
      return {
        ...state,
        currentPage:
          action.payload.currentPage === 0
            ? action.payload.currentPage
            : action.payload.currentPage - 1 ,
      };
    case ITEMS_PER_PAGE:
      return {
        ...state,
        currentPage: DEFAULT_CURRENT_PAGE,
        totalPages: action.payload.totalPages,
        itemsPerPage: action.payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case DEFAULT_PAGE:
      return {
        ...state,
        currentPage: DEFAULT_CURRENT_PAGE,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      };
    case SEARCH_TERM: 
      return{
        ...state,
        searchTerm:action.payload,
        currentPage:DEFAULT_CURRENT_PAGE
      }
    default:
      return state;
  }
};

export default PaginationReducer;
