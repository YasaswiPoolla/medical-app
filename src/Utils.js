import moment from "moment";

export const SUCCESS = "SUCCESS";
export const WARNING = "Warning";
export const DELETE_WARNING = "Are you sure you want to delete?";
export const DELETE_SUCCESS = "Record has been deleted";
export const STATION_DELETED_MESSAGE = "Station Details Deleted Successfully";
export const ROASTER_CREATE_SUCCESS_MESSAGE =
  "Roster Details Created Successfully";
export const TIMESLOT_CREATE_SUCCESS_MESSAGE =
  "Time Slots Details Created successfully";
export const STATION_CREATE_SUCCESS_MESSAGE =
  "Station Details Created Successfully";
export const FLOOR_CREATE_SUCCESS_MESSAGE =
  "Floor Details Created Successfully";
export const DEPARTMENT_CREATE_SUCCESS_MESSAGE =
  "Department Details Created Successfully";
export const DEPARTMENT_UPDATE_SUCCESS_MESSAGE =
  "Department Details Updated Successfully";
export const ROASTER_UPDATE_SUCCESS_MESSAGE =
  "Roster Details Updated Successfully";
export const TIMESLOT_UPDATE_SUCCESS_MESSAGE =
  "Time Slots Details updated successfully";
export const STATION_UPDATE_SUCCESS_MESSAGE =
  "Station Details Updated Successfully";
export const FLOOR_UPDATE_SUCCESS_MESSAGE =
  "Floor Details Updated Successfully";

export const ROLE_CREATE_SUCCESS_MESSAGE = "Role Created Successfully";
export const ROLE_UPDATE_SUCCESS_MESSAGE = "Role Updated Successfully";
export const ROLE_DELETE_SUCCESS_MESSAGE = "Role Deleted Successfully";

export const USER_GROUP_CREATE_SUCCESS_MESSAGE = "User Group Created Successfully";
export const USER_GROUP_UPDATE_SUCCESS_MESSAGE = "User Group Updated Successfully";
export const USER_GROUP_DELETE_SUCCESS_MESSAGE = "User Group Deleted Successfully";

export const WORKER_CREATE_SUCCESS_MESSAGE = "Worker Created Successfully";
export const WORKER_UPDATE_SUCCESS_MESSAGE = "Worker Updated Successfully";
export const WORKER_DELETE_SUCCESS_MESSAGE = "Worker Deleted Successfully";

export const ROLE_DELETE_ERROR_MESSAGE = "Role Deletion Failed";
export const ROLE_UPDATE_ERROR_MESSAGE = "Role Updation Failed";
export const ROLE_CREATE_ERROR_MESSAGE = "Role Creation Failed";

export const GRADE_CREATE_SUCCESS_MESSAGE = "Grade Created Successfully";
export const GRADE_UPDATE_SUCCESS_MESSAGE = "Grade Updated Successfully";
export const GRADE_DELETE_SUCCESS_MESSAGE = "Grade Deleted Successfully";

export const GRADE_DELETE_ERROR_MESSAGE = "Grade Deletion Failed";
export const GRADE_UPDATE_ERROR_MESSAGE = "Grade Updation Failed";
export const GRADE_CREATE_ERROR_MESSAGE = "Grade Creation Failed";
export const VIEW = "view";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREV_PAGE = "PREV_PAGE";
export const ITEMS_PER_PAGE = "ITEMS_PER_PAGE";
export const DEFAULT_PAGE = "DEFAULT_PAGE";
export const SET_PAGINATION = "SET_PAGINATION";

export const Mandatory_Fields_Error = "Please fill all mandatory fields";

export const View_Screen = "view";
export const CLICK_AWAY_EVENT = "clickaway";
export const Style = "style";
export const Search_Focus_Style_Value =
  "border: 1px solid #00BDD0; box-shadow: 0 0 5px rgba(0, 189, 208, 1)";

export const MANDATORY_FIELDS_ERROR = "Please fill all mandatory fields";
export const Click_Away = "clickaway";
export const STYLE = "style";
export const SEARCH_FOCUS_STYLE_VALUE =
  "border: 1px solid #00BDD0; box-shadow: 0 0 5px rgba(0, 189, 208, 1)";
export const SEARCH_NOFOCUS_STYLE_VALUE = "border-color: none;";

export const userName = (firstName, lastName) => {
  return firstName + " " + lastName;
};

