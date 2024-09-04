import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Logo from "../../Assets/unifyLoginLogo.svg";
import secureLocalStorage from "react-secure-storage";
import "./Login.css";
import { requestTimeSlotsGetALL } from "../../Actions/TimeSlotsAction";
import { requestStationGetALL } from "../../Actions/StationAction";
import { requestFloorGetALL } from "../../Actions/FloorAction";
import { requestOTPAction, validateOTPAction } from "../../Actions/LoginAction";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import WarnSnack from "../../ReUsable-Components/Warning-Snack";
import LoginSnack from "../../ReUsable-Components/Login-Snack";
import {
  SUCCESS,
  loginRegex,
  CLICK_AWAY_EVENT,
  OTPWARNING_MESSAGE,
  OTPEXPIRED_MESSAGE,
  otpStyle,
  loginImageWidth,
  loginPageWidth,
} from "../../Utils";
import {
  rolesList,
  departmentList,
  gradesList,
} from "../../Actions/AdminStaffManagementActions";
import { requestWorkerListGetALL } from "../../Actions/RosterManagementAction";
import { TIMER_TIME, LOGIN_DIV_WIDTH } from "../../Utils";

let path = "/admin-staff-list";

export const Login = (props) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isDivVisible, setIsDivVisible] = useState(false);
  const [loginForm, setloginForm] = useState({
    userName: "",
  });
  const [otp, setOtp] = useState("");
  const [open, setOpen] = React.useState(false);
  const [warnOpen, setWarnOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [seconds, setSeconds] = useState(TIMER_TIME); // eslint-disable-line
  const [timeout, setTimeout] = useState("");
  const [warnMsg, setWarnMsg] = useState("");

  const Timer = () => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(intervalId);
          setTimeout(true);
          setWarnMsg(OTPEXPIRED_MESSAGE);

          return TIMER_TIME;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));
    if (storedData?.headers?.token) {
      navigate(path);
    }
  }, [navigate]);

  const handleWarnClose = (event, reason) => {
    if (reason === CLICK_AWAY_EVENT) {
      return;
    }
    setWarnOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === CLICK_AWAY_EVENT) {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const regex = loginRegex;
    if (value === "" || regex.test(value)) {
      setloginForm({ ...loginForm, [name]: value });
    }
  };

  const sendOTP = () => {
    dispatch(requestOTPAction(loginForm.userName)).then(
      (response) => {
        if (response?.data?.status === SUCCESS) {
          Timer();
          setIsDivVisible(!isDivVisible);
          setWarnMsg(OTPWARNING_MESSAGE);
          setWarnOpen(true);
        }
      },
      (error) => {
        setOpen(true);
        setErrorMsg(error);
        setWarnOpen(false);
      }
    );
  };

  const resendOTP = () => {
    setOtp("");
    dispatch(requestOTPAction(loginForm.userName)).then(
      (response) => {
        if (response?.data?.status === SUCCESS) {
          setTimeout(false);
          setWarnMsg(OTPWARNING_MESSAGE);

          Timer();
          setWarnOpen(true);
        }
      },
      (error) => {
        setOpen(true);
      }
    );
  };

  const roleDepartmentListfn = () => {
    dispatch(rolesList()).then(
      (response) => {
        if (response.data.status === SUCCESS) {
          secureLocalStorage.setItem(
            "rolesList",
            JSON.stringify(response?.data?.body)
          );
        }
      },
      (error) => {
        setErrorMsg(error);
      }
    );
    dispatch(departmentList()).then(
      (response) => {
        if (response.data.status === SUCCESS) {
          secureLocalStorage.setItem(
            "departmentsList",
            JSON.stringify(response?.data?.body)
          );
        }
      },
      (error) => {
        setErrorMsg(error);
      }
    );
    dispatch(gradesList()).then(
      (response) => {
        if (response.data.status === SUCCESS) {
          secureLocalStorage.setItem(
            "gradesList",
            JSON.stringify(response?.data?.body)
          );
        }
      },
      (error) => {
        setErrorMsg(error);
      }
    );
  };

  const workerListFn = () => {
    dispatch(requestWorkerListGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "workersList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {
        setErrorMsg(error);
      }
    );
  };

  const shiftTimeSlotsListfn = () => {
    dispatch(requestTimeSlotsGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "timeSlotsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {
        setErrorMsg(error);
      }
    );
  };

  const shiftStationListsfn = () => {
    dispatch(requestStationGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "stationsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {
        setErrorMsg(error);
      }
    );
  };

  const floorListsfn = () => {
    dispatch(requestFloorGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "floorsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {
        setErrorMsg(error);
      }
    );
  };

  const onLogin = (e) => {
    e.preventDefault();
  };

  const verifyOTP = () => {
    dispatch(validateOTPAction(loginForm.userName, otp)).then(
      (response) => {
        if (response?.data?.status === SUCCESS) {
          secureLocalStorage.setItem("reactlocal", JSON.stringify(response));
          roleDepartmentListfn();
          workerListFn();
          shiftTimeSlotsListfn();
          shiftStationListsfn();
          floorListsfn();
          props.state.error = "";
          let path = "/admin-staff-list";
          navigate(path);
        }
      },
      (error) => {
        setErrorMsg(error);
        setOpen(true);
        setWarnOpen(false);
      }
    );
  };

  return (
    <>
      <div className="ng-container p-0">
        <div className="d-flex p-0 m-0">
          <div className="p-0 m-0 logo h-100" style={loginImageWidth}>
            <img src={Logo} alt="" className="w-100 h-100 sideimg" />

            <p className="copyright-text">
              All copyrights reserved @UnifyCare 2024
            </p>
          </div>
          <div
            className=" p-0 m-0 d-flex  justify-content-center align-items-center"
            style={loginPageWidth}
          >
            <div>
              <div>
                <div className="login-card">
                  <form onSubmit={onLogin}>
                    {!isDivVisible && (
                      <div>
                        <div className="ms-5">
                          <LoginSnack
                            open={open}
                            onClose={handleClose}
                            successMessage={errorMsg}
                          />
                        </div>
                        <div>
                          <text className="login-head m-0 p-0 login-lineheight">
                            Welcome back! Glad
                          </text>
                          <text className="login-head m-0 p-0">
                            to see you, Again!
                          </text>
                        </div>
                        <div style={LOGIN_DIV_WIDTH}>
                          <input
                            className="form-control login-input inputfocus mt-1"
                            placeholder="Enter your Mobile No."
                            name="userName"
                            onChange={(e) => handleInputChange(e)}
                            value={loginForm.userName}
                            maxLength={10}
                          ></input>
                          <button onClick={sendOTP} className="login-btn mt-3">
                            Send OTP
                          </button>
                        </div>
                      </div>
                    )}
                    {isDivVisible && (
                      <div>
                        <div className="warnstyle">
                          {!warnOpen ? (
                            <div className="me-5">
                              <LoginSnack
                                open={open}
                                onClose={handleClose}
                                successMessage={errorMsg}
                                className="me-5"
                              />
                            </div>
                          ) : (
                            <>
                              <WarnSnack
                                open={warnOpen}
                                onClose={handleWarnClose}
                                successMessage={warnMsg}
                              />
                            </>
                          )}
                        </div>
                        <span className="otp-head">
                          OTP Verification<br></br>
                        </span>
                        <p className="otp-subhead mt-1">
                          Enter the Verification code we just sent on your email
                          address
                        </p>

                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          inputType="tel"
                          renderSeparator={
                            <span style={{ marginRight: "10px" }}></span>
                          }
                          renderInput={(props) => (
                            <input {...props} style={otpStyle} />
                          )}
                        />

                        <button className="verify-btn mt-3" onClick={verifyOTP}>
                          Verify
                        </button>
                        <p className="login-downtext mt-3">
                          Didn't received code?
                          {!timeout ? (
                            <span className={"login-downcalladmin_disabled"}>
                              &nbsp;Resend
                            </span>
                          ) : (
                            <span
                              className={"login-downcalladmin"}
                              onClick={resendOTP}
                            >
                              &nbsp;Resend
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    state: store.loginReducer,
  };
};

export default connect(mapStateToProps)(Login);
