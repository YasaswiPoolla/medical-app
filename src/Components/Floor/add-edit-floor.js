import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import {
  createFloorPOSTAPI,
  updateFloorPUTAPI,
} from "../../Actions/FloorAction";
import { useDispatch } from "react-redux";
import {
  FLOOR_CANVAS_ID,
  FLOOR_CREATE_SUCCESS_MESSAGE,
  FLOOR_UPDATE_SUCCESS_MESSAGE,
  SUCCESS,
  floorRegex,
  stationRegex,
  EDIT_FLOOR_TITLE,
  ADD_FLOOR_TITLE,
  FLOORNAME_ERROR,
  removeStationFromDepartmentName,
  CANVAS_BOTTOM_STYLE,
  ENTER_KEY,
} from "../../Utils";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import { MAX_LENGTH } from "../../Utils";
import { requestFloorGetALL } from "../../Actions/FloorAction";
import secureLocalStorage from "react-secure-storage";

const AddEditFloor = (props) => {
  const dispatch = useDispatch();

  const floorNameEditDetails = props?.editDetails?.shiftLocation;
  const floorEditDetails = props?.editDetails;

  useEffect(() => {
    setFloorName(floorNameEditDetails ? floorNameEditDetails : "");
  }, [floorNameEditDetails, props]);

  const [floorName, setFloorName] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const propsFloorListFn = props?.floorList;
  const editFunction = props?.onEditFloor;

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleChange = (e) => {
    const regex = floorRegex;

    if (e.target.value === "" || regex.test(e.target.value)) {
      setFloorName(e.target.value);
    }
    setError("");
  };
  const floorListsfn = () => {
    dispatch(requestFloorGetALL()).then(
      (response) => {
        secureLocalStorage.setItem(
          "floorsList",
          JSON.stringify(response?.data)
        );
      },
      (error) => {}
    );
  };

  const submit = () => {
    if (removeStationFromDepartmentName(floorName, stationRegex)) {
      let body;

      if (!floorEditDetails) {
        body = {
          shiftLocation: removeStationFromDepartmentName(
            floorName,
            stationRegex
          ),
        };
        dispatch(createFloorPOSTAPI(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            floorListsfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      } else {
        let shiftLocationId = props?.editDetails?.shiftLocationId;
        body = {
          shiftLocation: removeStationFromDepartmentName(
            floorName,
            stationRegex
          ),
          shiftLocationId: shiftLocationId,
        };

        dispatch(updateFloorPUTAPI(body, shiftLocationId)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            floorListsfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      }
      setError("");
    } else {
      setError(FLOORNAME_ERROR);
    }
  };

  const clearPropsfn = () => {
    setError("");
    editFunction(null);
  };

  const clearProps = () => {
    handleShowModal();
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };

  const handleReload = () => {
    document.getElementById(FLOOR_CANVAS_ID)?.click();
    propsFloorListFn();
    editFunction(null);
  };

  const resetfn = () => {
    setError("");
    setFloorName(floorNameEditDetails ? floorNameEditDetails : "");
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

  const cancelfn = () => {
    setFloorName(floorNameEditDetails ? floorNameEditDetails : "");
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
            floorNameEditDetails
              ? FLOOR_UPDATE_SUCCESS_MESSAGE
              : FLOOR_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={errorMsg}
        />
        <span data-bs-dismiss="offcanvas" id={FLOOR_CANVAS_ID}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {floorEditDetails ? EDIT_FLOOR_TITLE : ADD_FLOOR_TITLE}
          </span>
          {!floorName || floorName === props?.editDetails?.shiftLocation ? (
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
            <label className="labels">Floor Name</label>
            <span className="strike">*</span>
            <div className="mt-1">
              <input
                placeholder="Enter Floor Name"
                value={floorName}
                className={`w-100 form-control  ${error ? "errorfocus" : "inputfocus"}`}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
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
            <div className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2">
              {!floorName || floorName === props?.editDetails?.shiftLocation ? (
                <span
                  className="reset-text"
                  data-bs-dismiss="offcanvas"
                  onClick={clearPropsfn}
                >
                  Cancel
                </span>
              ) : (
                <span className="reset-text" onClick={handleShowModal}>
                  Cancel
                </span>
              )}
            </div>
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
          resetCancel={cancelfn}
        />
      </div>
    </>
  );
};
export default AddEditFloor;