export const setTimeoutfn = () => {
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

export const getErrorMessage = (error) => {
  return (
    (error?.response &&
      error?.response?.data &&
      error?.response?.data?.message) ||
    error?.response?.data?.errors[0]?.message ||
    error.message ||
    error?.errors[0]?.message ||
    error.toString()
  );
};

export const getSuccessMessage = (response) => {
  return response?.data?.errors?.[0]?.message || response?.data?.body;
};

export const getErrorStatus = (error) => {
  return error?.response?.data?.status;
};

export const modalWidth = {
  width: "45%",
};
export const toolTipFont = {
  fontSize: "10px",
};
export const dropdownfont = {
  padding: "0",
  overflow: "hidden",
  marginTop: "25px",
};
export const modalTopMarginWidth = {
  width: "35%",
};
export const modalMargin = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "30px",
};

export const loginSnackWidth = {
  width: "30%",
};

export const loginImageWidth = {
  width: "32.5%",
};

export const loginPageWidth = {
  width: "70%",
};

export const floorRegex = /^[a-zA-Z0-9\s]*$/;

export const station1Regex = /^.*$/;

export const loginRegex = /^[0-9\b]+$/;

export const staffRegex = /^[a-zA-Z ._']*$/;

export const mobileRegex = /^[0-9\b]+$/;

export const stationRegex = /\s{2,}/g;

export const alphaPatternRegex = /^[a-zA-Z]*$/;

/*
  Implemented the same email regex of backend.
  This regular expression checks for the basic structure of an email address,
  but with a restriction that they cannot end with ".web".
*/

export const emailRegex =
  /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?!\.web)\.(?:[a-zA-Z]{2,}|[0-9]{1,3}(?:\.[0-9]{1,3}){3}))$/;

export const otpStyle = {
  width: "45px",
  height: "56px",
  marginRight: "15px",
  border: "1.2px solid #00BDD0",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "600",
  "@media(min-width: 768px) and (max-width: 1024px)": {
    width: "25px",
    height: "16px",
    marginRight: "0px",
  },
};
export const dateFormat = "DD/MMM/YYYY";

export const ROASTER_COLUMN_LEN = 15;

export const ROASTER_WORKER_NAME = "Select Worker Name";

export const MAX_LENGTH = 150;

export const MAX_LENGTH_USER_GROUP = 50;

export const SIDE_MENU_TYPE_ADD = "Add";

export const SIDE_MENU_TYPE_EDIT = "Edit";

export const SIDE_MENU_TYPE_VIEW = "View";

export const firstNameError = "First Name is Mandatory";

export const FIRST_NAME_ERROR = "First Name is Mandatory";

export const ROLE_ERROR = "Role is Mandatory";

export const MANAGER_ERROR = "Manager is Mandatory";

export const GRADE_NAME_ERROR = "Grade is Mandatory";

export const EMAIL_ERROR = "Email Id is Mandatory";

export const VALID_EMAIL_ERROR = "Please Enter a Valid Email";

export const MOBILR_ERROR = "Mobile Number is Mandatory";

export const VALID_MOBILE_ERROR = "10 digits are mandatory for Mobile Number";

export const ROASTER_WORKERID = "Worker Id";

export const ROASTER_ROLENAME = "Select Role Name";

export const ROASTER_TIMESLOTS = "Select Shift Time Slots";

export const ROASTER_STATIONNAME = "Select Shift Station Name";

export const ROASTER_LOCATION = "Select Shift Location";

export const COLON = ":";

export const AM = "AM";

export const PM = "PM";

export const SPACE_AM = " AM";

export const SPACE_PM = " PM";

export const splitTime = /:| /;

export const HOURS_24 = 24;

export const HOURS_10 = 10;

export const MIN_SEARCH_LENGTH = 2;

export const ENTER_KEY = "Enter";

export const WORKER_NAME_LENGTH = 20;

export const HOURS_12 = 12;

export const HOURS_0 = "0";

export const ZERO = 0;

export const MAX_USER_NAME_LENGTH = 10;
export const ROLE_NAME_LENGTH = 20;

export const FULL_NAME_LENGTH = 20;

export const DATE_LENGTH = 24;

/**
 * 
 * @param {*} timeString 
 * @returns TimeStamp in 24 hour Format
 
  This function takes Time Stamp as parameter and returns the Time Stamp in 24 hour Format
 */

export const time24FormatFn = (timeString) => {
  const [hourString, minute, period] = timeString.split(splitTime);
  let hour = parseInt(hourString, HOURS_10);

  if (period === PM && hour < HOURS_12) {
    hour += HOURS_12;
  } else if (period === AM && hour === HOURS_12) {
    hour = ZERO;
  }

  return (hour < HOURS_10 ? HOURS_0 : "") + hour + COLON + minute;
};

