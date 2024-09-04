import {OPEN_CANVAS, OPEN_MODAL, REQUEST_STAFFLIST_FAIL, REQUEST_STAFFLIST_SUCCESS, RESET_FORM,EDIT_STAFFWORKER_FAILURE} from '../ActionTypes/AdminStaffActionTypes'


const initialStaffList = {
    staffListData :[],
    error:'',
    openModal:false,
    closeModal:false,
    openCanvas:false,
    resetFormData:false,

}


const staffManagementReducerFn = (state = initialStaffList , action) =>{

 switch(action.type){
    case REQUEST_STAFFLIST_SUCCESS :{
        return {
            ...state,
            error:null,
            staffListData:action.payload
        }
    }
    case REQUEST_STAFFLIST_FAIL :{
        return {
            ...state,
            staffListData:null,
            error: action.payload
        }
    }

    case EDIT_STAFFWORKER_FAILURE:{
        return{
            ...state,
            error:action.payload
        }

    }
    
    case OPEN_MODAL :{
        return {
            ...state,
            openModal:action.payload
        }
    }
    
    case OPEN_CANVAS :{
        return {
            ...state,
            openCanvas:action.payload
        }
    }
    case RESET_FORM :{
        return {
            ...state,
            resetFormData:action.payload
        }
    }
    default: {
        return { ...state };
    }

 }


}
export default staffManagementReducerFn;