import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import filterIcon from "../../Assets/filter.svg";
import editIcon from "../../Assets/edit.svg";
import deleteIcon from "../../Assets/delete.svg";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import ViewRosterManagement from "./view-roster-management";
import {
  DATE_FORMAT,
  DELETE_SUCCESS_STATUS,
  FULL_NAME_LENGTH,
  ROASTER_DELETE_SUCCESS_MSG,
  SEARCH_FOCUS_STYLE_VALUE,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STYLE,
  SEARCH_FIELD_ID,
  NO_RECORDS,
  modalTopMarginWidth,
  roasterFilterWidth,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  ZERO,
  VIEW_ROASTER_MODAL_ID,
  ADD_ROASTER_MODAL_ID,
  API_SUCCESS_STATUS_CODE,
  TEMPLATE_DOWNLOAD_SUCCESS,
  TEMPLATE_DOWNLOAD_FAILED,
  createFormData,
  API_WARNING_STATUS_CODE,
  ROASTER_FILE_KEY,
  ROASTER_COMPONENT_KEY,
  CONTENT_TYPE_HEADER,
  JSON_CONTENT_TYPE,
  ROSTER_BULK_UPLOAD_SUCCESS_MSG,
  ROASTER_BULK_UPLOAD_PARTIAL_SUCCESS_MSG,modalWidth, toolTipFont, VIEW,
  ROASTER_FILTER_ERROR_MSG,
  daysCount,
} from "../../Utils";
import closeIcon from "../../Assets/close.svg";
import AddRosterManagement from "./add-roster-management";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import { connect, useDispatch } from "react-redux";
import {
  deleteRosterManagementDeleteAPI,
  requestRosterManagementListGetALL,
  roasterTemplateDownloadAction,
} from "../../Actions/RosterManagementAction";
import Pagination from "../Pagination";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import { UploadTemplate } from "../../ReUsable-Components/Upload-Template";
import { templateUploadAction } from "../../Actions/TemplateUploadAction";

