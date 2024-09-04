import { useState, useEffect } from "react";
import group from "../../Assets/close.svg";
import {
  staffEditAction,
} from "../../Actions/AdminStaffManagementActions";
import { useDispatch } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import {
  WORKER_UPDATE_SUCCESS_MESSAGE,
  SUCCESS,
  staffRegex,
  mobileRegex,
  CANVAS_BOTTOM_STYLE,
  EDIT_STAFF_TITLE,
  emailRegex,
  MAX_LENGTH,
  ENTER_KEY,
  isSearchRegex,
  floorRegex,
  EMP_ID_ERROR,
  EMP_ID_MAX_LENGTH,
} from "../../Utils";
import {
  FIRST_NAME_ERROR,
  ROLE_ERROR,
  VALID_EMAIL_ERROR,
  MOBILR_ERROR,
  VALID_MOBILE_ERROR,
  GRADE_NAME_ERROR,
} from "../../Utils";
import secureLocalStorage from "react-secure-storage";
import { requestWorkerListGetALL } from "../../Actions/RosterManagementAction";

function AdminStaffCreation(props) {
  const propsRoleList = props?.rolesList;

  const propsDeptList = props?.departmentsList;

  const propsGradeList = props?.gradesList;

  useEffect(() => {
    setRoles(propsRoleList);
    setDepartment(propsDeptList);
    setGradesList(propsGradeList);
  }, [propsRoleList, propsDeptList, propsGradeList]);

  const staffEditDetails = props?.editDetails;

  const initialValues = {
    empId : props ? staffEditDetails?.empId : "",
    workerId: props ? staffEditDetails?.workerId : "",
    firstName: props ? staffEditDetails?.firstName : "",
    emailId: props ? staffEditDetails?.emailId : "",
    roleId: props ? staffEditDetails?.roleId : "",
    role: props ? staffEditDetails?.role : "",
    gradeId: props ? staffEditDetails?.gradeId : "",
    grade: props ? staffEditDetails?.gradeName : "",
    lastName: props ? staffEditDetails?.lastName : "",
    mobileNumber: props ? staffEditDetails?.phoneNo : "",
    idProof: "",
    inputSearch: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formerrors, setFormErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [departmentId, setdepartmentId] = useState("");
  const [department, setDepartment] = useState([]);
  const [gradesListData, setGradesList] = useState([]);
  const dispatch = useDispatch();
  const [departmentName, setdepartmentName] = useState();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [gradeDetails,setGradeDetails] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = staffRegex;

    if (value === "" || regex.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };



  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      empId : props ? staffEditDetails?.empId : "",
      workerId: props ? staffEditDetails?.workerId : "",
      firstName: props ? staffEditDetails?.firstName : "",
      emailId: props ? staffEditDetails?.emailId : "",
      roleId: props ? staffEditDetails?.roleId : "",
      role: props ? staffEditDetails?.role : "",
      gradeId: props ? staffEditDetails?.gradeId : "",
      grade: props ? staffEditDetails?.gradeName : "",
      lastName: props ? staffEditDetails?.lastName : "",
      mobileNumber: props ? staffEditDetails?.phoneNo : "",
      inputSearch: "",
    }));
    setdepartmentId(props ? staffEditDetails?.department : "");
    let departmentFilter = department?.filter(
      (e) => e?.departmentId === staffEditDetails?.department
    );
    setdepartmentName(
      staffEditDetails ? departmentFilter[0]?.departmentName : null
    );
  }, [staffEditDetails, department, props]);

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleChangeForMobile = (e) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
    const { name, value } = e.target;
    const regex = mobileRegex;
    if (value === "" || regex.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  const handleRoleAndDepartment = (e) => {
    const { name, value } = e.target;
  
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  
    let roleFilter = roles?.find((role) => role?.roleId === value);
    let departmentFilter = department?.find(
      (dept) => dept?.departmentId === roleFilter?.departmentId
    );
    let departmentPayload = departmentFilter;
    setdepartmentId(departmentPayload?.departmentId);
    setdepartmentName(departmentPayload?.departmentName);
  
    let gradeFilter = gradesListData?.find(
      (grade) => grade?.gradeId === roleFilter?.gradeId
    );
    let gradeDetails = gradeFilter;
    setGradeDetails(gradeDetails);
  
    setFormValues((prevValues) => ({
      ...prevValues,
      gradeId: gradeDetails?.gradeId,
    }));
  };

  const workerListfn = () => {
    dispatch(requestWorkerListGetALL())
      .then((response) => {
        secureLocalStorage.setItem(
          "workersList",
          JSON.stringify(response?.data)
        );
        props?.staffListFn();
      })
      .catch((err) => {
        setErrorMsg(err);
        handleErrorClickInAnotherComponent();
      });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(errors).length === 0) {
      let body = {
        empId : formValues.empId,
        workerId: formValues.workerId,
        emailId: formValues.emailId,
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        phoneNo: formValues.mobileNumber,
        roleId: formValues.roleId,
        department: departmentId,
        gradeId: formValues.gradeId,
      };

      dispatch(staffEditAction(body)).then(
        (response) => {
          if (response.data.status === SUCCESS) {
            handleClickInAnotherComponent();
          }
        },
        (error) => {
          setErrorMsg(error);
          handleErrorClickInAnotherComponent();
        }
      );
    }
  };
  const errors = {};

  const validate = (values) => {
    if (!values.firstName) {
      errors.firstName = FIRST_NAME_ERROR;
    }
    if (!values.empId) {
      errors.empId = EMP_ID_ERROR;
    }
    if (!values.role) {
      errors.role = ROLE_ERROR;
    }
    if (!values.grade) {
      errors.grade = GRADE_NAME_ERROR;
    }

    if (!values.emailId) {
      delete errors.emailId;
    } else if (!emailRegex.test(values.emailId)) {
      errors.emailId = VALID_EMAIL_ERROR;
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = MOBILR_ERROR;
    }
    if (values.mobileNumber.length < 10 && values.mobileNumber.length > 0) {
      errors.mobileNumber = VALID_MOBILE_ERROR;
    }

    return errors;
  };
  /**
   * This function is used to reset the form to its initial state or a specified state.
   * Filters the department array to find a departmentId matching the departmentId of editDetails prop.
    Sets the departmentName of the filtered department object.
   * Sets the form errors state to an empty string, for clearing form validation errors.
   * Sets the form values state to the initialValues that contains editDetails props
   * Sets the managerName state to the managerName of the editDetails prop.
   */

  const resetForm = () => {
    setdepartmentId(staffEditDetails?.department);
    setdepartmentName(staffEditDetails?.departmentName);
    setFormErrors("");
    setFormValues(initialValues);
    setGradeDetails({});
  };
  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    workerListfn();
    document.getElementById(props?.id)?.click();
  };

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleCancelShowModal = () => {
    const nonEmptyValues = Object.values(formValues).filter(
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
  const cancelfn = () => {
    document.getElementById(props?.id)?.click();
    handleCancelCloseModal();
    resetForm();
  };

  function isNonNull(obj) {
    return obj !== null && obj !== undefined;
  }

  const matches = (formValues, editStaffDetails, keys) => {
    return keys.every((key) => formValues[key] === editStaffDetails[key]);
  };

  const cancelCdnFn = (formValues, staffEditDetails) => {
    if (isNonNull(formValues) && isNonNull(staffEditDetails)) {
      const keysToCompare = [
        "empId",
        "firstName",
        "lastName",
        "emailId",
        "roleId",
        "gradeId",
      ];
      return matches(formValues, staffEditDetails, keysToCompare);
    }
    return false;
  };

  const cancelCdn = cancelCdnFn(formValues, staffEditDetails);

  const handleKeyPress = (e) => {
    if (e?.key === ENTER_KEY) {
      handleSubmit();
    }
  };

  const handleChangeForEmpId = (e) => {
    const { name, value } = e.target;
    if(isSearchRegex(value,floorRegex)){
        setFormValues({ ...formValues, [name]: value });
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  return (
    <div className="ng-container d-flex justify-content-between w-100">
      <div data-bs-dismiss="offcanvas" id={props?.id}></div>
      <div className="w-100">
        <div className="d-flex justify-content-between align-items-center border border-end-0 border-top-0 border-bottom-1 border-start-0 p-2">
          <span className="titleHeader mt-2">{EDIT_STAFF_TITLE}</span>

          {cancelCdn ? (
            <span
              className="me-0 mt-1 close_button"
              aria-label="Close"
              data-bs-dismiss="offcanvas"
            >
              <img src={group} alt="img"></img>
            </span>
          ) : (
            <span
              className="me-0 mt-1 close_button"
              aria-label="Close"
              onClick={handleCancelShowModal}
            >
              <img src={group} alt="img"></img>
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="offcanvas-body pt-0 m-0 view-scroll view-overflow">
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={WORKER_UPDATE_SUCCESS_MESSAGE}
            />
            <ErrorSnack
              open={isErrorSnackOpen}
              onClose={handleErrorSnackClose}
              errorMessage={errorMsg}
            />

            <div className="ng-container row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="mt-3 labels">
                    Emp ID <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formerrors.empId ? "errorfocus" : "inputfocus"
                    }`}
                    name="empId"
                    placeholder="Employee ID"
                    value={formValues.empId}
                    onChange={handleChangeForEmpId}
                    onKeyDown={handleKeyPress}
                    maxLength={EMP_ID_MAX_LENGTH}
                  ></input>
                </div>
                {formerrors.empId ? (
                  <span className="text error ">{formerrors.empId}</span>
                ) : null}
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="labels mt-3">
                    First Name
                    <span className="text text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className={`form-control  ${
                      formerrors.firstName ? "errorfocus" : "inputfocus"
                    }`}
                    name="firstName"
                    placeholder="First Name"
                    value={formValues.firstName}
                    onChange={handleChange}
                    maxLength={MAX_LENGTH}
                    onKeyDown={handleKeyPress}
                    disabled={isSnackOpen}
                  ></input>
                </div>
                {formerrors.firstName ? (
                  <span className="text error ">{formerrors.firstName}</span>
                ) : null}
              </div>
            </div>

            <div className="ng-container row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="labels">
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control inputfocus"
                    placeholder="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    disabled={isSnackOpen}
                  ></input>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="mobileNumber" className="labels">
                    Mobile Number
                    <span className="text text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    className="form-control inputfocus"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formValues.mobileNumber}
                    disabled
                    onChange={handleChangeForMobile}
                    required
                    maxLength={10}
                  ></input>
                </div>
                {formerrors.mobileNumber ? (
                  <span className="text error">{formerrors.mobileNumber}</span>
                ) : null}
              </div>
            </div>

            <div className="ng-container row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="firstName" className={"labels"}>
                    Email ID
                  </label>

                  <input
                    type="text"
                    className={`form-control  ${
                      formerrors.emailId ? "errorfocus" : "inputfocus"
                    }`}
                    name="emailId"
                    placeholder="Email Id"
                    value={formValues.emailId}
                    onChange={handleChangeEmail}
                    onKeyDown={handleKeyPress}
                    disabled={isSnackOpen}
                  ></input>
                </div>
                {formerrors.emailId ? (
                  <span className="text error">{formerrors.emailId}</span>
                ) : null}
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="grade" className={"labels"}>
                    Role
                    <span className="text text-danger">*</span>
                  </label>

                  <select
                    className={`form-select thin-scrollbar ${
                      formerrors.role ? "errorfocus" : "inputfocus"
                    }`}
                    name="roleId"
                    value={formValues.roleId}
                    onChange={handleRoleAndDepartment}
                    onKeyDown={handleKeyPress}
                    disabled={isSnackOpen}
                  >
                    <option value="" selected>
                      {props?.editDetails?.role}
                    </option>

                    {roles?.map((val, index) =>
                      props?.editDetails?.role === val?.role ? null : (
                        <option key={index} value={val.roleId}>
                          {val?.role}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {formerrors.role ? (
                  <span className="text error">{formerrors.role}</span>
                ) : null}
              </div>
            </div>

            <div className="ng-container row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="grade" className={"labels"}>
                    Grade
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={
                      gradeDetails?.gradeName
                        ? gradeDetails?.gradeName
                        : props?.editDetails?.gradeName
                    }
                  ></input>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group">
                  <label htmlFor="department" className="labels">
                    Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      staffEditDetails && departmentId && departmentName
                        ? departmentName
                        : staffEditDetails
                        ? staffEditDetails?.departmentName
                        : departmentName
                    }
                    disabled
                  ></input>
                </div>
                {formerrors.department ? (
                  <span className="text error">{formerrors.department}</span>
                ) : null}
              </div>
            </div>

            <div className="container row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="grade">
                    <span className="text text-danger"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <CancelModal
          show={showCancelModal}
          handleClose={handleCancelCloseModal}
          resetCancel={cancelfn}
        />

        <div
          className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-3"
          style={CANVAS_BOTTOM_STYLE}
        >
          <>
            <div
              className="reset-button align-items-center d-flex  justify-content-center rounded-2"
              onClick={resetForm}
            >
              <span className="reset-text">Reset</span>
            </div>
            <div className="d-flex">
              {cancelCdn ? (
                <button
                  className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                  onClick={handleCancelShowModal}
                  aria-label="Close"
                >
                  Cancel
                </button>
              )}

              <div
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
                onClick={handleSubmit}
              >
                <span className="saveText">Save</span>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminStaffCreation;
