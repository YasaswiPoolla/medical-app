import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import { connect, useDispatch } from "react-redux";
import { priorityDeleteAction } from "../../Actions/PriorityConfigAction";
import Pagination from "../Pagination";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import deleteImg from "../../Assets/delete.svg";
import { priorityFetchAction } from "../../Actions/PriorityConfigAction";
import {
  DELETE_SUCCESS_STATUS,
  NO_RECORDS,
  modalWidth,
  toolTipFont,
  defaultValue,
  PRIORITY_DELETE_SUCCESS_MSG,
  PRIORITY_CANVAS_ID,
  PRIORITY_COMPONENT_ID,
  searchFocusStyle,
  searchBlurStyle,
  ENTER_KEY,
  floorRegex,
  isSearchRegex,
  isValidSearchLength,
} from "../../Utils";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import { AddEditPriority } from "./Add-Edit-priority-configuration";
const PriorityConfiguration = ({
  currentPage,
  totalpages,
  itemsPerPage,
}) => {
  const dispatch = useDispatch();

  const [priorityDetails, setPriorityDetails] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDivStyle,setSearchDivStyle] = useState({});
  const [priorityLists, setPriorityLists] = useState([]);
  const [noRecords, setNoRecords] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const priorityListFn = useCallback(() => {
    dispatch(priorityFetchAction(currentPage, itemsPerPage,searchTerm)).then(
      (response) => {
        if (response?.data?.body) {
          setTotalPages(response?.data?.totalPages);
          setNoRecords(false);
          setPriorityLists(response?.data);
        } 
      },
      (error)=>{
        setNoRecords(true);
        setPriorityLists(error)
      }
    )
  }, [dispatch, currentPage, itemsPerPage,searchTerm]);

  useEffect(() => {
    priorityListFn(); 
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
   [currentPage,itemsPerPage]);

  const [showModal, setShowModal] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);

  const handleDeleteModalShow = () => setShowModal(true);

  const deletefn = (item) => {
    setPriorityDetails(item);
    handleDeleteModalShow();
  };
  const handleYes = () => {
    handleDelete(priorityDetails?.priorityId);
    handleDeleteModalClose();
  };

  const editPriorityDetails = (data) => {
    setPriorityDetails(data);
  };

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch(priorityDeleteAction(id)).then(
      (response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          handleClickInAnotherComponent();
          setPriorityDetails("");
          priorityListFn();
        }
      }
    );
  };
  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const handleSearchFocus = () => {
    setSearchDivStyle(searchFocusStyle)
  };

  const handleSearchBlur = () => {
    setSearchDivStyle(searchBlurStyle)
  };

  const handleChange = (e) => {
    if(isSearchRegex(e?.target?.value,floorRegex)){
      setSearchTerm(e.target.value);
    } 
  };
  const handleDepartmentSearch = () => {
    if (isValidSearchLength(searchTerm)) {
      priorityListFn();
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
              successMessage={PRIORITY_DELETE_SUCCESS_MSG}
            />
          </div>
          <div className="">
            <div className="headerOne border d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">Priority Configuration</span>
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv p-2 d-flex align-items-center rounded-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addPriority"
                    aria-controls="offcanvasRight"
                  >
                    <img src={addIcon} className="me-2" alt="img" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>
                <div
                  className="ms-3 search align-items-center d-flex justify-content-center"
                  style={searchDivStyle}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                >
                  <img src={searchIcon} className="ms-2" alt="img" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="search_input w-100 ms-2"
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
                            <span className="text-font">Priority Name</span>
                          </div>
                        </th>
                        <th className="labels">
                          <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">Priority Level</span>
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
                      {priorityLists?.body?.length > 0 ? (
                        priorityLists.body.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="table-td">
                                {defaultValue(item?.priorityName)}
                              </td>
                              <td className="table-td">
                                {defaultValue(item?.priorityRank)}
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
                                      data-bs-target="#addPriority"
                                      aria-controls="offcanvasRight"
                                      onClick={() => {
                                        editPriorityDetails(item);
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

            <ReusableModal
              id={PRIORITY_CANVAS_ID}
              style={modalWidth}
            >
             <AddEditPriority id={PRIORITY_COMPONENT_ID} handlePriorityListUpdate={priorityListFn} editDetails={priorityDetails} onEditPriority={editPriorityDetails}/> 
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

export default connect(mapStateToProps)(PriorityConfiguration);
