import { useState, useEffect } from "react";
import addIcon from "../../Assets/add.svg";
import group from "../../Assets/close.svg";
import {
  staffCreation,
  templateDownloadAction,
} from "../../Actions/AdminStaffManagementActions";
import { templateUploadAction } from "../../Actions/TemplateUploadAction";
import { connect, useDispatch } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import {
  modalWidth,
  emailRegex,
  MAX_LENGTH,
  CANVAS_BOTTOM_STYLE,
  ADD_ROLE_MODAL_ID,
  API_SUCCESS_STATUS_CODE,
  TEMPLATE_DOWNLOAD_FAILED,
  TEMPLATE_DOWNLOAD_SUCCESS,
  isSearchRegex,
  floorRegex,
  EMP_ID_ERROR,
  EMP_ID_MAX_LENGTH,
  createFormData,
  API_WARNING_STATUS_CODE,
  STAFF_FILE_KEY,
  STAFF_COMPONENT_KEY,
  BULK_UPLOAD_SUCCESS_MSG,
  CONTENT_TYPE_HEADER,
  JSON_CONTENT_TYPE,
  BULK_UPLOAD_PARTIAL_SUCCESS_MSG
} from "../../Utils";
import {
  WORKER_CREATE_SUCCESS_MESSAGE,
  SUCCESS,
  staffRegex,
  mobileRegex,
  ENTER_KEY,
} from "../../Utils";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  FIRST_NAME_ERROR,
  ROLE_ERROR,
  VALID_EMAIL_ERROR,
  MOBILR_ERROR,
  VALID_MOBILE_ERROR,
} from "../../Utils";
import secureLocalStorage from "react-secure-storage";
import { requestWorkerListGetALL } from "../../Actions/RosterManagementAction";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import { UploadTemplate } from "../../ReUsable-Components/Upload-Template";

