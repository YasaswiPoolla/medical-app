import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import AddEditFloor from "./add-edit-floor";
import { useDispatch } from "react-redux";
import deleteImg from "../../Assets/delete.svg";
import {
  deleteFloorDeleteAPI,
  requestFloorGetALL,
  requestFloorGetALLSearch,
} from "../../Actions/FloorAction";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import {
  modalWidth,
  toolTipFont,
  ENTER_KEY,
  FLOOR_DELETE_SUCCESS_MSG,
  DELETE_SUCCESS_STATUS,
  isSearchRegex,
  floorRegex,
  ADD_FLOOR_MODAL_ID,
} from "../../Utils";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import secureLocalStorage from "react-secure-storage";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";

const FlootLists = (props) => {
  const [floorDetails, setFloorDetails] = useState();
  const [floorDetailsLists, setFloorDetailsLists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const floorList = useCallback(() => {
    dispatch(requestFloorGetALL()).then((response) => {
      if (response?.data?.body) {
        setFloorDetailsLists(response.data);
      } else {
        setFloorDetailsLists(response);
        setFloorDeleteResponse(response);
        handleErrorClickInAnotherComponent();
      }
    });
  }, [dispatch]);

  useEffect(() => {
    floorList();
  }, [floorList]);

  const deletefn = (data) => {
    handleDeleteModalShow();
    setFloorDetails(data);
  };
  const [floorDeleteResponse, setFloorDeleteResponse] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);
  const handleDeleteModalShow = () => {
    setShowModal(true);
  };
  const handleYes = () => {
    floorDeletefn(floorDetails);
  };

  const editFloorDetails = (data) => {
    setFloorDetails(data);
  };

  const floorDeletefn = (floorDetails) => {
    dispatch(deleteFloorDeleteAPI(floorDetails.shiftLocationId)).then(
      (response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          handleClickInAnotherComponent();
          setFloorDetails("");
          floorListsfn();
          handleDeleteModalClose();
          floorList();
        } else {
          handleDeleteModalClose();
          setFloorDeleteResponse(response);
          handleErrorClickInAnotherComponent();
        }
      }
    );
  };

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const floorListsfn = () => {
    dispatch(requestFloorGetALL()).then((response) => {
      secureLocalStorage.setItem("floorsList", JSON.stringify(response?.data));
    });
  };

  const handleFloorSearch = () => {
    let paramsData = {
      "search-term": searchText,
    };
    dispatch(requestFloorGetALLSearch(paramsData)).then((response) => {
      if (response?.data?.body) {
        setFloorDetailsLists(response?.data);
      } else {
        setFloorDetailsLists(response);
        setFloorDeleteResponse(response);
        handleErrorClickInAnotherComponent();
      }
    });
  };

  return (
    <>
      <div className="">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={FLOOR_DELETE_SUCCESS_MSG}
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={floorDeleteResponse}
        />
        <div className="headerOne border d-flex justify-content-between align-items-center p-4">
          <span className="titleHeader">Floor</span>
          <div className="d-flex align-items-center">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add</Tooltip>}>
              <div
                className="addDiv p-2 d-flex align-items-center rounded-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#addFloor"
                aria-controls="offcanvasRight"
              >
                <img src={addIcon} alt="img" className="me-2" />
                <span>Add</span>
              </div>
            </OverlayTrigger>
            <div className="ms-3 search align-items-center d-flex justify-content-center ">
              <img src={searchIcon} className="ms-2" alt="img" />
              <input
                type="text"
                placeholder="Search"
                className="search_input w-100 ms-2"
                value={searchText}
                onChange={(e) => {
                  if (isSearchRegex(e?.target?.value, floorRegex)) {
                    setSearchText(e.target.value);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === ENTER_KEY) {
                    handleFloorSearch();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex">
            <div className="scroll-container-roaster">
              <table className="container-fluid mt-2 table">
                <thead className="table_head border border-top border-end-0  border-start-0">
                  <tr>
                    <th className="labels">
                      <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                        <span className="text-font">Floor Name</span>
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
                  {floorDetailsLists?.body?.length > 0 ? (
                    floorDetailsLists.body.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-td py-1">
                            {item?.shiftLocation.length > 20 ? (
                              <div
                                class="truncate_roaster"
                                title={item?.shiftLocation}
                              >
                                {item?.shiftLocation}
                              </div>
                            ) : (
                              <>{item?.shiftLocation}</>
                            )}
                          </td>

                          <td className=" table-td py-1">
                            <div className=" d-flex justify content-center">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip style={toolTipFont}>Edit</Tooltip>
                                }
                              >
                                <img
                                  src={editIcon}
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#addFloor"
                                  aria-controls="offcanvasRight"
                                  onClick={() => {
                                    editFloorDetails(item);
                                  }}
                                  className="cursorClass p-2  rounded-2 "
                                  alt="img"
                                />
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip style={toolTipFont}>Delete</Tooltip>
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
                      <td colSpan={3}>
                        <div className="text-center">{floorDetailsLists}</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-2 bg_img ms-2">
              <img src={backgroundImage} className="ms-5 bg_img2" alt="img" />
            </div>
          </div>
          <DeleteModal
            showModal={showModal}
            handleClose={handleDeleteModalClose}
            handleYes={handleYes}
          />
        </div>
        <ReusableModal id={ADD_FLOOR_MODAL_ID} style={modalWidth}>
          <AddEditFloor
            editDetails={floorDetails}
            onEditFloor={editFloorDetails}
            floorListCallBackFn={floorList}
            floorList={() => {
              floorList();
            }}
          />
        </ReusableModal>
      </div>
    </>
  );
};

export default FlootLists;
