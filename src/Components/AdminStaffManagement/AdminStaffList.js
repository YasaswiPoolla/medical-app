import search from "../../Assets/search.svg";
import edit from "../../Assets/edit.svg";
import eyeIcon from "../../Assets/blueEye.svg";
import closedEye from "../../Assets/close_eye.svg";
import deleteImg from "../../Assets/delete.svg";
import Header from "../Header/Header";
import AdminStaffCreation from ".././AdminStaffManagement/AdminstaffCreation";
import { useEffect, useState } from "react";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import { connect, useDispatch } from "react-redux";
import {
  deleteStaffAction,
  staffList,
} from "../../Actions/AdminStaffManagementActions";
import Pagination from "../Pagination";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import {
  WORKER_DELETE_SUCCESS_MESSAGE,
  SUCCESS,
  modalWidth,
  toolTipFont,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  modalTopMarginWidth,
  ROLE_NAME_LENGTH,
  SEARCH_FOCUS_STYLE_VALUE,
  STYLE,
  DELETE_SUCCESS_STATUS,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STAFF_CREATE_CANVAS_ID,
  STAFF_EDIT_CANVAS_ID,
  ZERO,
  FULL_NAME_LENGTH,
  SEARCH_FIELD_ID,
  NO_RECORDS,
  calculateLength,
  floorRegex,
  isSearchRegex,
  VIEW_STAFF_MODAL_ID,
  EDIT_ROLE_MODAL_ID,
  nonNullCheck,
  defaultValue,
} from "../../Utils";
import Footer from "../Footer/Footer";
import AdminstaffEdit from "./AdminstaffEdit";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import secureLocalStorage from "react-secure-storage";
import AdminstaffView from '../AdminStaffManagement/AdminstaffView';
import { searchList } from "../../Utils";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";