function AdminStaffCreation(props, { errorMessage }) {
  const initialValues = {
    empId:"",
    firstName: "",
    emailID: "",
    role: "",
    manager: "",
    grade: "",
    lastName: "",
    mobileNumber: "",
    idProof: "",
    inputSearch: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formerrors, setFormErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [roles, setRoles] = useState([]);
  const [departmentId, setdepartmentId] = useState("");
  const [department, setDepartment] = useState([]);
  const [gradesListData, setGradesList] = useState([]);
  const [gradeDetails,setGradeDetails] = useState({});
  const propsCanvasId = props?.id;
  const propsStaffList = props?.staffListFn;
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const propsRoleList = props?.rolesList;

  const propsDeptList = props?.departmentsList;

  const propsGradeList = props?.gradesList;

  useEffect(() => {
    setRoles(propsRoleList);
    setDepartment(propsDeptList);
    setGradesList(propsGradeList);
  }, [propsRoleList, propsDeptList, propsGradeList]);

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
      [name]: undefined,
    }));

    let roleFilter = roles?.find((role) => role?.roleId === value);
    let departmentFilter = department?.find(
      (dept) => dept?.departmentId === roleFilter?.departmentId
    );
    let departmentPayload = departmentFilter;
    setdepartmentId(departmentPayload);

    let gradeFilter = gradesListData?.find(
      (grade) => grade?.gradeId === roleFilter?.gradeId
    );
    let gradeDetails = gradeFilter;
    setGradeDetails(gradeDetails);

    setFormValues((prevValues) => ({
      ...prevValues,
      grade: gradeDetails?.gradeId,
    }));
  };
  
  
  const handleCancelShowModal = () => {
    const nonEmptyValues = Object.values(formValues).filter(
      (value) => value !== ""
    );
    const enteredFieldsLength = nonEmptyValues.length;

    setIsErrorSnackOpen(false);
    if (enteredFieldsLength > 0) {
      setShowCancelModal(true);
    } else {
      cancelfn();
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

  const cancelfn = () => {
    document.getElementById(propsCanvasId)?.click();
    handleCancelCloseModal();
  };

  const workerListFn = () => {
    dispatch(requestWorkerListGetALL()).then((response) => {
      secureLocalStorage.setItem("workersList", JSON.stringify(response?.data));
      propsStaffList();
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setFormErrors(validate(formValues));

    if (Object.keys(errors).length === 0) {
      setIsErrorSnackOpen(false);
      dispatch(staffCreation(formValues, departmentId)).then(
        (response) => {
          if (response.data.status === SUCCESS) {
            setSuccessMsg(WORKER_CREATE_SUCCESS_MESSAGE);
            handleClickInAnotherComponent();
            setErrorMsg("");
          } else {
            errorMessage = response;
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
    if (!values.emailID) {
      delete errors.emailID;
    } else if (!emailRegex.test(values.emailID)) {
      errors.emailID = VALID_EMAIL_ERROR;
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = MOBILR_ERROR;
    }
    if (values.mobileNumber.length < 10 && values.mobileNumber.length > 0) {
      errors.mobileNumber = VALID_MOBILE_ERROR;
    }

    return errors;
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFormErrors("");
    setdepartmentId("");
    setGradeDetails({});
  };
  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
    workerListFn();
  };
  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };
  const handleSnackClose = () => {
    setIsSnackOpen(false);
    document.getElementById(propsCanvasId)?.click();
    workerListFn();
  };
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === ENTER_KEY) {
      handleSubmit();
    }
  };

  const templateCreation=()=>{
    dispatch(templateDownloadAction()).then(
      (response) => {
        if (response?.status === API_SUCCESS_STATUS_CODE) {
          setSuccessMsg(TEMPLATE_DOWNLOAD_SUCCESS);
          setIsSnackOpen(true);
        }
      },
      (error) => {
        setErrorMsg(TEMPLATE_DOWNLOAD_FAILED);
        handleErrorClickInAnotherComponent();
      }
    );

  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = createFormData(STAFF_FILE_KEY,file);
      dispatch(templateUploadAction(STAFF_COMPONENT_KEY,formData))
        .then((response) => {
          if (response?.headers[CONTENT_TYPE_HEADER] === JSON_CONTENT_TYPE) {
            setSuccessMsg(BULK_UPLOAD_SUCCESS_MSG);
          } else {
            setSuccessMsg(BULK_UPLOAD_PARTIAL_SUCCESS_MSG);
          }
          if (response?.status === API_SUCCESS_STATUS_CODE) {
            handleClickInAnotherComponent();
            handleFileReset(e);
          } else if (response?.status === API_WARNING_STATUS_CODE) {
            handleFileReset(e);
          }
        })
        .catch((error) => {
          handleFileReset(e);
        });
    }
  };

  const handleFileReset = (e) => {
    e.target.value = null;
  };


  return (
    <div className="ng-container d-flex justify-content-end">
      <SuccessSnack
        open={isSnackOpen}
        onClose={handleSnackClose}
        successMessage={successMsg}
      />
      <ErrorSnack
        open={isErrorSnackOpen}
        onClose={handleErrorSnackClose}
        errorMessage={errorMessage ? errorMessage : errorMsg}
      />
      <div
        className="addDiv border p-2 me-2 d-flex align-items-center rounded-2 border-secondary"
        onClick={templateCreation}
      >
        <span className="me-1 p-1">Download Template</span>
        <i class="fa-solid fa-download"></i>
      </div>
      <UploadTemplate handleFileChange={handleFileChange}/>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Add</Tooltip>}>
        <div
          className="addDiv border p-2 d-flex align-items-center rounded-2 border-secondary"
          data-bs-toggle="offcanvas"
          data-bs-target="#addRole"
          aria-controls="offcanvasRight"
          onClick={resetForm}
        >
          <img src={addIcon} alt="img" className="me-2" />
          <span>Add</span>
        </div>
      </OverlayTrigger>

      <ReusableModal id={ADD_ROLE_MODAL_ID} style={modalWidth}>
        <div>
          <span data-bs-dismiss="offcanvas" id={propsCanvasId}></span>
          <div className="d-flex justify-content-between align-items-center border border-end-0 border-top-0 border-bottom-1 border-start-0 p-2">
            <h4 className="offcanvas-title ms-2 mt-2" id="offcanvasRightLabel">
              Add Hospital Staff
            </h4>
            <span
              className="me-2 mt-1 close_button"
              aria-label="Close"
              onClick={handleCancelShowModal}
            >
              <img src={group} alt="img"></img>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="offcanvas-body ms-2 pt-0 m-0">
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

                <div className="col-6 ">
                  <div className="form-group">
                    <label htmlFor="firstName" className="mt-3 labels">
                      First Name <span className="text text-danger">*</span>
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
                      onCut={handleChange}
                      onCopy={handleChange}
                      onPaste={handleChange}
                      onKeyDown={handleKeyPress}
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
                    ></input>
                  </div>
                </div>

                <div className="col-6 ">
                  <div className="form-group">
                    <label htmlFor="mobileNumber" className="labels">
                      Mobile Number <span className="text text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control  ${
                        formerrors.mobileNumber ? "errorfocus" : "inputfocus"
                      }`}
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formValues.mobileNumber}
                      onChange={handleChangeForMobile}
                      required
                      maxLength={10}
                      onKeyDown={handleKeyPress}
                    ></input>
                  </div>
                  {formerrors.mobileNumber ? (
                    <span className="text error">
                      {formerrors.mobileNumber}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="ng-container row mb-4">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="firstName">Email ID</label>
                    <input
                      type="text"
                      className={`form-control  ${
                        formerrors.emailID ? "errorfocus" : "inputfocus"
                      }`}
                      name="emailID"
                      placeholder="Email ID"
                      value={formValues.emailID}
                      onChange={handleChangeEmail}
                      onKeyDown={handleKeyPress}
                    ></input>
                  </div>
                  {formerrors.emailID ? (
                    <span className="text error  mt-0">
                      {formerrors.emailID}
                    </span>
                  ) : null}
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="grade" className="labels">
                      Role <span className="text text-danger">*</span>
                    </label>
                    <select
                      className={`form-select  thin-scrollbar ${
                        formerrors.role ? "errorfocus" : "inputfocus"
                      }`}
                      name="role"
                      value={formValues.role}
                      onChange={handleRoleAndDepartment}
                      onKeyDown={handleKeyPress}
                    >
                      <option value="">Select</option>

                      {roles?.map((val, index) => (
                        <option key={index} value={val?.roleId}>
                          {val.role}
                        </option>
                      ))}
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
                    <label htmlFor="grade" className="labels">
                      Grade 
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={
                        gradeDetails?.gradeName
                          ? gradeDetails?.gradeName
                          : "Select"
                      }
                    ></input>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="department" className="labels">
                      Department
                    </label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          departmentId?.departmentName
                            ? departmentId?.departmentName
                            : "Select"
                        }
                        disabled
                      ></input>
                  </div>
                  {formerrors.department ? (
                    <span className="text error">{formerrors.department}</span>
                  ) : null}
                </div>

                {/**
                 * This commented code is kept for future scope of file upload field in the form
                 */}

                {/* <div className='container row mb-0'> 
     <div className="col-12 ms-2 mb-0">
      <label>ID Proof</label>
     <Files
        className='files-dropzone pb-3 mt-2 ms-2 w-100 form-control file_div' 
        accepts={['image/png', '.pdf', 'audio/*']}
        multiple
        maxFileSize={10000000}
        minFileSize={0}
        name="idProof"
        onChange={handleChange}
        value={formValues.idProof}
        clickable >
          <center>
       <i className="fa-sharp fa-solid fa-upload me-2"></i>
        Drop files here or click to upload</center>
      </Files>
      <div>
      <ul>
      {formValues.idProof  && formValues.idProof .length > 0 ? (
  <ul>
    {formValues.idProof.map((file) => (
      <li key={file.name}>{file.name}</li>
    ))}
  </ul>
) : (
  <p>No files selected</p>
)}
      </ul>
    </div>  
  </div>
      </div> */}
              </div>

              <div className="ng-container row mb-4">
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
            className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
            style={CANVAS_BOTTOM_STYLE}
          >
            <div
              className="reset-button align-items-center d-flex  justify-content-center rounded-2"
              onClick={resetForm}
            >
              <span className="reset-text">Reset</span>
            </div>
            <div className="d-flex">
              <div
                className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                onClick={handleCancelShowModal}
                aria-label="Close"
              >
                <span className="reset-text">Cancel</span>
              </div>
              <div
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
                onClick={handleSubmit}
              >
                <span className="saveText">Save</span>
              </div>
            </div>
          </div>
        </div>
      </ReusableModal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  errorMessage: state.staffCreationReducerFn?.errorMessage,
});

export default connect(mapStateToProps)(AdminStaffCreation);
