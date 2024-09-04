import axios from "axios";
import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import secureLocalStorage from "react-secure-storage";
import {
  ADMIN_ID,
  AUTHORIZATION,
  HOSPITAL_ID,
  UNAUTHORIZED_STATUS,
  backDropStyle,
  getErrorStatus,
  getErrorMessage,
  SKIP_LOGIN_PATH,
  API_WARNING_STATUS_CODE,
  decodeErrorResponse,
} from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "../Actions/LoadingAction";
import ErrorSnack from "../ReUsable-Components/Error-Snack";
import WarnSnack from "../ReUsable-Components/Warning-Snack";

const REACT_APP_MEDICAL_BASE_API_URL = window.location.hostname.includes("qa")
  ? "https://medicalapp-identity-management-api-qa-xtkfste3yq-uc.a.run.app"
  : "https://medicalapp-identity-management-api-dev-xtkfste3yq-uc.a.run.app";

export  const REACT_APP_PROCESS_BASE_API_URL = window.location.hostname.includes("qa")
  ? "https://medicalapp-process-engine-api-qa-xtkfste3yq-uc.a.run.app"
  : "https://medicalapp-process-engine-api-dev-xtkfste3yq-uc.a.run.app";

export const Api = axios.create({
  baseURL: REACT_APP_MEDICAL_BASE_API_URL,
});

const getHeadersFromLocalStorage = () => {
  const headers = {
    HOSPITAL_ID: null,
    ADMIN_ID: null,
    AUTHORIZATION: null,
  };

  const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));

  if (storedData) {
    headers[HOSPITAL_ID] = storedData?.data?.body?.hospitalId || null;
    headers[ADMIN_ID] = storedData?.data?.body?.workerId || null;
    headers[AUTHORIZATION] = storedData?.headers?.token
      ? `Bearer ${storedData.headers.token}`
      : null;
  }

  return headers;
};

Api.interceptors.request.use(
  (config) => {
    const headers = getHeadersFromLocalStorage();
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const [warnMsg, setWarnMsg] = useState("");

  useEffect(() => {
    const handleClick = (event) => {
      if (isLoading) {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (isLoading) {
        event.preventDefault();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  const startLoading = () => {
    dispatch(loadingStart());
  };

  const endLoading = () => {
    dispatch(loadingEnd());
  };
  const handleWarnClose = () =>{
    setWarnOpen(false)
  }
  const handleApiErrors = (error) => {
    const customerCareNumber = "9001218767";
    const status = error?.response?.status;
    const arrayBufferResponse = error?.response?.data instanceof ArrayBuffer;
    let errMsg = "";
    if (!error?.request?.responseURL?.includes(SKIP_LOGIN_PATH)) {
      if (status >= 500) {
        errMsg = `Could not complete the request. Please reach out to customer care ${customerCareNumber}`;
      } else if (status >= 400) {
        if (arrayBufferResponse) {
          const errorResponse = decodeErrorResponse(error?.response?.data);
          errMsg = getErrorMessage(errorResponse);
        } else {
          errMsg = getErrorMessage(error) || "Resource not found.";
        }
      } else {
        errMsg = error?.message || "An error occurred.";
      }
      setIsErrorSnackOpen(true);
      setErrorMessage(errMsg);
    }
    if (getErrorStatus(error) === UNAUTHORIZED_STATUS) {
      sessionStorage.clear();
      localStorage.clear();
      window.history.replaceState(null, '', '/');
      window.location.reload();
    }
  };

  const handleApiResponse = (response) => {
    const status = response?.status;
    if (status === API_WARNING_STATUS_CODE) {
      setWarnMsg(response?.data?.errors?.[0]?.message);
      setWarnOpen(true);
    }
  };

  Api?.interceptors.request.use(
    function (config) {
      startLoading();
      return config;
    },
    function (error) {
      endLoading();
      return Promise.reject(error);
    }
  );

  Api.interceptors.response.use(
    function (response) {
      endLoading();
      handleApiResponse(response)
      return response;
    },
    function (error) {
      endLoading();
      handleApiErrors(error);
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Backdrop sx={backDropStyle} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ErrorSnack
        open={isErrorSnackOpen}
        onClose={setIsErrorSnackOpen}
        errorMessage={errorMessage}
      />

      <WarnSnack
        open={warnOpen}
        onClose={handleWarnClose}
        successMessage={warnMsg}
        className='mt-5 me-5'
      />
    </>
  );
};

export default Loader;
