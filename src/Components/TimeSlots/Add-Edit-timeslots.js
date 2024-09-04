import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import TimeInput from "react-time-picker-input";
import "react-time-picker-input/dist/components/TimeInput.css";
import { useDispatch } from "react-redux";
import {
  createTimeSlotPOSTAPI,
  requestTimeSlotsGetALL,
  updateTimeSlotPUTAPI,
} from "../../Actions/TimeSlotsAction";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import {
  SUCCESS,
  TIMESLOT_CREATE_SUCCESS_MESSAGE,
  TIMESLOT_UPDATE_SUCCESS_MESSAGE,
  COLON,
  time24FormatFn,
  timeFormatFn,
  ADD_TIME_TITLE,
  EDIT_TIME_TITLE,
  TIME_SLOT_ERROR,
  CANVAS_BOTTOM_STYLE,
  TIMESLOT_CANVAS_ID,
} from "../../Utils";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";

import secureLocalStorage from "react-secure-storage";

const AddTimeSlots = (props) => {
  let timeFormat = new Date().getHours() + COLON + new Date().getMinutes();
  const [errorMsg, setErrorMsg] = useState("");
  const starttimeEditDetails = props?.editDetails?.shiftStartTime;
  const endtimeEditDetails = props?.editDetails?.shiftEndTime;
  const timeEditDetails = props?.editDetails;
  const editFunction = props?.onEditTimeSlot;

  useEffect(() => {
    let startTime = timeFormat;
    setStartTime(
      starttimeEditDetails
        ? time24FormatFn(starttimeEditDetails)
        : time24FormatFn(startTime)
    );
    setEndTime(
      endtimeEditDetails
        ? time24FormatFn(endtimeEditDetails)
        : time24FormatFn(startTime)
    );
    setpropsStartTime(
      starttimeEditDetails ? time24FormatFn(starttimeEditDetails) : ""
    );
    setpropsEndTime(
      endtimeEditDetails ? time24FormatFn(endtimeEditDetails) : ""
    );
  }, [endtimeEditDetails, starttimeEditDetails, timeFormat ,props]);
  
  const [propsstartTime, setpropsStartTime] = useState("");
  const [propsendTime, setpropsEndTime] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const propsTimeSlotListFn = props?.timeSlotsFn;

  const shiftTimeSlotsListfn = () => {
    dispatch(requestTimeSlotsGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "timeSlotsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {}
    );
  };

  const dispatch = useDispatch();

  const submit = () => {
    let body;
    if (startTime !== endTime) {
      if (!timeEditDetails) {
        body = {
          shiftStartTime: timeFormatFn(startTime),
          shiftEndTime: timeFormatFn(endTime),
        };
        dispatch(createTimeSlotPOSTAPI(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            shiftTimeSlotsListfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      } else {
        let shiftUUID = props?.editDetails?.shiftTimeId;
        body = {
          shiftStartTime: timeFormatFn(startTime),
          shiftEndTime: timeFormatFn(endTime),
          shiftTimeId: shiftUUID,
        };

        dispatch(updateTimeSlotPUTAPI(body, shiftUUID)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            shiftTimeSlotsListfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      }
    } else {
      setErrorMsg(TIME_SLOT_ERROR);
      handleErrorClickInAnotherComponent();
    }
  };

  const clearPropsFn = () => {
    editFunction(null);
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

  const resetfn = () => {
    let startTime = timeFormat;

    setStartTime(
      starttimeEditDetails
        ? time24FormatFn(starttimeEditDetails)
        : time24FormatFn(startTime)
    );
    setEndTime(
      endtimeEditDetails
        ? time24FormatFn(endtimeEditDetails)
        : time24FormatFn(startTime)
    );
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleReload = () => {
    document.getElementById(TIMESLOT_CANVAS_ID)?.click();
    propsTimeSlotListFn();
    editFunction(null);
  };

  const cancelFn = () => {
    setStartTime(
      starttimeEditDetails
        ? time24FormatFn(starttimeEditDetails)
        : time24FormatFn(startTime)
    );
    setEndTime(
      endtimeEditDetails
        ? time24FormatFn(endtimeEditDetails)
        : time24FormatFn(startTime)
    );
    handleReload();
    setShowModal(false);
  };

  const currentTime = time24FormatFn(timeFormat);

  let cancelFun =
    (startTime === currentTime && endTime === currentTime) ||
    (propsstartTime === startTime && propsendTime === endTime);

  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={
            starttimeEditDetails
              ? TIMESLOT_UPDATE_SUCCESS_MESSAGE
              : TIMESLOT_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={errorMsg}
        />
        <span data-bs-dismiss="offcanvas" id={TIMESLOT_CANVAS_ID}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-4">
          <span className="titleHeader">
            {timeEditDetails ? EDIT_TIME_TITLE : ADD_TIME_TITLE}
          </span>

          {cancelFun ? (
            <img
              src={closeIcon}
              className="close-cursor"
              alt="img"
              data-bs-dismiss="offcanvas"
              onClick={clearPropsFn}
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
        <div className="d-flex justify-content-evenly">
          <div className="w-50 m-4">
            <label className="labels">Start Time </label>
            <span className="strike">*</span>
            <div className="mt-2">
              <TimeInput
                value={startTime}
                hour12Format
                eachInputDropdown
                manuallyDisplayDropdown
                onChange={(dateString) => setStartTime(dateString)}
                className="border"
              />
            </div>
          </div>

          <div className="w-50 m-4">
            <label className="labels">End Time</label>
            <span className="strike">*</span>
            <div className="mt-2">
              <TimeInput
                value={endTime}
                hour12Format
                eachInputDropdown
                manuallyDisplayDropdown
                onChange={(dateString) => setEndTime(dateString)}
                className="border"
              />
            </div>
          </div>
        </div>

        <div
          className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
          style={CANVAS_BOTTOM_STYLE}
        >
          <div
            onClick={resetfn}
            type="submit"
            className="reset-button align-items-center d-flex  justify-content-center rounded-2"
          >
            <span className="reset-text">Reset</span>
          </div>
          <div className="d-flex">
            {cancelFun ? (
              <div className="reset-button align-items-center d-flex px-3  justify-content-center rounded-2">
                <span
                  className={"reset-text"}
                  data-bs-dismiss="offcanvas"
                  onClick={clearPropsFn}
                >
                  Cancel
                </span>
              </div>
            ) : (
              <div
                className="reset-button align-items-center d-flex px-3  justify-content-center rounded-2"
                onClick={handleShowModal}
              >
                <span className={"reset-text"}>Cancel</span>
              </div>
            )}
            <div
              className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
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

export default AddTimeSlots;
