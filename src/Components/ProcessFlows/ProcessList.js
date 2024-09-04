import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import {
  setProcessIdDataEmptyAction,
  fetchAllProcessAction,
  deleteProcess,
} from "../../Actions/ProcessFlowAction";
import paths from "../../router/paths";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { SUCCESS,PROCESS_FLOW_DELETE_SUCCESS_MSG } from "../../Utils";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import "./process.css";

const ProcessList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { processFlowData } = useSelector((state) => state.ProcessFlowReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedData, setSelectedData] = useState({});
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const getData = () => {
    sessionStorage.setItem("processId", "");
    const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));
    const hospitalId = storedData?.data?.body?.hospitalId;
    dispatch(setProcessIdDataEmptyAction());
    dispatch(fetchAllProcessAction(hospitalId));
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setSelectedData(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedData({});
  };

  const handleDelete = () => {
    dispatch(deleteProcess(selectedData.processId)).then((response) => {
      if (response?.data?.status === SUCCESS) {
        getData();
        setAnchorEl(null);
        setIsSnackOpen(true);
      }
    });
  };

  const handleProcessClick = (data) => {
    sessionStorage.setItem("processId", data.processId);
    navigate(paths?.addProcessFlow);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
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
              onClose={setIsSnackOpen}
              successMessage={PROCESS_FLOW_DELETE_SUCCESS_MSG}
            />
            <div className="headerOne border d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">Process Flows</span>
              <div
                className="d-flex align-items-center"
                onClick={() => navigate(paths?.addProcessFlow)}
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div className="addDiv p-2 d-flex align-items-center rounded-2">
                    <img src={addIcon} alt="img" className="me-2" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>

                <div className="ms-3 search align-items-center d-flex justify-content-center">
                  <img src={searchIcon} className="ms-2" alt="img" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="search_input w-100 ms-2"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="p-4">
              <div className="row">
                {processFlowData?.map((data, index) => {
                  return (
                    <div className="col-3 p-2 cardHeight" key={data?.processId}>
                      <div className="card d-flex flex-column h-100">
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div>
                            <h6
                              className="card-title"
                              onClick={() => handleProcessClick(data)}
                            >
                              {data.processName}
                            </h6>
                            <IconButton
                              aria-describedby={id}
                              className="more-icon"
                              onClick={(e) => handleClick(e, data)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Popover
                              id={id}
                              open={openPopover}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Typography className="popover-content cursor-pointer">
                                <p
                                  className="p-1 m-0"
                                  onClick={() => handleDelete()}
                                >
                                  Delete
                                </p>
                              </Typography>
                            </Popover>
                            <span className="card-text position-absolute bottom-0 start-1 card-text-name pb-3 font-size-small">
                              {data?.createdBy}
                            </span>
                          </div>
                          <div className="d-flex justify-content-end">
                            <span className="card-text font-size-small">
                              {data?.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessList;
