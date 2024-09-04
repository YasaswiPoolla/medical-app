import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
// import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import {
  createRosterManagementPOTAPI,
  fetchWorkerWithRoleAction,
  updateRosterManagementPUTAPI,
} from "../../Actions/RosterManagementAction";

import { roleSearchFetchAction } from "../../Actions/RoleConfigurationAction";
import DatePicker from "react-multi-date-picker";
import {
  CANVAS_BOTTOM_STYLE,
  ROASTER_CREATE_SUCCESS_MESSAGE,
  ROASTER_UPDATE_SUCCESS_MESSAGE,
  SUCCESS,
  WORKER_NAME_LENGTH,
  ADD_ROASTER_TITLE,
  EDIT_ROASTER_TITLE,
  END_DATE_ERROR,
  START_DATE_ERROR,
  SHIFT_TIME_ERROR,
  SHIFT_LOCATION_ERROR,
  STATION_NAME_ERROR,
  WORKER_NAME_ERROR,
  DATE_VALIDATION_ERROR,
  ROLE_NAME_ERROR,
  formatDate,
  DATE_FIELD_STYLE,
  DATE_RANGE_ERROR,
} from "../../Utils";
import {
  ROASTER_CANVAS_ID,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  ZERO,
} from "../../Utils";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import {
  ROASTER_WORKER_NAME,
  ROASTER_ROLENAME,
  ROASTER_LOCATION,
  ROASTER_WORKERID,
  ROASTER_STATIONNAME,
  ROASTER_TIMESLOTS,
} from "../../Utils";
import secureLocalStorage from "react-secure-storage";
import dropDownArrow from "../../Assets/Dropdown_arrow.svg";
import search from "../../Assets/search.svg";

