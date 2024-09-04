import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.png";
import { useDispatch } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import {
  DEPARTMENT_CANVAS_ID,
  DEPARTMENT_UPDATE_SUCCESS_MESSAGE,
  DEPARTMENT_CREATE_SUCCESS_MESSAGE,
  SUCCESS,
  stationRegex,
  removeStationFromDepartmentName,
  EDIT_DEPARTMENT_TITLE,
  ADD_DEPARTMENT_TITLE,
  DEPARTMENTNAME_ERROR,
  CANVAS_BOTTOM_STYLE,
  ENTER_KEY,
} from "../../Utils";
import {
  createDepartmentConfigPOSTAPI,
  updateDepartmentConfigPUTAPI,
} from "../../Actions/DepartmentConfigAction";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import secureLocalStorage from "react-secure-storage";
import { departmentList } from "../../Actions/AdminStaffManagementActions";

const AddDepartmentConfiguration = (props) => {
  const dispatch = useDispatch();

  const departmentNameEditDetails = props?.editDetails?.departmentName;
  const departmentEditDetails = props?.editDetails;
  const departmentIdEditDetails = props?.editDetails?.departmentId;

  useEffect(() => {
    setDepartmentName(
      departmentNameEditDetails ? departmentNameEditDetails : ""
    );
  }, [departmentNameEditDetails, props]);

  let userDetails = sessionStorage.getItem("user_details");
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const propsDeptList = props?.departmentLists;
  const editFunction = props?.onEditDepartment;

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleChange = (e) => {
    setDepartmentName(e.target.value);
    setError("");
  };
  const departmentListfn = () => {
    dispatch(departmentList()).then((response) => {
      if (response.data.status === SUCCESS) {
        secureLocalStorage.setItem(
          "departmentsList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };
  const submit = () => {
    if (removeStationFromDepartmentName(departmentName, stationRegex)) {
      let body;

      if (!departmentEditDetails) {
        body = {
          departmentName: removeStationFromDepartmentName(
            departmentName,
            stationRegex
          ),
        };
        dispatch(createDepartmentConfigPOSTAPI(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            handleClickInAnotherComponent();
            departmentListfn();
          } else {
            setErrorMsg(response);
            handleErrorClickInAnotherComponent();
          }
        });
      } else {
        let departmentId = departmentIdEditDetails;
        let hospitalId = userDetails
          ? JSON.parse(userDetails).hospitalId
          : null;
        body = {
          departmentName: removeStationFromDepartmentName(
            departmentName,
            stationRegex
          ),
          hospitalId: hospitalId,
          departmentId: departmentId,
        };

        dispatch(updateDepartmentConfigPUTAPI(body, departmentId)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              handleClickInAnotherComponent();
              departmentListfn();
            } else {
              setErrorMsg(response);
              handleErrorClickInAnotherComponent();
            }
          }
        );
      }
      setError("");
    } else {
      setError(DEPARTMENTNAME_ERROR);
    }
  };

  const clearPropsFn = () => {
    editFunction(null);
    resetfn();
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

  const resetfn = () => {
    setDepartmentName(
      departmentNameEditDetails ? departmentNameEditDetails : ""
    );
    setError("");
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

  const handleReload = () => {
    document.getElementById(DEPARTMENT_CANVAS_ID)?.click();
    propsDeptList();
    editFunction(null);
  };

  const cancelFn = () => {
    setDepartmentName(
      departmentNameEditDetails ? departmentNameEditDetails : ""
    );
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
            departmentIdEditDetails
              ? DEPARTMENT_UPDATE_SUCCESS_MESSAGE
              : DEPARTMENT_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={errorMsg}
        />
        <span data-bs-dismiss="offcanvas" id={DEPARTMENT_CANVAS_ID}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {departmentEditDetails
              ? EDIT_DEPARTMENT_TITLE
              : ADD_DEPARTMENT_TITLE}
          </span>
          {!departmentName ||
          departmentName === props?.editDetails?.departmentName ? (
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
              onClick={clearProps}
              alt="img"
            />
          )}
        </div>
        <div className="d-flex">
          <div className="w-100 m-3">
            <label className="labels">Department Name</label>
            <span className="strike">*</span>
            <div className="mt-1">
              <input
                placeholder="Enter Department Name"
                value={departmentName}
                className={`w-100 form-control  ${error ? "errorfocus" : "inputfocus"}`}
                onChange={handleChange}
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
              {!departmentName ||
              departmentName === props?.editDetails?.departmentName ? (
                <span
                  className="reset-text"
                  data-bs-dismiss="offcanvas"
                  onClick={clearPropsFn}
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
          resetCancel={cancelFn}
        />
      </div>
    </>
  );
};

export default AddDepartmentConfiguration;
