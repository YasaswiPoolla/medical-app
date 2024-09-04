
import {Api} from '../Interceptor/Interceptor';

export const requestDepartmentListGETAll=(currentPage, itemsPerPage,searchTerm)=>{
    return Api.get('/department',{params:{
        'pageNumber':currentPage,
        'size':itemsPerPage,
        'searchTerm':searchTerm
    }
  });

};

export async function departmentListWithoutPagination(){
    return Api.get('/department/list',);

};


export async function createDepartmentConfigPOSTAPI (body){
    return Api.post('/department',body);
};

export async function updateDepartmentConfigPUTAPI(body, departmentId){
    return Api.put(`/department?departmentId=${departmentId}`,body);
};
export async function deleteDepartmentConfigDeleteAPI(id) {
  return Api.delete(`/department/${id}`);
}

const DepartmentConfigService = {
  requestDepartmentListGETAll,
  createDepartmentConfigPOSTAPI,
  updateDepartmentConfigPUTAPI,
  departmentListWithoutPagination,
  deleteDepartmentConfigDeleteAPI,
};
export default DepartmentConfigService;