/**
 *
 * @param {*} timeString
 * @returns TimeStamp in 12 hour Format
 *
 * This function takes Time Stamp as parameter and returns the Time Stamp in 12 hour Format
 */

export const timeFormatFn = (timeString) => {
  const [hourString, minute] = timeString.split(COLON);
  const hour = +hourString % HOURS_24;
  return (
    (hour % HOURS_12 || HOURS_12) +
    COLON +
    minute +
    (hour < HOURS_12 ? SPACE_AM : SPACE_PM)
  );
};

export const validateFields = (fields, errors) => {
  let errorsMsg = {};
  Object.entries(fields).forEach(([field, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errorsMsg[field] = errors[field];
    }
  });
  return errorsMsg;
};

export const unauthorized = "Unauthorized";

export const DEFAULT_ITEMS_PER_PAGE = 10;

export const DEFAULT_CURRENT_PAGE = 0;

export const NO_RECORDS = "No Records Found";

export const DATE_FORMAT = "DD-MM-YYYY";

export const TIMER_TIME = 59;

export const STAFF_CREATE_CANVAS_ID = "staffCreate";

export const STAFF_EDIT_CANVAS_ID = "staffEdit";

export const ROLE_CREATE_CANVAS_ID = "roleCreate";

export const ROLE_EDIT_CANVAS_ID = "roleUpdate";

export const USER_GROUP_CANVAS_ID = "userGroup";

export const USER_GROUP_MODAL_ID = "userGroupModal";

export const GRADE_CREATE_CANVAS_ID = "gradeCreate";

export const GRADE_EDIT_CANVAS_ID = "gradeUpdate";

export const DEPARTMENT_CANVAS_ID = "departmentCreateUpdate";

export const FLOOR_CANVAS_ID = "floorCreate";

export const ROASTER_CANVAS_ID = "rosterManagmentCreateUpdate";

export const STATION_CANVAS_ID = "stationUpdateCreate";

export const TIMESLOT_CANVAS_ID = "timeSlotsCreateUpdate";

export const SNACK_HIDE_DURATION = 2000;

export const snackPosition = {
  vertical: "top",
  horizontal: "center",
};

export const CANCEL_YES_BUTTON_STYLE = {
  fontSize: "14px",
  backgroundColor: "#ffffff",
  color: "#172D76",
  borderColor: "#172D76",
};

export const CANCEL_NO_BUTTON_STYLE = {
  fontSize: "14px",
  backgroundColor: "#172D76",
};

export const CANVAS_BOTTOM_STYLE = {
  position: "absolute",
  bottom: "0px",
};
export const DATE_FIELD_STYLE = {
  
  height: 40,
  width:"100%"
                  
};
export const LOGOUT_NO_BUTTON_STYLE = {
  backgroundColor: "#ffffff",
  color: "#172D76",
};

export const LOGOUT_YES_BUTTON_STYLE = {
  backgroundColor: "#172D76",
  color: "#ffffff",
};

export const LOGIN_DIV_WIDTH = {
  width: "140%",
};

export const HEADER_STYLE = {
  border: "1px solid transparent",
  backgroundColor: "#ffffff",
  height: "66px",
  borderBottom: "2px solid #EBEBEC",
};

export const LOGOUT_DROPDOWN_STYLE = {
  width: "100%",
  textAlign: "left",
  padding: "0.5rem 1rem",
};
export const LOGOUT_MENU_STYLE = {
  padding: "0",
  overflow: "hidden",
};

export const STATION_NAME_COLUMN_LENGTH = 20;
export const snackStyle = {
  width: "100%",
  fontSize: "14px",
};

export const OTPWARNING_MESSAGE = "Otp will expire in 1 minute";

export const OTPEXPIRED_MESSAGE =
  "OTP expired. Please click Resend for new code.";

export const List = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function removeStationFromDepartmentName(departmentName, stationRegex) {
  return departmentName.replace(stationRegex, " ").trim();
}

export const EDIT_STAFF_TITLE = "Edit Hospital Staff";
export const EDIT_DEPARTMENT_TITLE = "Edit Department Details";
export const ADD_DEPARTMENT_TITLE = "Add Department Details";

export const DEPARTMENTNAME_ERROR = "Department is Mandatory";

export const ADD_FLOOR_TITLE = "Add Floor Details";

export const EDIT_FLOOR_TITLE = "Edit Floor Details";

export const FLOORNAME_ERROR = "Please Enter Floor Name";

export const EDIT_GRADE_TITLE = "Edit Grade Configuration";

export const ADD_GRADE_TITLE = "Add Grade Configuration";

export const ADD_ROLE_TITLE = "Add Role Configuration";

export const EDIT_ROLE_TITLE = "Edit Role Configuration";

