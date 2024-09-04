import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import AddEditStation from "./add-edit-station";
import deleteImg from "../../Assets/delete.svg";
import { useDispatch } from "react-redux";
import {
  deleteStationDeleteAPI,
  requestStationGetALL,
  requestStationGetALLSearch,
} from "../../Actions/StationAction";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import {
  DELETE_SUCCESS_STATUS,
  STATION_DELETED_MESSAGE,
  STATION_NAME_COLUMN_LENGTH,
  modalWidth,
  toolTipFont,ENTER_KEY,
  ADD_STATION_MODAL_ID
} from "../../Utils";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import secureLocalStorage from "react-secure-storage";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";

const StationLists = (props) => {
  const [stationDetails, setStationDetails] = useState();
  const [stationLists, setStationLists] = useState([]);
  const [stationDeleteResponse, setStationDeleteResponse] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const stationListsFn = useCallback(() => {
    dispatch(requestStationGetALL()).then((response) => {
      if (response?.data?.body) {
        setStationLists(response.data);
      } else {
        setStationLists(response);
        setStationDeleteResponse(response);
        handleErrorClickInAnotherComponent();
      }
    });
  }, [dispatch]);

  useEffect(() => {
    stationListsFn();
  }, [stationListsFn]);

  const deletefn = (data) => {
    handleDeleteModalShow();
    setStationDetails(data);
  };

  const handleDeleteModalShow = () => {
    setShowModal(true);
  };
  const handleYes = () => {
    stationDeletefn(stationDetails);
  };

  const editStationDetails = (data) => {
    setStationDetails(data);
  };

  const stationDeletefn = (stationDetails) => {
    dispatch(deleteStationDeleteAPI(stationDetails.shiftStationId)).then(
      (response) => {
        if (response?.status === DELETE_SUCCESS_STATUS) {
          handleClickInAnotherComponent();
          shiftStationListsfn();
          setStationDetails("");
          handleDeleteModalClose();
          stationListsFn();
        } else {
          setStationDeleteResponse(response);
          handleErrorClickInAnotherComponent();
          handleDeleteModalClose();
        }
      }
    );
  };

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };
  const handleDeleteModalClose = () => setShowModal(false);

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const shiftStationListsfn = () => {
    dispatch(requestStationGetALL()).then((response) => {
      secureLocalStorage.setItem(
        "stationsList",
        JSON.stringify(response?.data)
      );
    });
  };

  const handleStationSearch = () => {
    let paramsData = {
      "search-term": searchText,
    };
    dispatch(requestStationGetALLSearch(paramsData)).then((response) => {
      if (response?.data?.body) {
        setStationLists(response?.data);
      } else {
        setStationLists(response);
        setStationDeleteResponse(response);
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
          successMessage={STATION_DELETED_MESSAGE}
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={stationDeleteResponse}
        />
        <div className="headerOne border d-flex justify-content-between align-items-center p-4">
          <span className="titleHeader">Station</span>
          <div className="d-flex align-items-center">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add</Tooltip>}>
              <div
                className="addDiv p-2 d-flex align-items-center rounded-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#addStation"
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
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === ENTER_KEY) {
                    handleStationSearch();
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
                        <span className="text-font">Station Name</span>
                      </div>
                    </th>
                    <th className="labels">
                      <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                        <span className="text-font ms-3">Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stationLists?.body?.length > 0 ? (
                    stationLists.body.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="table-td">
                            {item?.stationName.length >
                            STATION_NAME_COLUMN_LENGTH ? (
                              <div
                                class="truncate_roaster"
                                title={item?.stationName}
                              >
                                {item?.stationName}
                              </div>
                            ) : (
                              <>{item?.stationName}</>
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
                                  data-bs-target="#addStation"
                                  aria-controls="offcanvasRight"
                                  onClick={() => {
                                    editStationDetails(item);
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
                        <div className="text-center"> {stationLists}</div>
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

        <ReusableModal id={ADD_STATION_MODAL_ID} style={modalWidth}>
          <AddEditStation
            editDetails={stationDetails}
            onEditStation={editStationDetails}
            stationListsFn={() => {
              stationListsFn();
            }}
          />
        </ReusableModal>
      </div>
    </>
  );
};

export default StationLists;
