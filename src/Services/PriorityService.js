import { Api, REACT_APP_PROCESS_BASE_API_URL } from "../Interceptor/Interceptor";
import { PRIORITY_API_END_POINT} from "./priorityApiEndPoints";

export const fetchPriorityService = (currentPage, itemsPerPage, searchTerm) => {
  return Api.get(`${REACT_APP_PROCESS_BASE_API_URL}${PRIORITY_API_END_POINT}`, {
    params: {
      pageNumber: currentPage,
      size: itemsPerPage,
      searchTerm: searchTerm,
      sortingOrder:'ASC'
    },
  });
  
};
export const deletPriorityService = (id) => {
  return Api.delete(`${REACT_APP_PROCESS_BASE_API_URL}${PRIORITY_API_END_POINT}/${id}`);
};
export const postPriorityService = (body) => {
  return Api.post(`${REACT_APP_PROCESS_BASE_API_URL}${PRIORITY_API_END_POINT}`,body);
};

export const editPriorityService = (body) => {
  return Api.put(
    `${REACT_APP_PROCESS_BASE_API_URL}${PRIORITY_API_END_POINT}`,
    body,
    {params: { priorityId: body?.priorityId },}
  );
};

const priorityServices = {
  fetchPriorityService,
  deletPriorityService,
  postPriorityService,
  editPriorityService
};
export default priorityServices;
