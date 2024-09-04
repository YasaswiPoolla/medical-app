import {
    REQUESTOTP_SUCCESS,
    REQUESTOTP_FAIL,
    VALIDATEOTP_SUCCESS,
  } from '../ActionTypes/LoginTypes';
  
  import loginServices from '../Services/LoginService';
  import { getErrorMessage } from '../Utils';

  export const requestOTPAction = (phone) => (dispatch) => {
    return loginServices.requestOTPService(phone).then(
      (response) => {
        requestOtpDispatcher(response,dispatch);
        return Promise.resolve(response);
      },
      (error) => {

        const message = getErrorMessage(error);

          requestOtpError(message,dispatch);
        return Promise.reject(message);
      }
    );
  };
  
  export const validateOTPAction = (phone, otp) => (dispatch) => {
    return loginServices.validateOTPService(phone, otp).then(
      (response) => {
        validateOtpDispatcher(response,dispatch);
      return Promise.resolve(response);
      },
      (error) => {

       const message = getErrorMessage(error);
        
        
        return Promise.reject(message);
      }
    );
  };

  const requestOtpDispatcher = (response,dispatch) =>{
    dispatch({
      type: REQUESTOTP_SUCCESS,
      payload: response,
    });

  }

  const validateOtpDispatcher=(response,dispatch)=>{
      dispatch({
          type: VALIDATEOTP_SUCCESS,
          payload: response
        });  
  }

  const requestOtpError=(message,dispatch)=>{
        dispatch({
          type: REQUESTOTP_FAIL,
        });      
  }
