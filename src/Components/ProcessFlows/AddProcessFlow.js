import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import editIcon from "../../Assets/edit.svg";
import filterImage from "../../Assets/filterIcon.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { toolTipFont } from "../../Utils";
import AddTrigger from "./AddTrigger";
import DynamicFlowIndex from "./index";
import { addProcessFlow } from "../../Actions/ProcessFlowAction";
import { rolesFetchAction } from "../../Actions/RoleConfigurationAction";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import {
  fetchProcessTasks,
  getProcessByIdAction,
  setProcessTasksDataEmptyAction,
} from "../../Actions/ProcessFlowAction";
import paths from "../../router/paths";
import { ENTER_KEY,generateRandomNumber,SUCCESS,ROLE_SIZE_WITH_OUT_FILTER } from "../../Utils";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import { PROCESS_FLOW_ADD_SUCCESS_MSG } from "../../Utils";
import "./process.css";

const AddProcessFlow = (props) => {
  const dispatch = useDispatch();
  const { processTasks, processIdData } = useSelector(
    (state) => state.ProcessFlowReducer
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [processName, setProcessName] = useState("");
  const [viewDynamicFlow, setViewDynamicFlow] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  useEffect(() => {
    const processId = sessionStorage.getItem("processId");
    dispatch(rolesFetchAction(0,ROLE_SIZE_WITH_OUT_FILTER));
    if (processId) {
      dispatch(fetchProcessTasks(processId));
      dispatch(getProcessByIdAction(processId));
    } else {
      dispatch(setProcessTasksDataEmptyAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (processTasks?.length > 0) {
      setViewDynamicFlow(true);
    } else {
      setViewDynamicFlow(false);
    }
  }, [processTasks]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setProcessName(value);
  };

  const handleKeyPress = (e) => {
    const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));
    const hospitalId = storedData?.data?.body?.hospitalId;

    if (e?.key === ENTER_KEY) {
      dispatch(
        addProcessFlow({
          processName: processName,
          "hospital-id": hospitalId,
          processFlowPriority: generateRandomNumber(),
          processFlowSequence: generateRandomNumber(),
        })
      ).then((response) => {
        if (response?.data?.status === SUCCESS) {
          setOpen(false);
          setIsSnackOpen(true);
          sessionStorage.setItem("processId", response?.data?.body?.processId);
          dispatch(getProcessByIdAction(response?.data?.body?.processId));
        }
      });
    }
  };
  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };
  return (
    <>
      <div className="d-flex">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={PROCESS_FLOW_ADD_SUCCESS_MSG}
        />
        <div>
          <BootstrapSidebar />
        </div>
        <div className="tableBackground ms-5 addProcessContainer">
          <div className="ms-2 ">
            <Header />
          </div>

          <div className="headerOne border d-flex justify-content-between align-items-center p-4">
            <span className="titleHeader">
              Add Process Flow &nbsp; &nbsp;
              <small><span onClick={() => navigate(paths?.processFlow)}>Process Flows</span> / {processIdData?.processName}</small>
            </span>

            {!processIdData?.processName ? (
              <span className="titleHeader">
                <span className="titleHeaderName d-flex">
                  {editClicked ? (
                    <input
                      placeholder="Enter Process Name"
                      className={`form-control inputfocus`}
                      onChange={handleChange}
                      name="processName"
                      onKeyDown={handleKeyPress}
                    />
                  ) : (
                    <>
                      Name Your Flow &nbsp;
                      <div>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip style={toolTipFont}>Edit</Tooltip>}
                        >
                          <img
                            src={editIcon}
                            className="cursorClass p-1 rounded-2"
                            alt="img"
                            onClick={() => setEditClicked(true)}
                          />
                        </OverlayTrigger>
                      </div>
                    </>
                  )}
                </span>
              </span>
            ) : null}
          </div>

          <div className="ms-2 d-flex addProcessInternal">
            <div className="sideBox p-2">
              <span className="toolBoxName">ToolBox</span>

              <p className="toolBoxDesc mt-2">
                Click and drag a block to the canvas to build a workflow.
              </p>

             {viewDynamicFlow ?  <div className="mt-2 cursor-pointer" onClick={toggleDrawer(true)}>
                <div className="toolBoxCard mt-2">
                  <img
                    src={filterImage}
                    alt="img"
                    className="toolboxIcon filterColor"
                  />{" "}
                  &nbsp;
                  <small>Add</small>
                </div>
              </div> : null}
            </div>

            {viewDynamicFlow ? (
              <DynamicFlowIndex />
            ) : (
              <div
                style={{
                  pointerEvents: processIdData?.processName ? "auto" : "none",
                }}
              >
                <div className="addTriggerBtn" onClick={toggleDrawer(true)}>
                  <img
                    src={filterImage}
                    alt="img"
                    className="toolboxIcon filterColor"
                  />{" "}
                  &nbsp;
                  <small>Click to Add a Trigger</small>
                </div>
              </div>
            )}
          </div>

          {/* off canvane */}
          <div
            className="modalTopMargin offCanvasWidth"
            aria-labelledby="offcanvasRightLabel"
          >
            <AddTrigger id="addTriggerId" open={open} setOpen={setOpen} />
          </div>
          {/*  */}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default AddProcessFlow;