const RosterManagementLists = ({
  errorMessage,
  props,
  currentPage,
  totalpages,
  itemsPerPage,
}) => {
  const [rosterDetails, setRosterDetails] = useState();
  const [viewDetails, setViewDetails] = useState(false);
  const [rosterManagementList, setRosterManagementList] = useState([]);
  const [noRecords, setNoRecords] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [applyfilter, setApplyFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getRosterManagmentList = useCallback(() => {
    const currentDate = moment();

    const startDateTime = currentDate.clone().startOf("month");

    const endDateTime = currentDate.clone().endOf("month");
    dispatch(
      requestRosterManagementListGetALL(
        startDateTime.toString().substring(0, 24),
        endDateTime.toString().substring(0, 24),
        currentPage,
        itemsPerPage,
        searchTerm
      )
    )
      .then((response) => {
        if (response?.data?.body) { 
          setNoRecords(false);
          setRosterManagementList(response?.data);
        } 
      })
      .catch((err) => {
        setNoRecords(true);
        setRosterManagementList(err);
      });
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  const getRosterManagmentListFilter = useCallback(() => {
    setApplyFilter(true);
    const endDateTime = moment(state[0].endDate).endOf("day");
    dispatch(
      requestRosterManagementListGetALL(
        moment(state[0].startDate).toString().substring(0, 24),
        endDateTime.toString().substring(0, 24),
        currentPage,
        itemsPerPage,
        searchTerm
      )
    )
      .then((response) => {
        if (response?.data?.body) {
          setNoRecords(false);
          setRosterManagementList(response.data);
        } else {
          setNoRecords(true);
          setRosterManagementList(response);
        }
      })
      .catch((err) => {
        setNoRecords(true);
        setRosterManagementList(err);
      });
  }, [dispatch, state, currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    if (applyfilter) {
      getRosterManagmentListFilter();
    } else {
      getRosterManagmentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, applyfilter]);

  const deletefn = (data) => {
    handleDeleteModalShow();
    setRosterDetails(data);
  };

  const [showModal, setShowModal] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);
  const handleDeleteModalShow = () => {
    setShowModal(true);
  };
  const handleYes = () => {
    rosterDeletefn(rosterDetails);
  };

  const rosterDeletefn = (rosterDetails) => {
    let payload = {};

    dispatch(deleteRosterManagementDeleteAPI(payload, rosterDetails.rosterId))
      .then((response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          setSuccessMsg(ROASTER_DELETE_SUCCESS_MSG);
          handleClickInAnotherComponent();
          setRosterDetails("");
          handleDeleteModalClose();
          if (applyfilter) {
            getRosterManagmentListFilter();
          } else {
            getRosterManagmentList();
          }
        } 
      })
      .catch((err) => {
        setRosterManagementList(err);
        handleErrorClickInAnotherComponent();
        handleDeleteModalClose();
      });
  };

  const editRosterDetails = (data, screenName) => {
    setRosterDetails(data);
    if (screenName === `${VIEW}`) {
      setViewDetails(true);
    } else {
      setViewDetails(false);
    }
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const submit = () => {
    setIsFilterApplied(true);

    if (daysCount(state[0]?.startDate, state[0]?.endDate) <= 90) {
      getRosterManagmentListFilter();
    } else {
      setRosterManagementList(ROASTER_FILTER_ERROR_MSG);
      handleErrorClickInAnotherComponent();
    }
  };

  const clearFilter = () => {
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const handleOnClear = () => {
    clearFilter();
    setIsFilterApplied(false);
    getRosterManagmentList();
  }

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };
  const handleRoasterSearch = () => {
    if (searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO) {
      if (!applyfilter) {
        getRosterManagmentList();
      } else {
        getRosterManagmentListFilter();
      }
    }
  };

  const handleSearchFocus = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
  };

  const handleSearchBlur = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
  };

  /**
   * This function handles the download of a template. It dispatches an action
   * to download the template and handles the success or failure of the download process.
   * On success, it sets a success message and opens success snackbar.
   * On failure, it sets an error message and opens error snackbar.
   */
  const templateCreation = () => {
    dispatch(roasterTemplateDownloadAction()).then(
      (response) => {
        if (response?.status === API_SUCCESS_STATUS_CODE) {
          setSuccessMsg(TEMPLATE_DOWNLOAD_SUCCESS);
          handleClickInAnotherComponent();
        }
      },
      (error) => {
        setRosterManagementList(TEMPLATE_DOWNLOAD_FAILED);
        handleErrorClickInAnotherComponent();
      }
    );
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = createFormData(ROASTER_FILE_KEY, file);
      dispatch(templateUploadAction(ROASTER_COMPONENT_KEY, formData))
        .then((response) => {
          if (response?.headers[CONTENT_TYPE_HEADER] === JSON_CONTENT_TYPE) {
            setSuccessMsg(ROSTER_BULK_UPLOAD_SUCCESS_MSG);
          } else {
            setSuccessMsg(ROASTER_BULK_UPLOAD_PARTIAL_SUCCESS_MSG);
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

  const handleOnChange = (e) =>{
    const { value } = e.target;
      setSearchTerm(value);
      if (value?.length === ZERO) {
        if (applyfilter) {
          getRosterManagmentListFilter();
        } else {
          getRosterManagmentList();
        }
      }
  }

  return (
    <>
      <div className="d-flex">
        <div>
          <BootstrapSidebar />
        </div>
        <div className="tableBackground ms-5">
          <div className="ms-2">
            <Header />
          </div>

          <div className="">
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={successMsg}
            />
            <ErrorSnack
              open={isErrorSnackOpen}
              onClose={handleErrorSnackClose}
              errorMessage={rosterManagementList}
            />

            <div className="headerOne  d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">Roster Management</span>

              <div className="d-flex align-items-center">
                <div
                  className="addDiv border p-2 me-2 d-flex align-items-center rounded-2 border-secondary"
                  onClick={templateCreation}
                >
                  <span className="me-1 p-1">Download Template</span>
                  <i class="fa-solid fa-download"></i>
                </div>
                <UploadTemplate handleFileChange={handleFileChange} />
                <div
                  className="addDiv me-3 p-2 d-flex align-items-center rounded-2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#filter"
                  aria-controls="offcanvasRight"
                >
                  <img src={filterIcon} className="me-2" alt="img" />
                  <span>Filter</span>
                </div>
                {isFilterApplied ? (
                  <div className="addDiv me-3 p-2 d-flex align-items-center rounded-2" onClick={handleOnClear}>
                    <img src={filterIcon} className="me-2" alt="img" />
                    <span>Clear</span>
                  </div>
                ) : null}
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv p-2 d-flex align-items-center rounded-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addRosterMagmt"
                    aria-controls="offcanvasRight"
                  >
                    <img src={addIcon} alt="img" className="me-2" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>

                <div
                  className="ms-3 search align-items-center d-flex justify-content-center"
                  id={SEARCH_FIELD_ID}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                >
                  <img src={searchIcon} className="ms-2" alt="img" />
                  <input
                    type="text"
                    placeholder="Enter min. 3 characters"
                    className="search_input w-100 ms-2"
                    onChange={handleOnChange}
                    onKeyDown={(event) => {
                      if (event.key === ENTER_KEY) {
                        handleRoasterSearch();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className=" mt-2 ms-4 ">
              <div className="row w-100">
                <div className="table_backgroud">
                  <div className="scroll-container">
                    <table className="container-fluid mt-0 table mt-1 ">
                      <thead className="table_head border border-top border-end-0  border-start-0">
                        <tr>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Full Name</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Role</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Department</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Shift Time Slot</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Shift Station</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Shift Location</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row">
                              <span className="text-font">From Date</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row">
                              <span className="text-font">To Date</span>
                            </div>
                          </th>
                          <th className="labels">
                            <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                              <span className="text-font">Actions</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rosterManagementList?.body?.length > 0 ? (
                          rosterManagementList.body.map((item, index) => {
                            return (
                              <tr
                                key={index}
                                onClick={() => {
                                  editRosterDetails(item, VIEW);
                                }}
                                className="row-highlight"
                              >
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {(item?.firstName + " " + item?.lastName)
                                    .length > FULL_NAME_LENGTH ? (
                                    <div
                                      class="truncate"
                                      title={
                                        item?.firstName + " " + item?.lastName
                                      }
                                    >
                                      {item?.firstName + " " + item?.lastName}
                                    </div>
                                  ) : (
                                    <>
                                      {item?.firstName + " " + item?.lastName}
                                    </>
                                  )}
                                </td>

                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.role ? item?.role : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.departmentName
                                    ? item?.departmentName
                                    : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.shiftStartTime
                                    ? item?.shiftStartTime +
                                      " - " +
                                      item?.shiftEndTime
                                    : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.stationName ? item?.stationName : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.shiftLocation
                                    ? item?.shiftLocation
                                    : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.startDate
                                    ? moment(item?.startDate).format(
                                        DATE_FORMAT
                                      )
                                    : "-"}
                                </td>
                                <td
                                  className="table-td close-cursor"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#viewMagmt"
                                  aria-controls="offcanvasRight"
                                >
                                  {item?.endDate
                                    ? moment(item?.endDate).format(DATE_FORMAT)
                                    : "-"}
                                </td>
                                <td className="py-1">
                                  <div>
                                    <OverlayTrigger
                                      placement="bottom"
                                      overlay={
                                        <Tooltip style={toolTipFont}>
                                          Edit
                                        </Tooltip>
                                      }
                                    >
                                      <img
                                        src={editIcon}
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#addRosterMagmt"
                                        aria-controls="offcanvasRight"
                                        onClick={() => {
                                          editRosterDetails(item, "edit");
                                        }}
                                        className="cursorClass ms-2 p-2  rounded-2 "
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
                                        src={deleteIcon}
                                        className=" ms-2 p-2  rounded-2  deleteCursor"
                                        onClick={() => {
                                          deletefn(item);
                                        }}
                                        alt="img"
                                      />
                                    </OverlayTrigger>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            {/**
                             * Here the number in the colspan indicates the number of columns
                             */}
                            <td colSpan={9}>
                              <div className="text-center">
                                {noRecords ? NO_RECORDS : ""}
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
                  ></Pagination>
                  <DeleteModal
                    showModal={showModal}
                    handleClose={handleDeleteModalClose}
                    handleYes={handleYes}
                  />
                </div>

                <ReusableModal
                  id={VIEW_ROASTER_MODAL_ID}
                  style={modalTopMarginWidth}
                >
                  <ViewRosterManagement
                    editDetails={rosterDetails}
                    onEditRoster={editRosterDetails}
                  />
                </ReusableModal>

                <ReusableModal id={ADD_ROASTER_MODAL_ID} style={modalWidth}>
                  <AddRosterManagement
                    roasterManagementListsFn={() => {
                      getRosterManagmentList();
                    }}
                    editDetails={rosterDetails}
                    onEditRoster={editRosterDetails}
                    viewDetails={viewDetails}
                  />
                </ReusableModal>

                <div
                  className="offcanvas border h-100 offcanvas-end w-50 modalTopMargin"
                  tabindex="-1"
                  id="filter"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="tableBackground h-100">
                    <div className="tableBackground h-100">
                      <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
                        <span className="titleHeader">{"Filter"}</span>
                        <img
                          src={closeIcon}
                          data-bs-dismiss="offcanvas"
                          className="close-cursor"
                          onClick={clearFilter}
                          alt="img"
                        />
                      </div>
                      <div className="m-1">
                        <div className="d-flex">
                          <div className="m-1">
                            <div className="d-flex justify-content-between">
                              <div>
                                <span className="labels">
                                  Date & Time Range
                                </span>
                              </div>
                              <div className="">
                                <div
                                  data-bs-dismiss="offcanvas"
                                  className="save-button align-items-center ms-0 d-flex border justify-content-center rounded-2"
                                  type="submit"
                                  onClick={submit}
                                >
                                  <span className="saveText">Apply</span>
                                </div>
                              </div>
                            </div>

                            <DateRangePicker
                              onChange={(item) => setState([item.selection])}
                              showSelectionPreview={true}
                              moveRangeOnFirstSelection={false}
                              months={1}
                              ranges={state}
                              direction="horizontal"
                              className="mt-1"
                              style={roasterFilterWidth}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.PaginationReducer?.currentPage,
  itemsPerPage: state.PaginationReducer?.itemsPerPage,
  totalpages: state.PaginationReducer?.totalPages,
});

export default connect(mapStateToProps)(RosterManagementLists);
