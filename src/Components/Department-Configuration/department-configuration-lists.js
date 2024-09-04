import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import AddDepartmentConfiguration from "./Add-Edit-department-configuration";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import { connect, useDispatch } from "react-redux";
import {
  requestDepartmentListGETAll,
  deleteDepartmentConfigDELETEAPI,
} from "../../Actions/DepartmentConfigAction";
import Pagination from "../Pagination";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import deleteImg from "../../Assets/delete.svg";
import {
  DELETE_SUCCESS_STATUS,
  DEPARTMENT_DELETE_SUCCESS_MSG,
  SEARCH_FOCUS_STYLE_VALUE,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STYLE,
  SEARCH_FIELD_ID,
  NO_RECORDS,
  modalWidth,
  toolTipFont,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  ZERO,
  ADD_FLOOR_MODAL_ID,
} from "../../Utils";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import secureLocalStorage from "react-secure-storage";
import { SUCCESS } from "../../Utils";
import { departmentList } from "../../Actions/AdminStaffManagementActions";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
const DepartmentConfiguration = ({
  errorMessage,
  props,
  currentPage,
  totalpages,
  itemsPerPage,
}) => {
  const dispatch = useDispatch();

  const [departmentDetails, setDepartmentDetails] = useState();
  const [departmentLists, setDepartmentLists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noRecords, setNoRecords] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const departmentListFn = useCallback(() => {
    dispatch(
      requestDepartmentListGETAll(currentPage, itemsPerPage, searchTerm)
    ).then((response) => {
      if (response?.data?.body) {
        setTotalPages(response?.data?.totalPages);
        setNoRecords(false);
        setDepartmentLists(response.data);
      } else {
        setNoRecords(true);
        setErrorMsg(response);
        handleErrorClickInAnotherComponent();
      }
    });
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    departmentListFn();
  }, [departmentListFn]);

  const getalldepartmentListFn = () => {
    dispatch(departmentList()).then((response) => {
      if (response.data.status === SUCCESS) {
        secureLocalStorage.setItem(
          "departmentsList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };

  const [showModal, setShowModal] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);

  const handleDeleteModalShow = () => setShowModal(true);

  const deletefn = (item) => {
    setDepartmentDetails(item);
    handleDeleteModalShow();
  };
  const handleYes = () => {
    handleDelete(departmentDetails?.departmentId);
    handleDeleteModalClose();
  };

  const editDepartmentDetails = (data) => {
    setDepartmentDetails(data);
  };

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };
  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDelete = (id) => {
    dispatch(deleteDepartmentConfigDELETEAPI(id)).then(
      (response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          handleClickInAnotherComponent();
          setDepartmentDetails("");
          departmentListFn();
          getalldepartmentListFn();
        }
      },
      (error) => {
        setErrorMsg(error);
        handleErrorClickInAnotherComponent();
      }
    );
  };
  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const handleSearchFocus = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
  };

  const handleSearchBlur = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
  };
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleDepartmentSearch = () => {
    if (searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO) {
      departmentListFn();
    }
  };

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

          <div>
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={DEPARTMENT_DELETE_SUCCESS_MSG}
            />
            <ErrorSnack
              open={isErrorSnackOpen}
              onClose={handleErrorSnackClose}
              errorMessage={errorMsg}
            />
          </div>
          <div className="">
            <div className="headerOne border d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">Department Configuration</span>
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv p-2 d-flex align-items-center rounded-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addFloor"
                    aria-controls="offcanvasRight"
                  >
                    <img src={addIcon} className="me-2" alt="img" />
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
                    placeholder="Search"
                    className="search_input   w-100 ms-2"
                    onChange={handleChange}
                    onKeyDown={(event) => {
                      if (event.key === ENTER_KEY) {
                        handleDepartmentSearch();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="table_backgroud ms-4">
              <div className="d-flex">
                <div className="scroll-container">
                  <table className="container-fluid mt-2 table">
                    <thead className="table_head border border-top border-end-0  border-start-0">
                      <tr>
                        <th className="labels">
                          <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">Department Name</span>
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
                      {departmentLists?.body?.length > 0 ? (
                        departmentLists.body.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="table-td">
                                {item?.departmentName
                                  ? item?.departmentName
                                  : "-"}
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
                                      src={editIcon}
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#addFloor"
                                      aria-controls="offcanvasRight"
                                      onClick={() => {
                                        editDepartmentDetails(item);
                                      }}
                                      className="cursorClass p-2  rounded-2 "
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
                                        deletefn(item);
                                      }}
                                      alt="img"
                                    ></img>
                                  </OverlayTrigger>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7}>
                            <div className="text-center">
                              {noRecords ? NO_RECORDS : ""}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 bg_img ms-2">
                  <img
                    src={backgroundImage}
                    className="ms-5 bg_img2"
                    alt="img"
                  />
                </div>
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
              ></Pagination>
              <DeleteModal
                showModal={showModal}
                handleClose={handleDeleteModalClose}
                handleYes={handleYes}
              />
            </div>

            <ReusableModal id={ADD_FLOOR_MODAL_ID} style={modalWidth}>
              <AddDepartmentConfiguration
                editDetails={departmentDetails}
                onEditDepartment={editDepartmentDetails}
                departmentLists={() => {
                  departmentListFn();
                }}
              />
            </ReusableModal>
            <CancelModal />
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

export default connect(mapStateToProps)(DepartmentConfiguration);
