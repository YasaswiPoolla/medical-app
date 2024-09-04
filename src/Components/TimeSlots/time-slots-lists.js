import React, { useEffect, useState, useCallback } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import editIcon from "../../Assets/edit.svg";
import AddTimeSlots from "./Add-Edit-timeslots";
import deleteImg from "../../Assets/delete.svg";
import { useDispatch } from "react-redux";
import {
  deleteTimeSlotsDeleteAPI,
  requestTimeSlotsGetALL,
  requestTimeSlotsGetALLSearch,
} from "../../Actions/TimeSlotsAction";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  DELETE_SUCCESS_STATUS,
  SEARCH_FOCUS_STYLE_VALUE,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STYLE,
  TIMESLOT_DELETE_SUCCESS_MSG,
  modalWidth,
  toolTipFont,
  ENTER_KEY,
  isSearchRegex,
  floorRegex,
  ADD_TIME_SLOT_MODAL_ID,
} from "../../Utils";
import secureLocalStorage from "react-secure-storage";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";

const TimeSlotsLists = (props) => {
  const [timeSlot, setTimeSlot] = useState();
  const [timeSlotsDeleteResponse, setTimeSlotsDeleteResponse] = useState();
  const [timeSlotsLists, setTimeSlotsLists] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const timeSlotsListsFn = useCallback(() => {
    dispatch(requestTimeSlotsGetALL()).then((response) => {
      if (response?.data?.body) {
        setTimeSlotsLists(response.data);
      } else {
        setTimeSlotsLists(response);
        setTimeSlotsDeleteResponse(response);
        handleErrorClickInAnotherComponent();
      }
    });
  }, [dispatch]);

  useEffect(() => {
    timeSlotsListsFn();
  }, [timeSlotsListsFn]);

  const [showModal, setShowModal] = useState(false);
  const handleDeleteModalClose = () => setShowModal(false);
  const handleDeleteModalShow = () => {
    setShowModal(true);
  };

  const deletefn = (data) => {
    handleDeleteModalShow();
    setTimeSlot(data);
  };

  const handleYes = () => {
    timeSlotsDeletefn(timeSlot);
  };

  const editTimeSlot = (data) => {
    setTimeSlot(data);
  };

  const timeSlotsDeletefn = (timeSlot) => {
    dispatch(deleteTimeSlotsDeleteAPI(timeSlot.shiftTimeId)).then(
      (response) => {
        if (response.status === DELETE_SUCCESS_STATUS) {
          handleClickInAnotherComponent();
          shiftTimeSlotsListfn();
          setTimeSlot("");
          handleDeleteModalClose();
          timeSlotsListsFn();
        } else {
          setTimeSlotsDeleteResponse(response);
          handleErrorClickInAnotherComponent();
          handleDeleteModalClose();
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
  const handleSearchFocus = () => {
    let searchId = document.getElementById("mySearchDiv5");
    searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
  };

  const handleSearchBlur = () => {
    let searchId = document.getElementById("mySearchDiv5");
    searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
  };

  const shiftTimeSlotsListfn = () => {
    dispatch(requestTimeSlotsGetALL()).then((response) => {
      secureLocalStorage.setItem(
        "timeSlotsList",
        JSON.stringify(response?.data)
      );
    });
  };

  const handleTimeSlotSearch = () => {
    let paramsData = {
      searchTerm: searchText,
    };
    dispatch(requestTimeSlotsGetALLSearch(paramsData)).then((response) => {
      if (response?.data?.body) {
        setTimeSlotsLists(response?.data);
      } else {
        setTimeSlotsLists(response);
        setTimeSlotsDeleteResponse(response);
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
          successMessage={TIMESLOT_DELETE_SUCCESS_MSG}
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={timeSlotsDeleteResponse}
        />
        <div className="headerOne border d-flex justify-content-between align-items-center p-4">
          <span className="titleHeader">Time Slot</span>
          <div className="d-flex align-items-center">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Add</Tooltip>}>
              <div
                className="addDiv p-2 d-flex align-items-center rounded-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#addTimeSlot"
                aria-controls="offcanvasRight"
              >
                <img src={addIcon} alt="img" className="me-2" />
                <span>Add</span>
              </div>
            </OverlayTrigger>
            <div
              className="ms-3 search align-items-center d-flex justify-content-center"
              id="mySearchDiv5"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            >
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
                    handleTimeSlotSearch();
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="ms-3">
          <div className="table_backgroud row w-100">
            <div className="col-6">
              <div className="scroll-container-roaster">
                <table className="container-fluid mt-2 table">
                  <thead className="table_head border border-top border-end-0  border-start-0">
                    <tr>
                      <th className="labels">
                        <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                          <span className="text-font ">Start Time</span>
                        </div>
                      </th>
                      <th className="labels">
                        <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                          <span className="text-font">End Time</span>
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
                    {timeSlotsLists?.body?.length > 0 ? (
                      timeSlotsLists.body.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="table-td">
                              {item?.shiftStartTime
                                ? item?.shiftStartTime
                                : "-"}
                            </td>
                            <td className="table-td">
                              {item?.shiftEndTime ? item?.shiftEndTime : "-"}
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
                                    data-bs-target="#addTimeSlot"
                                    aria-controls="offcanvasRight"
                                    onClick={() => {
                                      editTimeSlot(item);
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
                        <td colSpan={3}>
                          <div className="text-center"> {timeSlotsLists}</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-6">
              <div className="mt-2 bg_img h-100">
                <img src={backgroundImage} className="ms-5 bg_img2" alt="img" />
              </div>
            </div>
          </div>

          <DeleteModal
            showModal={showModal}
            handleClose={handleDeleteModalClose}
            handleYes={handleYes}
          />
        </div>

        <ReusableModal id={ADD_TIME_SLOT_MODAL_ID} style={modalWidth}>
          <AddTimeSlots
            editDetails={timeSlot}
            onEditTimeSlot={editTimeSlot}
            timeSlotsFn={() => {
              timeSlotsListsFn();
            }}
          />
        </ReusableModal>
      </div>
    </>
  );
};

export default TimeSlotsLists;
