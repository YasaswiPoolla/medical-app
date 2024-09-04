import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import {
  rolesPostAction,
  rolesEditAction,
} from "../../Actions/RoleConfigurationAction";
import { useDispatch, useSelector } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import {
  ROLE_CREATE_SUCCESS_MESSAGE,
  ROLE_UPDATE_SUCCESS_MESSAGE,
  SUCCESS,
  ROLE_NAME_ERROR,
  DEPARTMENTNAME_ERROR,
  CANVAS_BOTTOM_STYLE,
  ENTER_KEY,
  GRADE_NAME_ERROR,
} from "../../Utils";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import secureLocalStorage from "react-secure-storage";
import { rolesList } from "../../Actions/AdminStaffManagementActions";

const AddRoleConfiguration = (internalProps) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [roleDetails, setRoleDetails] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [allDepartments, setAllDepartments] = useState("");
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [allGrades, setAllGrades] = useState("");

  const dispatch = useDispatch();
  const setDepartmentDetails = internalProps?.setDepartmentDetails;
  const roleEditDetails = internalProps?.editDetails;
  const roleNameEditDetails = internalProps?.editDetails?.role;
  const departmentNameEditDetails = internalProps?.editDetails?.departmentName;
  const departmentIdEditDetails = internalProps?.editDetails?.departmentId;
  const propsCanvasId = internalProps?.id;
  const propsRoleListFn = internalProps?.roleList;
  const isViewMode = internalProps?.isViewMode;
  const [disableValue, setDisableValue] = useState(false);

  useEffect(() => {
    const shouldDisable = isViewMode || isLoading || isSnackOpen;
    setDisableValue(shouldDisable);
  }, [isViewMode, isLoading, isSnackOpen]);

  
  const initialValues = {
    rolename: internalProps?.editDetails?.role ?? "",
    departmentname: internalProps?.editDetails?.departmentName ?? "",
    departmentId: internalProps?.editDetails?.departmentId ?? "",
    gradeId: internalProps?.editDetails?.gradeId ?? "",
  };

  const [inputFields, setInputFields] = useState(initialValues);
  useEffect(() => {
    setRoleDetails(internalProps ? internalProps : "");
    setInputFields((prevValues) => ({
      ...prevValues,
      rolename: roleEditDetails
        ? roleNameEditDetails
        : isLoading || isSnackOpen
        ? inputFields?.rolename
        : "",
      departmentname: internalProps
        ? departmentNameEditDetails
        : isLoading || isSnackOpen
        ? inputFields?.departmentname
        : "",
      departmentId: roleEditDetails
        ? departmentIdEditDetails
        : isLoading || isSnackOpen
        ? inputFields?.departmentId
        : "",
      gradeId: roleEditDetails
        ? departmentIdEditDetails
        : isLoading || isSnackOpen
        ? inputFields?.gradeId
        : "",
    }));
    setDepartmentId(departmentIdEditDetails || "");
    setAllDepartments(
      JSON.parse(secureLocalStorage.getItem("departmentsList"))
    );
    setAllGrades(JSON.parse(secureLocalStorage.getItem("gradesList")));
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [internalProps]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (setDepartmentDetails) {
      setDepartmentDetails((prevDepartmentDetails) => ({
        ...prevDepartmentDetails,
        role: value,
      }));
    }
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setDepartmentId(value);
  };

  const [errors, setErrors] = useState({});

  let errorsMsg = {};
  const validateValues = (inputFields) => {
    if (!inputFields?.rolename) {
      errorsMsg.rolename = ROLE_NAME_ERROR;
    }
    if (!inputFields?.departmentId) {
      errorsMsg.departmentId = DEPARTMENTNAME_ERROR;
    }
    if (!inputFields?.gradeId) {
      errorsMsg.gradeId = GRADE_NAME_ERROR;
    }
    return errorsMsg;
  };

  const roleListfn = () => {
    dispatch(rolesList()).then((response) => {
      if (response.data.status === SUCCESS) {
        handleSnackClose();
        secureLocalStorage.setItem(
          "rolesList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    setErrors(validateValues(inputFields));

    if (Object.keys(errorsMsg).length === 0) {
      let body;
      if (!internalProps?.editDetails) {
        body = {
          role: inputFields?.rolename,
          department: {
            departmentId: inputFields?.departmentId,
            departmentName: inputFields?.departmentname,
          },
          gradeId: inputFields?.gradeId,
        };

        dispatch(rolesPostAction(body)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              handleClickInAnotherComponent();
              roleListfn();
            }
          },
          (error) => {
            handleErrorClickInAnotherComponent();
          }
        );
      } else {
        let roleId = internalProps?.editDetails?.roleId;

        body = {
          role: inputFields.rolename,
          roleId: roleId,
          department: {
            departmentId: departmentId,
          },
        };

        dispatch(rolesEditAction(body, roleId)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              handleClickInAnotherComponent();
              roleListfn();
            }
          },
          (error) => {
            handleErrorClickInAnotherComponent();
          }
        );
      }
    }
  };

  const resetErrors = () => {
    setErrors({});
  };
  const onCancel = () => {
    resetErrors();
    setInputFields(initialValues);
  };

  const onReset = () => {
    resetErrors();
    setInputFields({
      rolename: getRoleName(),
    });
  };

  const onAddReset = () => {
    resetErrors();
    setInputFields({
      rolename: "",
      departmentname: "",
      departmentId: "",
      gradeId: "",
    });
    setDepartmentId("");
  };

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };

  const handleReload = () => {
    document.getElementById(propsCanvasId)?.click();
    propsRoleListFn();
    onReset();
  };

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleCancelShowModal = () => {
    const nonEmptyValues = Object.values(inputFields).filter(
      (value) => value !== ""
    );
    const enteredFieldsLength = nonEmptyValues.length;

    if (enteredFieldsLength > 0) {
      setShowCancelModal(true);
    }
  };
  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
  };

  const cancelFn = () => {
    handleReload();
    setShowCancelModal(false);
  };

  const handleKeyPress = (e) => {
    if (!isLoading && e?.key === ENTER_KEY) {
      handleSubmit();
    }
  };

  const getRoleName = () => {
    const roleList = JSON.parse(secureLocalStorage.getItem("rolesList"));
    let roleName = roleList?.find((role) => role?.roleId === internalProps?.editDetails?.roleId)?.role;
    return roleName
  }

  const cancelCdn =
    !inputFields.rolename || inputFields.rolename === getRoleName(); 

  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={
            internalProps?.editDetails
              ? ROLE_UPDATE_SUCCESS_MESSAGE
              : ROLE_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={internalProps?.AddEditError}
        />
        <span data-bs-dismiss="offcanvas" id={propsCanvasId}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {roleDetails?.editDetails
              ? disableValue && isViewMode
                ? "View Role Configuration"
                : "Edit Role Configuration"
              : "Add Role Configuration"}
          </span>
          {cancelCdn ? (
            <img
              src={closeIcon}
              data-bs-dismiss="offcanvas"
              className="close-cursor"
              onClick={onCancel}
              alt="img"
            />
          ) : (
            <img
              src={closeIcon}
              className="close-cursor"
              onClick={handleCancelShowModal}
              alt="img"
            />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Role</label>
              <span className="strike">*</span>
              <div className="mt-1">
                <input
                  placeholder="Enter Role"
                  className={`w-100 form-control  ${
                    errors.rolename ? "errorfocus" : "inputfocus"
                  }`}
                  onChange={handleChange}
                  name="rolename"
                  value={inputFields?.rolename}
                  disabled={disableValue}
                  onKeyDown={handleKeyPress}
                />
                {errors.rolename ? (
                  <p className="error">{errors.rolename}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Department</label>
              {!internalProps?.editDetails?<span className="strike">*</span>:''}
              <div className="mt-1">
                {internalProps?.editDetails ? (
                  <input
                    value={internalProps?.editDetails?.departmentName}
                    className="form-control"
                    disabled
                  ></input>
                ) : (
                  <select
                    onChange={handleDepartmentChange}
                    name="departmentId"
                    className={`form-select thin-scrollbar ${
                      errors.departmentId ? "errorfocus" : "inputfocus"
                    }`}
                    value={inputFields.departmentId}
                    disabled={disableValue}
                    onKeyPress={handleKeyPress}
                  >
                    <option value="" selected>
                      Select
                    </option>
                    {allDepartments &&
                      allDepartments.map((e, i) => (
                        <option key={i} value={e.departmentId}>
                          {e.departmentName}
                        </option>
                      ))}
                  </select>
                )}
                {errors.departmentId ? (
                  <p className="error">{errors.departmentId}</p>
                ) : null}
              </div>
            </div>
          </div>
          
          
            <div className="d-flex">
              <div className="w-100 m-3">
                <label className="labels">Grade</label>
                {!internalProps?.editDetails?<span className="strike">*</span>:''}
                <div className="mt-1">
                {internalProps?.editDetails ? (
                  <input
                    value={internalProps?.editDetails?.gradeName}
                    className="form-control"
                    disabled
                  ></input>
                ) : (
                  <select
                    onChange={handleDepartmentChange}
                    name="gradeId"
                    className={`form-select thin-scrollbar ${
                      errors.gradeId ? "errorfocus" : "inputfocus"
                    }`}
                    value={
                      disableValue
                        ? internalProps?.editDetails?.gradeName
                        : inputFields?.gradeId
                    }
                    disabled={disableValue}
                    onKeyPress={handleKeyPress}
                  >
                    <option value="" selected>
                      Select
                    </option>
                    {allGrades &&
                      allGrades?.map((e, i) => (
                        <option key={i} value={e.gradeId}>
                          {e.gradeName}
                        </option>
                      ))}
                  </select>)}

                  {errors?.gradeId ? (
                    <p className="error">{errors.gradeId}</p>
                  ) : null}
                </div>
              </div>
            </div>
          
          <div
            className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
            style={CANVAS_BOTTOM_STYLE}
          >
            <div
              className="reset-button align-items-center d-flex  justify-content-center rounded-2"
              onClick={internalProps?.editDetails ? onReset : onAddReset}
            >
              <span className="reset-text">Reset</span>
            </div>
            <div className="d-flex">
              <div className="reset-button align-items-center  px-3 d-flex  justify-content-center rounded-2 close-cursor">
                {cancelCdn ? (
                  <>
                    <span
                      className="reset-text"
                      data-bs-dismiss="offcanvas"
                      onClick={onCancel}
                    >
                      Cancel
                    </span>
                  </>
                ) : (
                  <span className="reset-text" onClick={handleCancelShowModal}>
                    Cancel
                  </span>
                )}
              </div>
              <button
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
                type="submit"
                disabled={disableValue}
              >
                <span className="saveText">Submit</span>
              </button>
            </div>
          </div>
        </form>
        <CancelModal
          show={showCancelModal}
          handleClose={handleCancelCloseModal}
          resetCancel={cancelFn}
        />
      </div>
    </>
  );
};

export default AddRoleConfiguration;
