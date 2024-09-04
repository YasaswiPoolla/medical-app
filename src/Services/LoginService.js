import {Api} from '../Interceptor/Interceptor';

const requestOTPService = (phone) => {
   return Api.post(`/login/one-time-password?phoneNumber=${phone}`);
    
  };

const validateOTPService = (phone,otp)=>{
  return Api.get(`/login/auth?phoneNumber=${phone}&otp=${otp}`);

}
  const loginServices = {
    requestOTPService,
   validateOTPService
 };
  export default loginServices;