export const ROLE_NAME_ERROR = "Role is Mandatory";

export const USER_GROUP_ERROR = "User Group is Mandatory";

export const USER_GROUP_MODULE_ERROR = "Module is Mandatory";

export const EDIT_STATION_TITLE = "Edit Station Details";

export const ADD_STATION_TITLE = "Add Station Details";

export const EDIT_TIME_TITLE = "Edit Time Slot";

export const ADD_TIME_TITLE = "Add Time Slot";

export const TIME_SLOT_ERROR = "Start Time & End Time shouldn`t be same";

export const ADD_ROASTER_TITLE = "Add Roster Management";

export const EDIT_ROASTER_TITLE = "Edit Roster Management";

export const WORKER_NAME_ERROR = "WorkerName is Mandatory";

export const STATION_NAME_ERROR = "StationName is Mandatory";

export const SHIFT_LOCATION_ERROR = "Shift Location is Mandatory";

export const SHIFT_TIME_ERROR = "Shift Time is Mandatory";

export const START_DATE_ERROR = "Start Date is Mandatory";

export const END_DATE_ERROR = "End Date is Mandatory";

export const EMP_ID_ERROR = "Employee Id is Mandatory";

export const DEPARTMENT_DELETE_SUCCESS_MSG = "Department Deleted Successfully";

export const PRIORITY_DELETE_SUCCESS_MSG = "Priority Deleted Successfully";

export const FLOOR_DELETE_SUCCESS_MSG = "Floor Details Deleted Successfully";

export const DATE_VALIDATION_ERROR = "From Date is greater than To Date";

export const TIMESLOT_DELETE_SUCCESS_MSG =
  "Time Slots Details Deleted Successfully";

export const ROASTER_DELETE_SUCCESS_MSG = "Roster Details Deleted Successfully";

export const PROCESS_FLOW_ADD_SUCCESS_MSG = "New Process Flow Added Successfully";

export const PROCESS_FLOW_DELETE_SUCCESS_MSG = "Process Deleted Successfully";

export const PROCESS_FLOW_UPDATE_SUCCESS_MSG = "New Process Flow Updated Successfully";

export const PROCESS_FLOW_TASK_DELETED_SUCCESS = "Process Flow Task Deleted Successfully";

export const DELETE_SUCCESS_STATUS = 204;

export const UNAUTHORIZED_STATUS = 401;

export const SKIP_LOGIN_PATH = '/login/';

export const SEARCH_FIELD_ID = "searchField";

export function isNonNull(lastName) {
  return lastName !== null && lastName !== undefined;
}

export const HOSPITAL_ID = "hospital-id";

export const ADMIN_ID = "admin-id";

export const AUTHORIZATION = "Authorization";
export const SEARCH_TERM = "SEARCH_TERM";

export const backDropStyle = {
  color: "#fff",
  zIndex: (theme) => theme.zIndex.drawer + 1,
  backgroundColor: "rgba(0,0,0,0.2)",
};

export const roasterFilterWidth = {
  width: "33vw",
};

export const MAX_STATION_NAME_LENGTH = 255;

export const NA = "NA";

export function calculateLength(val) {
  let firstName = val.firstName;
  let lastName = isNonNull(val.lastName) ? val.lastName : "";
  let combinedString = firstName + lastName;
  return combinedString.length;
}

export function isSearchRegex(value, regex) {
  return value === "" || regex.test(value);
}

export const DEFAULT_START_TIME = "00:00:00";
export function searchList(searchTerm, dispatch) {
  dispatch({
    type: SEARCH_TERM,
    payload: searchTerm,
  });
}

export function formatDate(startDate) {
  return (
    moment(startDate)
      .set("year", new Date().getFullYear())
      .toString()
      .substring(0, 16) + DEFAULT_START_TIME
  );
}

export const viewRoleCanvasWidth = {
  width: "25%",
};

export const getDateRangeMessage = (startDate, endDate) => {
  return `Date Range should be between....... ${moment(startDate).format(
    DATE_FORMAT
  )} & ${moment(endDate).format(DATE_FORMAT)}`;
};
export const ADD_ROLE_MODAL_ID = "addRole";

export const VIEW_STAFF_MODAL_ID = "viewStaff";

export const EDIT_ROLE_MODAL_ID = "editRole";

export const ADD_FLOOR_MODAL_ID = "addFloor";

export const ADD_GRADE_MODAL_ID = "addGrade";

export const EDIT_GRADE_MODAL_ID = "editGrade";

export const VIEW_ROASTER_MODAL_ID = "viewMagmt";

export const ADD_ROASTER_MODAL_ID = "addRosterMagmt";