function AdminStaffList({
  errorMessage,
  currentPage,
  itemsPerPage,
  totalpages,
  openModal,
  openCanvas,
  closeModal,
  searchTermValue
}) {
  const [showModal, setShowModal] = useState(false);
  const [workerId, setWorkerId] = useState(null);
  const [noRecords, setNoRecords] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);
  const handleDeleteModalShow = () => {
    setShowModal(true);
  };
  const [editDetails, setEditDetails] = useState();
  const [viewDetails, setViewDetails] = useState();
  const [searchTermFromState, setsearchTermFromState] = useState({
    searchTerm: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (isSearchRegex(value, floorRegex)) {
      setsearchTermFromState({ ...searchTermFromState, [name]: value });
      if (value?.length === ZERO) {
        searchList(value, dispatch);
      }
    }
  };
  const handleYes = () => {
    handleDeleteModalClose();
    deleteWorker(workerId);
  };

  const deletefn = (workerId) => {
    setWorkerId(workerId);
    handleDeleteModalShow();
  };

  const editfn = (val) => {
    setEditDetails(val);
  };

  const viewfn = (val) => {
    setViewDetails(val);
  };
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const [revealedNumbers, setRevealedNumbers] = useState([]);
  const  handleStaffSearch = () => {
    if (
      searchTermFromState?.searchTerm.length > MIN_SEARCH_LENGTH ||
      searchTermFromState?.searchTerm.length === ZERO
    ) {
      searchList(searchTermFromState?.searchTerm,dispatch)
   
    }
  };
  const deleteWorker = (workerId) => {
    dispatch(deleteStaffAction(workerId)).then(
      (response) => {
        if (response.status === DELETE_SUCCESS_STATUS) {
          setIsSnackOpen(true);
          dispatch(
            staffList(
              currentPage > 0 ? currentPage - 1 : currentPage,
              itemsPerPage
            )
          ).then(
            (response) => {
              if (response.data.status === SUCCESS) {
                setData(response.data);
              }
            },
            (error) => {
              setData(error);
              setIsErrorSnackOpen(true);
              setNoRecords(true);
            }
          );
        }
      },
      (error) => {
        setIsErrorSnackOpen(true);
      }
    );
  };

  let rolesList = JSON.parse(secureLocalStorage.getItem("rolesList"));
  let departmentsList = JSON.parse(
    secureLocalStorage.getItem("departmentsList")
  );
  let gradesList = JSON.parse(secureLocalStorage.getItem("gradesList"));

  const [revealedPhoneNumber, setRevealedPhoneNumber] = useState("");

  const handleViewClick = (index, phoneNumber) => {
    setRevealedPhoneNumber(phoneNumber);
    if (revealedNumbers[index]) {
      setRevealedNumbers((prevRevealedNumbers) => ({
        ...prevRevealedNumbers,
        [index]: "",
      }));
    } else {
      setRevealedNumbers((prevRevealedNumbers) => ({
        ...prevRevealedNumbers,
        [index]: phoneNumber,
      }));
    }
  };

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const staffListWithPagination=()=>{
    dispatch(staffList(currentPage, itemsPerPage)).then(
      (response) => {
        if (response.data.status === SUCCESS) {
          setData(response.data);
        }
      },
      (error) => {
        setData(error);
        setIsErrorSnackOpen(true);
        setNoRecords(true);
      }
    );
  }
  useEffect(() => {
    dispatch(staffList(currentPage, itemsPerPage,searchTermValue)).then(
      (response) => {
        if (response.data.status === SUCCESS) {
          setData(response.data);
        }
      },
      (error) => {
        setData(error);
        setIsErrorSnackOpen(true);
        setNoRecords(true);
      }
    );
  }, [dispatch, currentPage, itemsPerPage,searchTermValue]);

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  useEffect(() => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    if (isSearchFocused) {
      searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
    } else {
      searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
    }
  }, [isSearchFocused]);

  return (
    <>
      <div className="">
        <div className="ng-container d-flex tableBackground">
          <div>
            <BootstrapSidebar />
          </div>
          <div className="w-100 ms-5">
            <div className="ms-2 ">
              <Header />
            </div>
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={WORKER_DELETE_SUCCESS_MESSAGE}
            />
            {errorMessage && (
              <div>
                <ErrorSnack
                  open={isErrorSnackOpen}
                  onClose={handleErrorSnackClose}
                  errorMessage={errorMessage}
                />
              </div>
            )}
            <div className=" ms-1  ">
                <div className="headerOne border d-flex justify-content-between align-items-center p-4">
                <span className="titleHeader">Hospital Staff</span>
                <div className="d-flex">
                  <AdminStaffCreation
                    rolesList={rolesList}
                    departmentsList={departmentsList}
                    gradesList={gradesList}
                    id={STAFF_CREATE_CANVAS_ID}
                    staffListFn={() => {
                      staffListWithPagination();
                    }}
                  />

                  <div
                    className="ms-3 search align-items-center d-flex justify-content-center"
                    id={SEARCH_FIELD_ID}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  >
                    <img src={search} className="ms-2" alt="img" />
                    <input
                      type="text"
                      placeholder="Enter min. 3 characters"
                      className="search_input w-100 ms-2"
                      id="mySearchInput"
                      onChange={handleOnChange}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="searchTerm"
                      value={searchTermFromState?.searchTerm}
                      onKeyDown={(event) => {
                        if (event.key === ENTER_KEY) {
                          handleStaffSearch();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className=" mt-2 ms-4 ">
                <div className="row w-100">
                  <div className="table_backgroud row w-100 ">
                    <div className="scroll-container">
                      <table className="container-fluid table mt-1">
                        <thead className="table_head border border-top border-end-0  border-start-0 m-0 p-0 w-100 py-1">
                          <tr>
                          <th className="labels py-1">
                              <div className="  d-flex justify-content-between text-center border py-1 border-top-0 border-bottom-0 border-start-0">
                                <span className="text_font">Emp ID</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className="  d-flex justify-content-between text-center border py-1 border-top-0 border-bottom-0 border-start-0">
                                <span className="text_font">Name</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className=" d-flex justify-content-between  text-center border py-1 border-top-0 border-bottom-0 border-start-0 ">
                                <span className="text_font">Role</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className=" d-flex justify-content-between  text-center border py-1  border-top-0 border-bottom-0 border-start-0  ">
                                <span className="text_font">Department</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className=" d-flex justify-content-between  text-center border py-1  border-top-0 border-bottom-0 border-start-0 ">
                                <span className="text_font">Mobile Number</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className=" d-flex justify-content-between  text-center border py-1 border-top-0 border-bottom-0 border-start-0  ">
                                <span className="text_font">Grade</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className="  d-flex justify-content-between text-center border py-1 border-top-0 border-bottom-0 border-start-0 ">
                                <span className="text_font">Email ID</span>
                              </div>
                            </th>
                            <th className="labels py-1">
                              <div className=" d-flex justify-content-between  text-center border py-1  border-top-0 border-bottom-0 border-start-0 ">
                                <span className="text_font mb-1">Actions</span>
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {data?.body?.length > 0 ? (
                            data.body.map((val, index) => (
                              <tr key={val.id} className="row-highlight p-0">
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {nonNullCheck(defaultValue(val?.empId))}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {calculateLength(val) > FULL_NAME_LENGTH ? (
                                    <div
                                      class="truncate"
                                      title={val.firstName + " " + val.lastName}
                                    >
                                      {defaultValue(val.firstName + " " + val.lastName)}
                                    </div>
                                  ) : (
                                    <>{defaultValue(val.firstName + " " + val.lastName)}</>
                                  )}
                                </td>

                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {val.role.length > ROLE_NAME_LENGTH ? (
                                    <div class="truncate" title={val.role}>
                                      {defaultValue(val.role)}
                                    </div>
                                  ) : (
                                    <>
                                    {defaultValue(val.role)}
                                    </>
                                  )}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {defaultValue(val.departmentName)}
                                </td>
                                <td className="table-td">
                                  <div className="d-flex justify-content-between m-0 p-0 me-2">
                                    {revealedPhoneNumber === val.phoneNo ? (
                                      <>
                                        {defaultValue(val.phoneNo)}
                                        <span
                                          onClick={() =>
                                            setRevealedPhoneNumber("")
                                          }
                                          className="m-0 p-0 close-cursor"
                                        >
                                          <img
                                            src={closedEye}
                                            className="me-2 eye-icon"
                                            alt="img"
                                          />
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        **********
                                        <span
                                          onClick={() =>
                                            handleViewClick(index, val.phoneNo)
                                          }
                                          className="m-0 p-0 close-cursor"
                                        >
                                          <img
                                            src={eyeIcon}
                                            className="me-2  eye-icon"
                                            alt="img"
                                          />
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {defaultValue(val.gradeName)}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewStaff"
                                  aria-controls="offcanvasRight"
                                  onClick={() => viewfn(val)}
                                >
                                  {defaultValue(val.emailId)}
                                </td>
                                <td className=" table-td py-1">
                                  <div className=" d-flex justify content-center">
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={
                                        <Tooltip style={toolTipFont}>
                                          Edit
                                        </Tooltip>
                                      }
                                    >
                                      <img
                                        src={edit}
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#editRole"
                                        aria-controls="offcanvasRight"
                                        className="cursorClass button-border p-2 ms-2"
                                        onClick={() => editfn(val)}
                                        alt="img"
                                      />
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={
                                        <Tooltip style={toolTipFont}>
                                          Delete
                                        </Tooltip>
                                      }
                                    >
                                      <img
                                        src={deleteImg}
                                        className="deleteCursor button-border p-2 ms-2"
                                        onClick={() => {
                                          deletefn(val?.workerId);
                                        }}
                                        alt="img"
                                      ></img>
                                    </OverlayTrigger>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={9}>
                                <div className="text-center">
                                  {errorMessage && noRecords ? NO_RECORDS : ""}
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <Pagination
                      totalPages={totalpages}
                      currentPage={currentPage}
                    />
                    <DeleteModal
                      showModal={showModal}
                      handleClose={handleDeleteModalClose}
                      handleYes={handleYes}
                    />
                  </div>

                  <ReusableModal
                    id={VIEW_STAFF_MODAL_ID}
                    style={modalTopMarginWidth}
                  >
                    <AdminstaffView viewDetails={viewDetails} />
                  </ReusableModal>

                  <ReusableModal id={EDIT_ROLE_MODAL_ID} style={modalWidth}>
                    <AdminstaffEdit
                      rolesList={rolesList}
                      departmentsList={departmentsList}
                      gradesList={gradesList}
                      editDetails={editDetails}
                      staffListFn={() => {
                        staffListWithPagination();
                      }}
                      id={STAFF_EDIT_CANVAS_ID}
                    />
                  </ReusableModal>
                </div>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  errorMessage: state.staffCreationReducerFn?.errorMessage,
  currentPage: state.PaginationReducer?.currentPage,
  itemsPerPage: state.PaginationReducer?.itemsPerPage,
  totalpages: state.PaginationReducer?.totalPages,
  openModal: state.staffManagementReducerFn?.openModal,
  openCanvas: state.staffManagementReducerFn?.openCanvas,
  closeModal: state.staffManagementReducerFn?.closeModal,
  searchTermValue:state.PaginationReducer?.searchTerm
});

export default connect(mapStateToProps)(AdminStaffList);
