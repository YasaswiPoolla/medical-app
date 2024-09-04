import {Api} from '../Interceptor/Interceptor';
import { ARRAY_BUFFER_RESPONSE_TYPE, RESPONSE_TYPE_BLOB } from '../Utils';
import { STAFF_API_ENTPOINT, STAFF_UPLOAD_TEMPLATE_ENDPOINT, TEMPLATE_DOWNLOAD_ENDPOINT } from './staffAPIEndpoints';

export const getAllStaffList=(currentPage,itemsPerPage,search)=>{
    return Api.get(STAFF_API_ENTPOINT,{params:{
        'pageNumber':currentPage,
        'size':itemsPerPage,
        'searchTerm':search
    }
});
}

export const templateDownloadService = () => {
  return Api.get(TEMPLATE_DOWNLOAD_ENDPOINT, {
    responseType: RESPONSE_TYPE_BLOB,
  });
};
 
export const templateUploadService = (file) => {
  return Api.post(STAFF_UPLOAD_TEMPLATE_ENDPOINT, file, {
    responseType: ARRAY_BUFFER_RESPONSE_TYPE,
  });
};

export const deleteStaffService=(workerid)=>{
  return Api.delete(`${STAFF_API_ENTPOINT}/${workerid}`);
}

export const getAllStaffListOnSearch=(search)=>{
    return Api.get(STAFF_API_ENTPOINT,{params:{
        'searchTerm':search
    }
});
}

 export const staffWorkerCreation = (payload)=>{
    return Api.post(STAFF_API_ENTPOINT,payload);
    
  }  

  export const staffWorkerEditService = (payload) => {
    return Api.put(STAFF_API_ENTPOINT, payload, {
      params: { "worker-id": payload?.workerId },
    });
  };


  
  export const managersListService=(searchterm,roleId,gradeName)=>{
    return Api.get('/manager/manager-tagging',
    {
      params:{
        'searchTerm':searchterm,
        'grade':gradeName,
        'roleId':roleId  
    }
    });
    
  } 

  export const rolesListServiceFn = ()=>{
    return Api.get('/roles/list',);
  } 
  export const departmentListService = ()=>{
    return Api.get('/department/list');
  } 
  
  export const gradesListService = ()=>{
    return Api.get('/employee-grades/list');
  } 