export const ADD_STATION_MODAL_ID = "addStation";

export const ADD_TIME_SLOT_MODAL_ID = "addTimeSlot";

export const VIEW_ROLE_MODAL_ID = "viewRole";

export const TEMPLATE_FILE_NAME = "BulkStaffCreation_Template.xlsx";

export const TEMPLATE_DOWNLOAD_FAILED = "Template Download Failed";

export const TEMPLATE_DOWNLOAD_SUCCESS = "Template Downloaded Successfully";

export const RESPONSE_TYPE_BLOB = "blob";

export const ROASTER_TEMPLATE_FILE_NAME = "BulkRoasterCreation_Template.xlsx"

export const EMP_ID_MAX_LENGTH = 10;

export const downloadTemplate = (blob, fileName) => {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function nonNullCheck(val) {
  return isNonNull(val) ? val : "";
}

export const generateRandomNumber = (digits = 4) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const createFormData = (fileKey,file) => {
  const formData = new FormData();
  formData.append(fileKey, file);
  return formData;
};

export const API_SUCCESS_STATUS_CODE = 200;

export const API_WARNING_STATUS_CODE = 206;

export const warnSnackPosition = {
  vertical: "top",
  horizontal: "",
};

export const warnAlertStyles = {
  width: '30%',
  position: 'fixed',
  boxShadow: 'none',
  backgroundColor: '#F5C518',
  color: 'black'
};

export const warnSnackStyles = {
  position: 'relative',
  width: '100%',
};

export const defaultValue = (string) => {
  return string ? string : '-';
};

export const STAFF_FILE_KEY='staff-data-file'

export const STAFF_COMPONENT_KEY='staff'

export const ROASTER_FILE_KEY='rosterFile'

export const ROASTER_COMPONENT_KEY='roaster'

export const ADD_PRIORITY_TITLE = "Add Priority";

export const EDIT_PRIORITY_TITLE = "Edit Priority";


export function countNonEmptyValues(inputFields) {
  const nonEmptyValues = Object.values(inputFields).filter(
    (value) => value !== ""
  );
  return nonEmptyValues.length;
}

export const wholeNumberRegex = /^\d+$/;

export const ROLE_SIZE_WITH_OUT_FILTER = 1000

export const PRIORITY_CREATE_SUCCESS_MESSAGE="Priority Created Successfully";

export const PRIORITY_UPDATE_SUCCESS_MESSAGE="Priority Updated Successfully";

export const PRIORITY_NAME_ERROR='Priority Name is Mandatory'

export const PRIORITY_RANK_ERROR="Priority Level is Mandatory"

export const PRIORITY_CANVAS_ID="addPriority"

export const PRIORITY_COMPONENT_ID="addPriorityComponentId"

export const searchFocusStyle = {
  border: "1px solid #00BDD0",
  boxShadow: "0 0 5px rgba(0, 189, 208, 1)",
};

export const searchBlurStyle = {
  borderColor: "none",
};

export const ARRAY_BUFFER_RESPONSE_TYPE = "arraybuffer";

export const blobType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export const BULK_UPLOAD_SUCCESS_MSG =
  'Staff Uploaded Successfully'

export const BULK_UPLOAD_PARTIAL_SUCCESS_MSG = 
  "Bulk Staff Creation Request Processed. Please refer the downloaded file for any failures.";

export function decodeErrorResponse(error) {
  const decoder = new TextDecoder();
  const errorData = decoder.decode(error);
  return JSON.parse(errorData)
}

export const JSON_CONTENT_TYPE = "application/json";

export const CONTENT_TYPE_HEADER = "content-type";

export function isValidSearchLength(searchTerm) {
  return searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO;
}

export const matchesValues = (formValues, editDetails, keys) => {
  return keys.every((key) => formValues[key] === editDetails[key]);
};

export const ROSTER_BULK_UPLOAD_SUCCESS_MSG='All records have been successfully processed'

export const ROASTER_BULK_UPLOAD_PARTIAL_SUCCESS_MSG = "Bulk Roaster Creation Request Processed. Please refer the downloaded file for any failures.";

export const formatViewTitle = (fullName) => {
  return `${fullName} (Details)`;
};

export const DATE_RANGE_ERROR='Date Range is Mandatory'

export const ROASTER_FILTER_ERROR_MSG='Cannot filter rosters 90 days before or after the current date';


export const daysCount = (date1, date2) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const differenceMs = Math.abs(new Date(date1) - new Date(date2));
  return Math.round(differenceMs / ONE_DAY) + 1;
};

export const DEFAULT_TOTAL_PAGES=1;