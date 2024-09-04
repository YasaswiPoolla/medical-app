import React, { useState, useEffect, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import AddRoleConfiguration from "./Add-Edit-roleconfiguration";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import { rolesFetchAction } from "../../Actions/RoleConfigurationAction";
import { departmentFetchAction } from "../../Actions/DepartmentAction";
import { useDispatch, connect } from "react-redux";
import { rolesDeleteAction } from "../../Actions/RoleConfigurationAction";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import { rolesList } from "../../Actions/AdminStaffManagementActions";
import secureLocalStorage from "react-secure-storage";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import { ViewRole } from "./View-Role";
import {
  DELETE_SUCCESS_STATUS,
  SEARCH_FOCUS_STYLE_VALUE,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STYLE,
  NO_RECORDS,
  SUCCESS,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  ZERO,
  NA,
  ADD_ROLE_MODAL_ID,
  EDIT_ROLE_MODAL_ID,
  VIEW_ROLE_MODAL_ID,
  viewRoleCanvasWidth,
} from "../../Utils";
import {
  ROLE_CREATE_CANVAS_ID,
  ROLE_DELETE_SUCCESS_MESSAGE,
  toolTipFont,
  modalWidth,
  ROLE_EDIT_CANVAS_ID,
  SEARCH_FIELD_ID,
} from "../../Utils";
import Pagination from "../Pagination";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import deleteImg from "../../Assets/delete.svg";

const RolesConfiguration = (props) => {
  const currentPage = props?.currentPage;
  const itemsPerPage = props?.itemsPerPage;
  const totalpages = props?.totalpages;

  const [rolesDetails, setRolesDetails] = useState();

  const [departmentDetails, setDepartmentDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const handleClose = () => setShowModal(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleShow = () => {
    setShowModal(true);
  };
  const handleYes = () => {
    handleClose();
    handleDelete(roleId);
  };

  const deletefn = (roleId) => {
    setRoleId(roleId);
    handleShow();
  };
  const roleListfn = () => {
    dispatch(rolesList()).then((response) => {
      if (response.data.status === SUCCESS) {
        secureLocalStorage.setItem(
          "rolesList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };

  const handleDelete = (roleId) => {
    dispatch(rolesDeleteAction(roleId)).then(
      (response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          setIsSnackOpen(true);
          roleListfn();
          rolespaginationListfn();
          dispatch(departmentFetchAction());
        }
      },
      (error) => {
        handleErrorClickInAnotherComponent();
      }
    );
  };

  const editDepartmentDetails = (data) => {
    setDepartmentDetails(data);
  };

  const dispatch = useDispatch();

  const rolespaginationListfn = useCallback(() => {
    dispatch(rolesFetchAction(currentPage, itemsPerPage, searchTerm)).then(
      (response) => {
        if (response?.data?.body) {
          setRolesDetails(response?.data);
        } else {
          setRolesDetails(response);
          handleErrorClickInAnotherComponent();
        }
      },
      (error) => {
        setRolesDetails(error);
        handleErrorClickInAnotherComponent();
      }
    );
  }, [dispatch, currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    rolespaginationListfn();
  }, [rolespaginationListfn]);

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const AddEditError = props?.errorMessage;

  const handleSearchFocus = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
  };

  const handleSearchBlur = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
  };

  const handleRoleSearch = () => {
    if (searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO) {
      rolespaginationListfn();
    }
  };

  return (
    <>
      <div className="d-flex">
        <div>
          <BootstrapSidebar />
        </div>
        <div className="tableBackground ms-5">
          <div className="ms-2 ">
            <Header />
          </div>
          <div className="">
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={ROLE_DELETE_SUCCESS_MESSAGE}
            />
            <ErrorSnack
              open={isErrorSnackOpen}
              onClose={handleErrorSnackClose}
              errorMessage={AddEditError}
            />

            <div className="headerOne border d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">Roles Configuration</span>
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv p-2 d-flex align-items-center rounded-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addRole"
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
                    placeholder="Search"
                    className="search_input w-100 ms-2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === ENTER_KEY) {
                        handleRoleSearch();
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
                          <div className="table-row  border  border-top-0 border-bottom-0 border-start-0 ">
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
                            <span className="text-font">Grade</span>
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
                      {rolesDetails?.body ? (
                        rolesDetails?.body?.map((item, index) => {
                          return (
                            <tr className="row-highlight">
                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#viewRole"
                                aria-controls="offcanvasRight"
                                onClick={() => {
                                  editDepartmentDetails(item);
                                }}
                              >
                                {item?.role ? item?.role : "-"}
                              </td>
                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#viewRole"
                                aria-controls="offcanvasRight"
                                onClick={() => {
                                  editDepartmentDetails(item);
                                }}
                              >
                                {item?.departmentName
                                  ? item?.departmentName
                                  : NA}
                              </td>

                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#viewRole"
                                aria-controls="offcanvasRight"
                                onClick={() => {
                                  editDepartmentDetails(item);
                                }}
                              >
                                {item?.gradeName ? item?.gradeName : NA}
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
                                      data-bs-target="#editRole"
                                      aria-controls="offcanvasRight"
                                      onClick={() => {
                                        editDepartmentDetails(item);
                                      }}
                                      className="cursorClass button-border p-2"
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
                                        deletefn(item?.roleId);
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
                          <td colSpan={4}>
                            <div className="text-center">
                              {props?.errorMessage ? NO_RECORDS : ""}
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
              <Pagination totalPages={totalpages} currentPage={currentPage} />
            </div>
            <ReusableModal id={ADD_ROLE_MODAL_ID} style={modalWidth}>
              <AddRoleConfiguration
                AddEditError={AddEditError}
                roleList={() => {
                  rolespaginationListfn();
                }}
                id={ROLE_CREATE_CANVAS_ID}
                isViewMode={false}
              />
            </ReusableModal>

            <ReusableModal id={EDIT_ROLE_MODAL_ID} style={modalWidth}>
              <AddRoleConfiguration
                editDetails={departmentDetails}
                setDepartmentDetails={setDepartmentDetails}
                AddEditError={AddEditError}
                id={ROLE_EDIT_CANVAS_ID}
                roleList={() => {
                  rolespaginationListfn();
                }}
                isViewMode={false}
              />
            </ReusableModal>

            <ReusableModal id={VIEW_ROLE_MODAL_ID} style={viewRoleCanvasWidth}>
              <ViewRole editDetails={departmentDetails} />
            </ReusableModal>
          </div>

          <DeleteModal
            showModal={showModal}
            handleClose={handleClose}
            handleYes={handleYes}
          />

          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    state: store.roleReducer,
    errorMessage: store.roleReducer?.error,
    departmentState: store.departmentReducer,
    currentPage: store.PaginationReducer?.currentPage,
    itemsPerPage: store.PaginationReducer?.itemsPerPage,
    totalpages: store.PaginationReducer?.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rolesFetchAction: () => dispatch(rolesFetchAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesConfiguration);
