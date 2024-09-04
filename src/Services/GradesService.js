import {Api} from '../Interceptor/Interceptor';
import { GRADES_API_END_POINT } from './gradeApiEndPoints';

export const fetchGradeService = (currentPage,itemsPerPage,searchTerm)=>{
    return Api.get(GRADES_API_END_POINT, {
      params: {
        pageNumber: currentPage,
        size: itemsPerPage,
        searchTerm: searchTerm,
      },
    });
}

export const fetchGradeServiceSearch = (paramsData)=>{
  return Api.get('/employee-grades',{params : paramsData})
}

export const postGradeService=(payload)=>{
    return Api.post('/employee-grades',payload)

}

export const editGradeService = (payload,gradeId)=>{
    return Api.put(`employee-grades/${gradeId}`,
    payload);
  }

  const deleteGradeService = (gradeId) => {
    return Api.delete(`employee-grades/${gradeId}`);
  };
const gradeConfigurationServices = {
    fetchGradeService,fetchGradeServiceSearch,
    postGradeService,
    editGradeService,
    deleteGradeService
  };
export default gradeConfigurationServices;