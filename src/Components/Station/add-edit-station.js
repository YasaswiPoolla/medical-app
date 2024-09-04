import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import { useDispatch } from "react-redux";
import {
  createStationPOSTAPI,
  updateStationPUTAPI,
} from "../../Actions/StationAction";
import {
  STATION_CANVAS_ID,
  ADD_STATION_TITLE,
  EDIT_STATION_TITLE,
  STATION_NAME_ERROR,
  SUCCESS,
  STATION_CREATE_SUCCESS_MESSAGE,
  STATION_UPDATE_SUCCESS_MESSAGE,
  station1Regex,
  stationRegex,
  removeStationFromDepartmentName,
  CANVAS_BOTTOM_STYLE,
  ENTER_KEY,
  MAX_STATION_NAME_LENGTH,
} from "../../Utils";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import { requestStationGetALL } from "../../Actions/StationAction";
import secureLocalStorage from "react-secure-storage";

const AddEditStation = (props) => {
  const dispatch = useDispatch();

  const stationNameEditDetails = props?.editDetails?.stationName;
  const stationIdEditDetails = props?.editDetails?.shiftStationId;
  const stationEditDetails = props?.editDetails;
  const editFunction = props?.onEditStation;

  useEffect(() => {
    setStationName(stationNameEditDetails ? stationNameEditDetails : "");
  }, [stationNameEditDetails, props]);

  const [stationName, setStationName] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const propsStationListFn = props?.stationListsFn;

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleChange = (e) => {
    const regex = station1Regex;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setStationName(e.target.value);
    }

    setError("");
  };

  const shiftStationListsfn = () => {
    dispatch(requestStationGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "stationsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {}
    );
  };

  const submit = () => {
    if (removeStationFromDepartmentName(stationName, stationRegex)) {
      let body;

      if (!stationEditDetails) {
        body = {
          stationName: removeStationFromDepartmentName(
            stationName,
            stationRegex
          ),
        };
        dispatch(createStationPOSTAPI(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            shiftStationListsfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      } else {
        let shiftStationId = props?.editDetails?.shiftStationId;
        body = {
          stationName: removeStationFromDepartmentName(
            stationName,
            stationRegex
          ),
          shiftStationId: shiftStationId,
        };

        dispatch(updateStationPUTAPI(body, shiftStationId)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            shiftStationListsfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      }
      setError("");
    } else {
      setError(STATION_NAME_ERROR);
    }
  };

  const clearProps = () => {
    handleShowModal();
  };

  const clearPropsfn = () => {
    setError("");
    editFunction(null);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleReload = () => {
    document.getElementById(STATION_CANVAS_ID)?.click();
    propsStationListFn();
    editFunction(null);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };

  const resetfn = () => {
    setError("");
    setStationName(stationNameEditDetails ? stationNameEditDetails : "");
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const cancelFn = () => {
    setStationName(stationNameEditDetails ? stationNameEditDetails : "");
    handleReload();
    setShowModal(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === ENTER_KEY) {
      submit();
    }
  };

  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={
            stationIdEditDetails
              ? STATION_UPDATE_SUCCESS_MESSAGE
              : STATION_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={errorMsg}
        />
        <span data-bs-dismiss="offcanvas" id={STATION_CANVAS_ID}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {stationEditDetails ? EDIT_STATION_TITLE : ADD_STATION_TITLE}
          </span>
          {!stationName || stationName === stationNameEditDetails ? (
            <img
              src={closeIcon}
              className="close-cursor"
              alt="img"
              data-bs-dismiss="offcanvas"
              onClick={clearPropsfn}
            />
          ) : (
            <img
              src={closeIcon}
              className="close-cursor"
              onClick={clearProps}
              alt="img"
            />
          )}
        </div>
        <div className="d-flex">
          <div className="w-100 m-3">
            <label className="labels">Station Name</label>
            <span className="strike">*</span>
            <div className="mt-1">
              <input
                placeholder="Enter Station Name"
                value={stationName}
                className={`w-100 form-control  ${error ? "errorfocus" : "inputfocus"}`}
                onChange={handleChange}
                maxLength={MAX_STATION_NAME_LENGTH}
                onKeyDown={handleKeyPress}
              />
            </div>
            <span className="error">{error}</span>
          </div>
        </div>
        <div
          className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
          style={CANVAS_BOTTOM_STYLE}
        >
          <div
            className="reset-button align-items-center d-flex  justify-content-center rounded-2"
            onClick={resetfn}
          >
            <span className="reset-text">Reset</span>
          </div>
          <div className="d-flex">
            {!stationName || stationName === stationNameEditDetails ? (
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
              <div className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2">
                <span className="reset-text" onClick={handleShowModal}>
                  Cancel
                </span>
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

export default AddEditStation;
