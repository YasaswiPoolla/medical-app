

import {Api} from '../Interceptor/Interceptor';
import { ROLES_API_END_POINT } from './roleApiEndPoints';

  
  export const fetchRoleService=(currentPage,itemsPerPage,searchTerm)=>{
  
    return Api.get('/roles',
    {params:{
      'pageNumber':currentPage,
      'size':itemsPerPage,
      'searchTerm':searchTerm
  }
  });
    };
  

    export const postRoleService =(body)=>{
    return Api.post('/roles',body);
  
  }
  
  export const deleteRoleService=(roleId) =>{
    return Api.delete(`/roles/${roleId}`);
    
  };
  
  
  export const editRoleService = (body, roleId) => {
    return Api.put(ROLES_API_END_POINT, body, {
      params: {
        roleId: roleId,
      },
    });
  };

  export const roleSearchService = (searchTerm) => {
    return Api.get(ROLES_API_END_POINT, {
      params: {
        searchTerm: searchTerm,
      },
    });
  };
  
  
    const loginServices = {
      fetchRoleService,
      postRoleService,
      deleteRoleService,
      editRoleService,
      roleSearchService
    };
    export default loginServices;