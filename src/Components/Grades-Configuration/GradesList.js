import React, { useState, useEffect, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import {
  gradesFetchAction,
  gradesDeleteAction
} from "../../Actions/GradeConfigAction";
import { useDispatch, connect } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import {
  modalWidth,
  SUCCESS,
  SEARCH_FIELD_ID,
  NO_RECORDS,ENTER_KEY,
  SEARCH_FOCUS_STYLE_VALUE,
  GRADE_DELETE_SUCCESS_MESSAGE,
  toolTipFont,
  STYLE,
  DELETE_SUCCESS_STATUS,
  SEARCH_NOFOCUS_STYLE_VALUE,
  ADD_GRADE_MODAL_ID,
  EDIT_GRADE_MODAL_ID,
  ZERO,
  DEFAULT_TOTAL_PAGES,
} from "../../Utils";
import AddGradeConfiguration from "./Add-Edit-gradeconfiguration";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { gradesList } from "../../Actions/AdminStaffManagementActions";
import secureLocalStorage from "react-secure-storage";
import { GRADE_CREATE_CANVAS_ID, GRADE_EDIT_CANVAS_ID } from "../../Utils";
import deleteImg from "../../Assets/delete.svg";

import backgroundImage from "../../Assets/floor_bg_2.svg";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import Pagination from "../Pagination";

export const GradesList = (props) => {
  
  const gradeError = props?.errorMessage;
  const currentPage = props?.currentPage
  const itemsPerPage = props?.itemsPerPage;
  const [searchText,setSearchText] = useState('');
  const [gradeDetails, setGradeDetails] = useState();

  const [gradeId, setGradeId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gradeList, setGradeList] = useState();
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES);
  const [noRecords, setNoRecords] = useState(false)
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };
  const handleYes = () => {
    handleClose();
    handleDelete(gradeId);
  };
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const dispatch = useDispatch();
  const gradeListpagination = useCallback(() => {
    dispatch(gradesFetchAction(currentPage,itemsPerPage,searchText)).then(
      (response)=>
      {
        if (response?.data?.body) {
          setGradeList(response.data)
          setTotalPages(response?.data?.totalPages);
        }
      },
       (error) => {
        setNoRecords(true)
        setGradeList(error)
        
    });
  }, [dispatch, currentPage, itemsPerPage,searchText]);

  useEffect(() => {
    gradeListpagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,currentPage,itemsPerPage]);

  const gradeListFn = () => {
    dispatch(gradesList()).then((response) => {
      if (response.data.status === SUCCESS) {
        secureLocalStorage.setItem(
          "gradesList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };

  const handleDelete = (gradeId) => {
    dispatch(gradesDeleteAction(gradeId)).then(
      (response) => {
        if (response.status === DELETE_SUCCESS_STATUS) {
          setIsSnackOpen(true);
          gradeListpagination();
          gradeListFn();
        }
      },
      (error) => {
      }
    );
  };

  const editGradeDetails = (data) => {
    setGradeDetails(data);
  };
  const deletefn = (gradeId) => {
    setGradeId(gradeId);
    handleShow();
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

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleGradesSearch = () => {
    if (searchText) {
      gradeListpagination(); 
    }
  }

  useEffect(() => {
    if (searchText.length === ZERO) {
      gradeListpagination();
    }
  }, [searchText,gradeListpagination]);
  
  return (
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
            successMessage={GRADE_DELETE_SUCCESS_MESSAGE}
          />
          <div className="headerOne border d-flex justify-content-between align-items-center p-4">
            <span className="titleHeader">Grades Configuration</span>
            <div className="d-flex align-items-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Add</Tooltip>}
              >
                <div
                  className="addDiv p-2 d-flex align-items-center rounded-2 "
                  data-bs-toggle="offcanvas"
                  data-bs-target="#addGrade"
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
                  onChange={handleOnChange}
                  onKeyDown={(event) => {
                    if (event.key === ENTER_KEY) {
                      handleGradesSearch();
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
                      {gradeList?.body?.length > 0 ?(
                        gradeList.body.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="table-td">
                                {item?.gradeName ? item?.gradeName : "-"}
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
                                      data-bs-target="#editGrade"
                                      aria-controls="offcanvasRight"
                                      onClick={() => {
                                        editGradeDetails(item);
                                      }}
                                      className="cursorClass  p-2  rounded-2 "
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
                                        deletefn(item?.gradeId);
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
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>

            <ReusableModal id={ADD_GRADE_MODAL_ID} style={modalWidth}>
              <AddGradeConfiguration
                gradeError={gradeError}
                gradesList={() => {
                  gradeListpagination();
                }}
                id={GRADE_CREATE_CANVAS_ID}
              />
            </ReusableModal>

            <ReusableModal id={EDIT_GRADE_MODAL_ID} style={modalWidth}>
              <AddGradeConfiguration
                gradeDetails={gradeDetails}
                gradeError={gradeError}
                gradesList={() => {
                  gradeListpagination();
                }}
                id={GRADE_EDIT_CANVAS_ID}
              />
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
  );
};
const mapStateToProps = (store) => {
  return {
    state: store.gradesReducer,
    errorMessage: store.roleReducer?.error,
    currentPage: store.PaginationReducer?.currentPage,
    itemsPerPage: store.PaginationReducer?.itemsPerPage,
    totalpages: store.PaginationReducer?.totalPages,
    searchTermValue:store.PaginationReducer?.searchTerm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gradesFetchAction: () => dispatch(gradesFetchAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradesList);
