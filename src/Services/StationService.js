import {Api} from '../Interceptor/Interceptor';

export const requestStationGetALL= ()=> {
    return Api.get('/shift-station/shift-stations-data',);

};

export const requestStationGetALLSearch= (paramsData)=> {
    return Api.get('/shift-station/shift-stations-data',{params : paramsData});

};

export const creatStationPOST= (body) =>{
    return Api.post('/shift-station/shift-station-details',body);
    
};

export const updateStationPUT =(body,shiftStationId)=>{
    return Api.put(`/shift-station/shift-station-data-update?shiftStationId=${shiftStationId}`,body);  
};

export const deleteStationAPI =(shiftStationId)=>{
    return Api.delete(`/shift-station?stationIds=${shiftStationId}`);  
};

const StationService = {
    requestStationGetALL,
    requestStationGetALLSearch,
    creatStationPOST,
    updateStationPUT,
    deleteStationAPI
};
export default StationService;