const AddRosterManagement = (props) => {
  const dispatch = useDispatch();
  const [roleList, setRoleList] = useState([]);
  const [shiftTimeSlotLists, setShiftTimeSlotLists] = useState([]);
  const [stationLists, setStationLists] = useState([]);
  const [floorLists, setFloorDetailsLists] = useState([]);
  const [error, setErrors] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const propsRoasterListFn = props?.roasterManagementListsFn;
  const editFunction = props?.onEditRoster;
  const [searchTerm, setSearchTerm] = useState("");
  const [roleSearchTerm, setRoleSearchTerm] = useState("");
  const [filteredWorkerList, setFilteredWorkerList] = useState([]);
  const [filteredRoleList, setFilteredRoleList] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  

  const firstNameEditDetails = props?.editDetails?.firstName;
  const workerIdEditDetails = props?.editDetails?.workerId;
  const roleNameEditDetails = props?.editDetails?.role;
  const roleIdEditDetails = props?.editDetails?.roleId;
  const deptIdEditDetails = props?.editDetails?.departmentId;
  const timeIdEditDetails = props?.editDetails?.shiftTimeId;
  const startTimeEditDetails = props?.editDetails?.shiftStartTime;
  const endTimeEditDetails = props?.editDetails?.shiftEndTime;
  const stationNameEditDetails = props?.editDetails?.stationName;
  const stationIdEditDetails = props?.editDetails?.stationId;
  const floorNameEditDetails = props?.editDetails?.shiftLocation;
  const floorIdEditDetails = props?.editDetails?.locationId;
  const startDateEditDetails = props?.editDetails?.startDate;
  const endDateEditDetails = props?.editDetails?.endDate;
  const rosterIdEditDetails = props?.editDetails?.rosterId;
  const lastNameEditDetails = props?.editDetails?.lastName;
  const departmentNameEditDetails = props?.editDetails?.department;
  const roasterEditDetails = props?.editDetails;

  useEffect(
    () => {
      setRoleList(JSON.parse(secureLocalStorage.getItem("rolesList")));
      setFilteredRoleList(roleList);
      setShiftTimeSlotLists(
        JSON.parse(secureLocalStorage.getItem("timeSlotsList"))
      );
      setStationLists(JSON.parse(secureLocalStorage.getItem("stationsList")));
      setFloorDetailsLists(
        JSON.parse(secureLocalStorage.getItem("floorsList"))
      );

      setWorkerName({
        workerName: firstNameEditDetails
          ? firstNameEditDetails + " " + lastNameEditDetails
          : ROASTER_WORKER_NAME,
        workerId: workerIdEditDetails ? workerIdEditDetails : ROASTER_WORKERID,
        roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
        roleId: roleIdEditDetails ? roleIdEditDetails : "",
        departmentId: deptIdEditDetails ? deptIdEditDetails : "",
      });

      setRoleName({
        roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
        roleId: roleIdEditDetails ? roleIdEditDetails : "",
      });

      setShiftTimeSlots({
        shiftTimeSlots: firstNameEditDetails
          ? startTimeEditDetails + "-" + endTimeEditDetails
          : ROASTER_TIMESLOTS,
        shiftTimeId: timeIdEditDetails ? timeIdEditDetails : "",
      });
      setShiftStation({
        shiftStationName: stationNameEditDetails
          ? stationNameEditDetails
          : ROASTER_STATIONNAME,
        shiftStationId: stationIdEditDetails ? stationIdEditDetails : "",
      });
      setShiftLocation({
        shiftLocation: floorNameEditDetails
          ? floorNameEditDetails
          : ROASTER_LOCATION,
        locationId: floorIdEditDetails ? floorIdEditDetails : "",
      });
      setDateRange(roasterEditDetails?[new Date(startDateEditDetails),new Date(endDateEditDetails)]:[])
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  const initialValues = () => {
    setFilteredWorkerList([]);
    setWorkerName({
      workerName: firstNameEditDetails
        ? firstNameEditDetails + " " + lastNameEditDetails
        : ROASTER_WORKER_NAME,
      workerId: workerIdEditDetails ? workerIdEditDetails : ROASTER_WORKERID,
      roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
      roleId: roleIdEditDetails ? roleIdEditDetails : "",
      departmentId: departmentNameEditDetails ? departmentNameEditDetails : "",
    });
    setRoleName({
      roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
      roleId: roleIdEditDetails ? roleIdEditDetails : "",
    });
    setShiftTimeSlots({
      shiftTimeSlots: firstNameEditDetails
        ? startTimeEditDetails + "-" + endTimeEditDetails
        : ROASTER_TIMESLOTS,
      shiftTimeId: timeIdEditDetails ? timeIdEditDetails : "",
    });
    setShiftStation({
      shiftStationName: stationNameEditDetails
        ? stationNameEditDetails
        : ROASTER_STATIONNAME,
      shiftStationId: stationIdEditDetails ? stationIdEditDetails : "",
    });
    setShiftLocation({
      shiftLocation: floorNameEditDetails
        ? floorNameEditDetails
        : ROASTER_LOCATION,
      locationId: floorIdEditDetails ? floorIdEditDetails : "",
    });
    setDateRange(roasterEditDetails?[new Date(startDateEditDetails),new Date(endDateEditDetails)]:[])
  };

  const resetfn = () => {
    resetErrors();
    initialValues();
    setRoleSearchTerm("");
    setSearchTerm("");
    setFilteredRoleList(roleList);
    setFilteredWorkerList([]);
  };

  const clearPropsfn = () => {
    editFunction(null);
    resetErrors();
  };
  
  const onDateChange = (selectedDates) => {
    setDateRange([selectedDates[0]?.format(), selectedDates[1]?.format()]);
  };

  const [workerName, setWorkerName] = useState({
    workerName: firstNameEditDetails
      ? firstNameEditDetails + " " + lastNameEditDetails
      : ROASTER_WORKER_NAME,
    workerId: workerIdEditDetails ? workerIdEditDetails : ROASTER_WORKERID,
    roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
    roleId: roleIdEditDetails ? roleIdEditDetails : "",
    departmentId: departmentNameEditDetails ? departmentNameEditDetails : "",
  });

  const [roleName, setRoleName] = useState({
    roleName: roleNameEditDetails ? roleNameEditDetails : ROASTER_ROLENAME,
    roleId: roleIdEditDetails ? roleIdEditDetails : "",
  });

  const [shiftTimeSlots, setShiftTimeSlots] = useState({
    shiftTimeSlots: firstNameEditDetails
      ? startTimeEditDetails + "-" + endTimeEditDetails
      : ROASTER_TIMESLOTS,
    shiftTimeId: timeIdEditDetails ? timeIdEditDetails : "",
  });
  const [shiftStation, setShiftStation] = useState({
    shiftStationName: stationNameEditDetails
      ? stationNameEditDetails
      : ROASTER_STATIONNAME,
    shiftStationId: stationIdEditDetails ? stationIdEditDetails : "",
  });
  const [shiftLocation, setShiftLocation] = useState({
    shiftLocation: floorNameEditDetails
      ? floorNameEditDetails
      : ROASTER_LOCATION,
    locationId: floorIdEditDetails ? floorIdEditDetails : "",
  });
  const [dateValid, setDateValid] = useState(true);

  const handleChange = (e, label) => {
    switch (label) {
      case workerName.workerName:
        setWorkerName({
          workerName: e?.firstName + " " + e?.lastName,
          workerId: e?.workerId,
          roleName: e?.role,
          roleId: e?.roleId,
          departmentId: e?.department,
        });
        setSearchTerm("");
        setFilteredWorkerList([...filteredWorkerList]);
        resetErrors();
        break;

      case roleName.roleName:
        setRoleName({
          roleName: e?.role,
          roleId: e?.roleId,
        });
        setRoleSearchTerm("");
        setSearchTerm("");
        setFilteredRoleList(roleList);
        setWorkerName({
          workerName: `${ROASTER_WORKER_NAME}`,
        });
        fetchWorkerWithRole(e.roleId);
        resetErrors();
        break;

      case shiftTimeSlots.shiftTimeSlots:
        setShiftTimeSlots({
          shiftTimeSlots: e?.shiftStartTime + " - " + e?.shiftEndTime,
          shiftTimeId: e?.shiftTimeId,
        });
        resetErrors();
        break;

      case shiftStation.shiftStationName:
        setShiftStation({
          shiftStationName: e?.stationName,
          shiftStationId: e?.shiftStationId,
        });
        resetErrors();
        break;

      case shiftLocation.shiftLocation:
        setShiftLocation({
          shiftLocation: e?.shiftLocation,
          locationId: e?.shiftLocationId,
        });
        resetErrors();
        break;

      default:
        break;
    }
  };

  let errorsMsg = {};
  const validateValues = (
    workerName,
    roleName,
    shiftStation,
    shiftLocation,
    shiftTimeSlots,
    startDate,
    endDate
  ) => {
    if (!roleName?.roleId) {
      errorsMsg.roleName = ROLE_NAME_ERROR;
    }
    if (!workerName?.roleId) {
      errorsMsg.workerName = WORKER_NAME_ERROR;
    }
    if (!shiftStation?.shiftStationId) {
      errorsMsg.stationName = STATION_NAME_ERROR;
    }
    if (!shiftLocation?.locationId) {
      errorsMsg.shiftLocation = SHIFT_LOCATION_ERROR;
    }
    if (!shiftTimeSlots?.shiftTimeId) {
      errorsMsg.shiftTime = SHIFT_TIME_ERROR;
    }
    if (!startDate) {
      errorsMsg.startDate = START_DATE_ERROR;
    }
    if (!endDate) {
      errorsMsg.endDate = END_DATE_ERROR;
    }

    return errorsMsg;
  };

  const validateDates = (fromDate, toDate) => {
    const isValid = fromDate <= toDate;
    setDateValid(isValid);
  };

  let submitcdn =
    workerName?.workerId !== ROASTER_WORKERID &&
    shiftStation?.shiftStationId &&
    workerName?.roleId &&
    shiftLocation?.locationId &&
    workerName?.departmentId &&
    shiftTimeSlots?.shiftTimeId &&
    dateRange[0] !== new Date() &&
    dateRange[1] !== new Date() &&
    dateRange[0] !== (null || undefined) &&
    dateRange[1] !== (null || undefined);
  const submit = () => {
    setErrors(
      validateValues(
        workerName,
        roleName,
        shiftStation,
        shiftLocation,
        shiftTimeSlots,
        dateRange[0],
        dateRange[1]
      )
    );
    validateDates(dateRange[0],dateRange[1]);

    let payload = {};

    if (submitcdn) {
      if (dateValid) {
        if (!roasterEditDetails) {
          payload = {
            workerId: workerName?.workerId,
            stationId: shiftStation?.shiftStationId,
            locationId: shiftLocation?.locationId,
            departmentId: workerName?.departmentId,
            shiftTimeId: shiftTimeSlots?.shiftTimeId,
            roleId: roleName?.roleId,
            startDate: formatDate(dateRange[0]),
            endDate: formatDate(dateRange[1]),
          };
   

          dispatch(createRosterManagementPOTAPI(payload)).then(
            (response) => {
              if (response?.data?.status === SUCCESS) {
                handleClickInAnotherComponent();
              } else {
                setErrorMsg(response);
                handleErrorClickInAnotherComponent();
              }
            },
            (error) => {
              setErrorMsg(error);
              handleErrorClickInAnotherComponent();
            }
          );
        } else {
          payload = {
            rosterId: rosterIdEditDetails,
            workerId: roasterEditDetails?.workerId,
            departmentId: roasterEditDetails?.departmentId,
            roleId: roasterEditDetails?.roleId,
            stationId: shiftStation?.shiftStationId,
            locationId: shiftLocation?.locationId,
            shiftTimeId: shiftTimeSlots?.shiftTimeId,
            startDate: formatDate(dateRange[0]),
            endDate: formatDate(dateRange[1]),
          };
          dispatch(
            updateRosterManagementPUTAPI(payload, rosterIdEditDetails)
          ).then(
            (response) => {
              if (response?.data?.status === SUCCESS) {
                handleClickInAnotherComponent();
              } else {
                setErrorMsg(response);
                handleErrorClickInAnotherComponent();
              }
            },
            (error) => {
              setErrorMsg(error);
              handleErrorClickInAnotherComponent();
            }
          );
        }
      } else {
        handleErrorClickInAnotherComponent();
      }
    }
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchWorkerWithRole = (roleId, searchTerm) => {
    dispatch(fetchWorkerWithRoleAction(roleId, searchTerm)).then(
      (response) => {
        if (response?.data?.body) {
          setFilteredWorkerList([...response?.data?.body]);
        } else {
          setFilteredWorkerList([]);
        }
      },
      (error) => {
        setErrorMsg(error);
        handleErrorClickInAnotherComponent();
        setFilteredWorkerList([]);
      }
    );
  };

  const handleWorkerSearch = (e) => {
    if (searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO) {
      fetchWorkerWithRole(roleName?.roleId, searchTerm);
    }
  };

  const handleRoleSearch = (e) => {
    if (roleSearchTerm.length === 0) {
      setFilteredRoleList(roleList);
    } else if (roleSearchTerm?.length > MIN_SEARCH_LENGTH) {
      dispatch(roleSearchFetchAction(roleSearchTerm)).then(
        (response) => {
          setFilteredRoleList(response?.data?.body);
        },
        (error) => {
          setErrorMsg(error);
          handleErrorClickInAnotherComponent();
        }
      );
    }
  };

  const cancelFn = () => {
    resetErrors();
    initialValues();
    handleReload();
    setShowModal(false);
  };

  const resetErrors = () => {
    setErrors({});
  };
  const handleReload = () => {
    document.getElementById(ROASTER_CANVAS_ID)?.click();
    propsRoasterListFn();
    editFunction(null);
  };

  let cancelFunRoaster =
    (workerName?.workerName === ROASTER_WORKER_NAME &&
      roleName?.roleName === ROASTER_ROLENAME &&
      shiftLocation?.shiftLocation === ROASTER_LOCATION &&
      shiftStation?.shiftStationName === ROASTER_STATIONNAME &&
      shiftTimeSlots?.shiftTimeSlots === ROASTER_TIMESLOTS) ||
    (workerName?.workerId === workerIdEditDetails &&
      shiftTimeSlots?.shiftTimeId === timeIdEditDetails &&
      shiftStation?.shiftStationName === stationNameEditDetails &&
      shiftLocation?.shiftLocation === floorNameEditDetails);

  const handleKeyPress = (e) => {
    if (e?.key === ENTER_KEY) {
      submit();
    }
  };

  const filteredWorkerListLength = filteredWorkerList?.length > 0;

  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={
            rosterIdEditDetails
              ? ROASTER_UPDATE_SUCCESS_MESSAGE
              : ROASTER_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={!dateValid ? DATE_VALIDATION_ERROR : errorMsg}
        />

        <span data-bs-dismiss="offcanvas" id={ROASTER_CANVAS_ID}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-2 ms-1">
          <span className="titleHeader">
            {roasterEditDetails ? EDIT_ROASTER_TITLE : ADD_ROASTER_TITLE}
          </span>

          {cancelFunRoaster ? (
            <img
              src={closeIcon}
              data-bs-dismiss="offcanvas"
              className="close-cursor"
              onClick={clearPropsfn}
              alt="img"
            />
          ) : (
            <img
              src={closeIcon}
              className="close-cursor"
              onClick={handleShowModal}
              alt="img"
            />
          )}
        </div>

        <div className="m-2">
          <div className="d-flex">
            <div className="w-100 m-2">
              <label className="labels mt-1">Role</label>
              <span className="strike">*</span>
              <div className="mt-1 w-100">
                {roleIdEditDetails ? (
                  <input
                    className="form-control"
                    value={
                      roleName?.roleName.length > WORKER_NAME_LENGTH
                        ? roleName.roleName.substring(0, WORKER_NAME_LENGTH) +
                          "..."
                        : roleName.roleName
                    }
                    disabled
                  ></input>
                ) : (
                  <div
                    className={
                      error.roleName
                        ? "dropdown errorfocus mt-0 w-100"
                        : "dropdown inputfocus mt-0 w-100"
                    }
                    tabindex="0"
                  >
                    <div
                      className="event-dropdown "
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span
                        className={
                          roleName?.roleName === ROASTER_ROLENAME
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {roleName?.roleName.length > WORKER_NAME_LENGTH
                          ? roleName.roleName.substring(0, WORKER_NAME_LENGTH) +
                            "..."
                          : roleName.roleName}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>

                    {filteredRoleList?.length > 0 && (
                      <ul className="dropdown-menu roasterdropsize thin-scrollbar w-100">
                        <div className="d-flex">
                          <img src={search} className="ms-2" alt="img" />
                          <input
                            type="text"
                            className=" managersearch ms-2 viewName"
                            name="search"
                            placeholder="Enter Role"
                            onChange={(e) => setRoleSearchTerm(e.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === ENTER_KEY) {
                                handleRoleSearch();
                              }
                            }}
                            value={roleSearchTerm}
                          />
                        </div>
                        {filteredRoleList?.map((item, index) => {
                          return (
                            <li key={index}>
                              <span
                                onClick={() =>
                                  handleChange(item, roleName.roleName)
                                }
                                className={
                                  roleName?.roleName === ROASTER_WORKER_NAME
                                    ? "dropdown-item close-cursor viewName"
                                    : "dropdown-item close-cursor viewLabel"
                                }
                              >
                                {item?.role}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
                {error.roleName ? (
                  <p className="error">{error.roleName}</p>
                ) : null}
              </div>
            </div>
            <div className="w-100 m-2">
              <label className="labels">Worker Name</label>
              <span className="strike">*</span>
              <div className="mt-1 w-100">
                {rosterIdEditDetails ? (
                  <input
                    className="form-control"
                    value={
                      workerName?.workerName.length > WORKER_NAME_LENGTH
                        ? workerName.workerName.substring(
                            0,
                            WORKER_NAME_LENGTH
                          ) + "..."
                        : workerName.workerName
                    }
                    disabled
                  ></input>
                ) : (
                  <div
                    className={
                      error?.workerName
                        ? "dropdown errorfocus mt-0 w-100"
                        : "dropdown inputfocus mt-0 w-100"
                    }
                    href="#"
                    tabindex="0"
                  >
                    <div
                      className={
                        filteredWorkerList?.length > 0
                          ? "event-dropdown "
                          : "event-dropdown no-events"
                      }
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span
                        className={
                          workerName?.workerName === ROASTER_WORKER_NAME
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel  justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {workerName?.workerName.length > WORKER_NAME_LENGTH
                          ? workerName?.workerName.substring(
                              0,
                              WORKER_NAME_LENGTH
                            ) + "..."
                          : workerName.workerName}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>

                    <ul
                      className={`dropdown-menu roasterdropsize thin-scrollbar w-100 ${
                        filteredWorkerListLength ? "no-border" : ""
                      }`}
                    >
                      {filteredWorkerListLength && (
                        <div className="d-flex">
                          <img src={search} className="ms-2" alt="img" />
                          <input
                            type="text"
                            className=" managersearch ms-2 viewName"
                            name="inputSearch"
                            placeholder="Enter Worker Name"
                            onChange={handleInputSearch}
                            onKeyDown={(event) => {
                              if (event.key === ENTER_KEY) {
                                handleWorkerSearch();
                              }
                            }}
                            value={searchTerm}
                          />
                        </div>
                      )}
                      {filteredWorkerList?.map((item, index) => {
                        return (
                          <li key={index}>
                            <span
                              onClick={() =>
                                handleChange(item, workerName.workerName)
                              }
                              className={
                                workerName?.workerName === ROASTER_WORKER_NAME
                                  ? "dropdown-item close-cursor viewName"
                                  : "dropdown-item close-cursor viewLabel"
                              }
                            >
                              {item?.firstName + " " + item?.lastName}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              {error?.workerName ? (
                <p className="error">{error.workerName}</p>
              ) : null}
            </div>
          </div>

          <div className="d-flex mt-1">
            <div className="w-100 m-2">
              <label className="labels mt-1">Shift Location</label>
              <span className="strike">*</span>
              <div
                className={
                  error.shiftLocation
                    ? "dropdown errorfocus mt-0 w-100"
                    : "dropdown inputfocus mt-0 w-100"
                }
              >
                <div
                  className="dropdown mt-0 w-100"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabindex="0"
                  onKeyDown={handleKeyPress}
                >
                  {rosterIdEditDetails ? (
                    <div className="event-dropdown">
                      <span
                        className={
                          shiftLocation?.shiftLocation === ROASTER_LOCATION
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftLocation.shiftLocation}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="event-dropdown"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span
                        className={
                          shiftLocation?.shiftLocation === ROASTER_LOCATION
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftLocation.shiftLocation}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  )}
                  <ul className="dropdown-menu dropdown-2 thin-scrollbar">
                    {floorLists?.body?.map((item, index) => {
                      return (
                        <li key={index}>
                          <span
                            className="dropdown-item close-cursor"
                            onClick={() =>
                              handleChange(item, shiftLocation.shiftLocation)
                            }
                          >
                            {item?.shiftLocation}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {error?.shiftLocation ? (
                <p className="error">{error.shiftLocation}</p>
              ) : null}
            </div>

            <div className="w-100 m-2">
              <label className="labels mt-1">Shift Station</label>
              <span className="strike">*</span>
              <div
                className={
                  error.stationName
                    ? "dropdown errorfocus mt-0 w-100"
                    : "dropdown inputfocus mt-0 w-100"
                }
              >
                <div
                  className="dropdown mt-0 w-100"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabindex="0"
                  onKeyDown={handleKeyPress}
                >
                  {rosterIdEditDetails ? (
                    <div className="event-dropdown">
                      <span
                        className={
                          shiftStation?.shiftStationName === ROASTER_STATIONNAME
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftStation?.shiftStationName}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="event-dropdown"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span
                        className={
                          shiftStation?.shiftStationName === ROASTER_STATIONNAME
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftStation?.shiftStationName}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  )}
                  <ul className="dropdown-menu dropdown-2 thin-scrollbar">
                    {stationLists?.body?.map((item, index) => {
                      return (
                        <li key={index}>
                          <span
                            className="dropdown-item close-cursor"
                            onClick={() =>
                              handleChange(item, shiftStation?.shiftStationName)
                            }
                          >
                            {item?.stationName}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {error?.stationName ? (
                <p className="error">{error.stationName}</p>
              ) : null}
            </div>
          </div>
          <div className="d-flex mt-1">
            <div className="w-100 m-2">
              <label className="labels mt-1">Shift Time Slots</label>
              <span className="strike">*</span>
              <div
                className={
                  error.shiftTime
                    ? "dropdown errorfocus mt-0 w-100"
                    : "dropdown inputfocus mt-0 w-100"
                }
              >
                <div
                  className="dropdown mt-0 w-100"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  tabindex="0"
                  onKeyDown={handleKeyPress}
                >
                  {rosterIdEditDetails ? (
                    <div className="event-dropdown">
                      <span
                        className={
                          shiftTimeSlots?.shiftTimeSlots === ROASTER_TIMESLOTS
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftTimeSlots.shiftTimeSlots}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="event-dropdown"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span
                        className={
                          shiftTimeSlots?.shiftTimeSlots === ROASTER_TIMESLOTS
                            ? "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewLabel justify-content-between"
                            : "d-flex text-align-center align-middle mt-1 ms-2 mb-1 p-1 viewName justify-content-between"
                        }
                      >
                        {shiftTimeSlots.shiftTimeSlots}
                        <img src={dropDownArrow} alt="" className="m-1" />
                      </span>
                    </div>
                  )}
                  <ul className="dropdown-menu dropdown-2 thin-scrollbar">
                    {shiftTimeSlotLists?.body?.map((item, index) => {
                      return (
                        <li key={index}>
                          <span
                            className="dropdown-item close-cursor"
                            onClick={() =>
                              handleChange(item, shiftTimeSlots.shiftTimeSlots)
                            }
                          >
                            {item?.shiftStartTime + " - " + item?.shiftEndTime}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {error?.shiftTime ? (
                <p className="error">{error.shiftTime}</p>
              ) : null}
            </div>
            <div className="w-100 m-2">
              <label className="labels mt-1">Date Range</label>
              <span className="strike">*</span>
              <div className="mt-0 w-100 viewName">
                <DatePicker
                  value={dateRange}
                  onChange={onDateChange}
                  range
                  style={DATE_FIELD_STYLE}
                  placeholder="Select Date Range"
                />
                {/* <DatePicker
                  className={
                    error.startDate
                      ? "errorfocus search_input viewName"
                      : "inputfocus search_input viewName"
                  }
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}

                {error?.startDate && error?.endDate ? (
                  <p className="error">{DATE_RANGE_ERROR}</p>
                ) : error?.startDate ? (
                  <p className="error">{error.startDate}</p>
                ) : (
                  <p className="error">{error.endDate}</p>
                )}
              </div>
            </div>
          </div>
          {/* <div className="d-flex mt-1">
            <div className="w-100 m-2">
              <label className="labels mt-1">To Date</label>
              <span className="strike">*</span>
              <div className="mt-1 w-100">
                <DatePicker
                  className={
                    error.endDate
                      ? "errorfocus search_input viewName"
                      : "inputfocus search_input viewName"
                  }
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
                {error?.endDate ? (
                  <p className="error">{error.endDate}</p>
                ) : null}
              </div>
            </div>
          </div> */}
        </div>

        <div
          className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-3"
          style={CANVAS_BOTTOM_STYLE}
        >
          <div
            onClick={resetfn}
            className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
          >
            <span className="reset-text">Reset</span>
          </div>
          <div className="d-flex">
            {cancelFunRoaster ? (
              <div className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2">
                <span
                  className="reset-text"
                  data-bs-dismiss="offcanvas"
                  onClick={clearPropsfn}
                >
                  Cancel
                </span>
              </div>
            ) : (
              <div
                className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                onClick={handleShowModal}
              >
                <span className="reset-text">Cancel</span>
              </div>
            )}
            <div
              className="save-button align-items-center ms-3 px-3 d-flex border justify-content-center rounded-2"
              type="submit"
              onClick={submit}
            >
              <span className="saveText">Save</span>
            </div>
          </div>
        </div>

        <CancelModal
          show={showModal}
          handleClose={handleCloseModal}
          resetCancel={cancelFn}
        />
      </div>
    </>
  );
};

export default AddRosterManagement;
