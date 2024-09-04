import {Api} from '../Interceptor/Interceptor';

export const requestFloorGetALL= () => {
     return Api.get('/shift-location/shift-locations-data');
};

export const requestFloorGetALLSearch= (paramsData) => {
    return Api.get('/shift-location/shift-locations-data',{params : paramsData});
};

export const creatFloorPOST =(body)=>  {
    return Api.post('/shift-location/shift-location-details',body);
};

export const updateFloorPUT =(body,shiftLocationId)=> {
    return Api.put(`shift-location/shift-location-data-update?shiftLocationId=${shiftLocationId}`,body);   
};

export const deleteFloorAPI =(shiftLocationId)=> {
    return Api.delete(`shift-location?locationIds=${shiftLocationId}`);   
};

const floorService = {
    requestFloorGetALL,
    requestFloorGetALLSearch,
    creatFloorPOST,
    updateFloorPUT,
    deleteFloorAPI
};
export default floorService;


