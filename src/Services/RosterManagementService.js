import { Api } from "../Interceptor/Interceptor";
import { ARRAY_BUFFER_RESPONSE_TYPE, RESPONSE_TYPE_BLOB } from "../Utils";
import { ROASTER_MANAGEMENT_API_END_POINT, ROASTER_MANAGEMENT_CREATE_API_END_POINT, ROASTER_TEMPLATE_DOWNLOAD_ENDPOINT, ROASTER_TEMPLATE_UPLOAD_ENDPOINT, WORKERS_API_END_POINT } from "./roasterApiEndPoints";

export const requestRosterManagementListGetALL = (
  startDate,
  endDate,
  currentPage,
  itemsPerPage,
  searchTerm
) => {
  return Api.get(ROASTER_MANAGEMENT_API_END_POINT, {
    params: {
      pageNumber: currentPage,
      size: itemsPerPage,
      startDate: startDate,
      endDate: endDate,
      searchTerm: searchTerm,
    },
  });
};

export const requestWorkerListGetALL = (searchTerm) => {
  return Api.get(WORKERS_API_END_POINT, {
    params: {
      "search-term": searchTerm,
    },
  });
};

export const workerSearchWithRole = (roleId, searchTerm) => {
  return Api.get(WORKERS_API_END_POINT, {
    params: {
      "role-id": roleId,
      "search-term": searchTerm,
    },
  });
};

export const createRosterManagementPOSTAPI = (body) => {
  return Api.post(ROASTER_MANAGEMENT_CREATE_API_END_POINT, body);
};

export const updateRosterManagementPUTAPI = (body, rosterId) => {
  return Api.put(ROASTER_MANAGEMENT_API_END_POINT,body, {
    params: {
      rosterId: rosterId,
    },
  });
};

export const deleteRosterManagementDeleteAPI = (body, rosterId) => {
  return Api.delete(ROASTER_MANAGEMENT_API_END_POINT, {
    params: {
      rosterIds: rosterId,
    },
  });
};

export const roasterTemplateDownloadService = () => {
  return Api.get(ROASTER_TEMPLATE_DOWNLOAD_ENDPOINT, {
    responseType: RESPONSE_TYPE_BLOB,
  });
};

export const rosterTemplateUploadService = (file) =>{
  return Api.post(ROASTER_TEMPLATE_UPLOAD_ENDPOINT, file, {
    responseType: ARRAY_BUFFER_RESPONSE_TYPE,
  })
}

const RosterManagementService = {
  requestRosterManagementListGetALL,
  requestWorkerListGetALL,
  createRosterManagementPOSTAPI,
  updateRosterManagementPUTAPI,
  deleteRosterManagementDeleteAPI,
  workerSearchWithRole,
  rosterTemplateUploadService
};
export default RosterManagementService;
