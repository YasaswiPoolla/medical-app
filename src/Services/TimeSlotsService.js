import {Api} from '../Interceptor/Interceptor';
export async function requestTimeSlotsGetALL () {
    let response = await Api.get('/shift-timeMaster/shift-TimeMasters-data',);
    return response;
};

export async function requestTimeSlotsGetALLSearch (paramsData) {
    let response = await Api.get('/shift-timeMaster/shift-TimeMasters-data',{params:paramsData});
    return response;
};

export async function creatTimeSlotPOST (body){
    let response = await Api.post('/shift-timeMaster/shift-timeMaster-details',body);
    return response;
};

export async function updateTimeSlotPUT  (body,shiftUUID) {
    let response = await Api.put(`shift-timeMaster/shift-timeMaster-data-update?shiftTimeId=${shiftUUID}`,body);
    return response;
};

export async function deleteTimeSlotsAPI  (shiftUUID) {
    let response = await Api.delete(`shift-timeMaster?timeMasterIds=${shiftUUID}`);
    return response;
};

const TimeSlotsServices = {
    requestTimeSlotsGetALL,
    requestTimeSlotsGetALLSearch,
    creatTimeSlotPOST,
    updateTimeSlotPUT,
    deleteTimeSlotsAPI
};
export default TimeSlotsServices;