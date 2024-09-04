import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import addIcon from "../../Assets/add.svg";
import Switch from "@mui/material/Switch";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Drawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  fetchProcessTasks,
  processFlowSuccessStart,
} from "../../Actions/ProcessFlowAction";
import secureLocalStorage from "react-secure-storage";
import { getTaskData } from "./payload";
import {
  PROCESS_FLOW_ADD_SUCCESS_MSG,
  PROCESS_FLOW_UPDATE_SUCCESS_MSG,SUCCESS
} from "../../Utils";

const typesData = [
  {
    key: 1,
    value: "Radio",
  },
  {
    key: 2,
    value: "Text",
  },
  {
    key: 3,
    value: "Checkbox",
  },
  {
    key: 4,
    value: "File",
  },
];

export const AddTrigger = (props) => {
  const { processIdData } = useSelector(
    (state) => state.ProcessFlowReducer
  );
  const { roleDetails } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [inputFields, setInputFields] = useState({});
  const [fieldsData, setFieldsData] = useState([{ key: 0, type: "Radio" }]);
  const [optionsData, setOptionsData] = useState([{ key: 0 }]);
  const { open, setOpen, editDetails, clickedOptionData } = props;

  useEffect(() => {
    if (editDetails?.label) {
      let tempObj = {};
      tempObj.trigger = editDetails?.label;
      tempObj.initialTat = editDetails?.initialTat;
      tempObj.description = editDetails?.description;
      setOptionsData(
        editDetails?.options?.map((item, index) => ({
          ...item,
          key: index,
          value: item.option,
        })) || []
      );
      tempObj.roles = roleDetails?.data?.body?.find(ele => ele?.roleId === editDetails?.roleId)?.role || "";
      setInputFields(tempObj);
      setFieldsData(
        editDetails?.fieldsData?.map((item, index) => ({
          ...item,
          key: index,
          name: item.fieldValue,
        })) || []
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDetails]);

  useEffect(() => {
    if (!open) {
      setInputFields({});
      setOptionsData([{ key: 0 }]);
      setFieldsData([{ key: 0, type: "Radio" }]);
    }
  }, [open]);

  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFieldsChange = (value, fieldName, eachField, index) => {
    let tempData = [...fieldsData];
    tempData[index][fieldName] = value;
    setFieldsData(tempData);
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    const storedData = JSON.parse(secureLocalStorage.getItem("reactlocal"));
    const hospitalId = storedData?.data?.body?.hospitalId;
    const roleId = roleDetails?.data?.body?.find(ele => ele?.role === inputFields?.roles)?.roleId

    if (editDetails?.taskName) {
      let payload = getTaskData(
        { ...editDetails, ...inputFields },
        optionsData,
        fieldsData,
        roleId,
        hospitalId,
        editDetails?.taskLink
      );
      dispatch(updateTask(editDetails?.taskId, payload)).then((response) => {
        if (response?.data?.status === SUCCESS) {
          dispatch(processFlowSuccessStart(PROCESS_FLOW_UPDATE_SUCCESS_MSG));
          dispatch(fetchProcessTasks(processIdData?.processId));
          setOpen(false);
        }
      });
    } else {
      let payload = getTaskData(
        { ...inputFields },
        optionsData,
        fieldsData,
        roleId,
        hospitalId,
        clickedOptionData?.id
      );
      dispatch(addTask(payload)).then((response) => {
        if (response?.data?.status === SUCCESS) {
          dispatch(processFlowSuccessStart(PROCESS_FLOW_ADD_SUCCESS_MSG));
          dispatch(fetchProcessTasks(processIdData?.processId));
          setOpen(false);
        }
      });
    }
  };

  const cancelFn = () => {
    handleReload();
    setShowCancelModal(false);
  };

  const handleReload = () => {
    setOpen(false);
  };

  const handleOptionsChange = (e, index) => {
    const { value } = e.target;
    optionsData[index].value = value;
    setOptionsData([...optionsData]);
  };

  const handleRemoveOption = (index) => {
    optionsData.splice(index, 1);
    setOptionsData([...optionsData]);
  };

  const handleRemoveField = (index) => {
    fieldsData.splice(index, 1);
    setFieldsData([...fieldsData]);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        className="mui-sideBarDrawer"
      >
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">Trigger</span>
          <img
            src={closeIcon}
            className="close-cursor"
            alt="img"
            onClick={() => setOpen(false)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-2 sideTrigger">
            <div className="p-2">
              <label className="labels_add_trigger">Trigger</label>
              <span className="strike">*</span>
              <input
                placeholder="Enter Trigger"
                className={`w-100 form-control inputfocus`}
                onChange={handleChange}
                name="trigger"
                value={inputFields?.trigger}
                required
                disabled={editDetails?.label ? true : false}
              />
            </div>{" "}
            <div className="p-2">
              <label className="labels_add_trigger">Initial Tat[Miniutes]</label>
              <span className="strike">*</span>
              <input
                placeholder="Enter Initial Tat"
                className={`w-100 form-control inputfocus`}
                onChange={handleChange}
                name="initialTat"
                value={inputFields?.initialTat}
                required
                type="number"
              />
            </div>{" "}
            <div className="p-2">
              <label className="labels_add_trigger">Description</label>
              <span className="strike">*</span>
              <textarea
                placeholder="Enter Description"
                className={`w-100 form-control inputfocus`}
                onChange={handleChange}
                name="description"
                value={inputFields?.description}
                required
              />
            </div>{" "}
            <div className="p-2">
              <div className="d-flex align-items-center">
                <label className="labels_add_trigger">Fields</label>
                <span className="strike">*</span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv d-flex align-items-center justify-content-end rounded-2 p-2 ms-auto"
                    onClick={() =>
                      setFieldsData([...fieldsData, { key: fieldsData.length }])
                    }
                  >
                    <img src={addIcon} alt="img" className="me-2" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>
              </div>
              {fieldsData?.map((eachField, index) => (
                <div className="d-flex">
                  <div className="p-2">
                    <label className="labels_add_trigger">Type</label>

                    <select
                      className={`form-select  thin-scrollbar inputfocus`}
                      onChange={(e) =>
                        handleFieldsChange(
                          e.target.value,
                          "type",
                          eachField,
                          index
                        )
                      }
                      value={eachField?.type}
                      name="type"
                      required
                    >
                      {typesData?.map((item) => (
                        <option>{item?.value}</option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2">
                    <label className="labels_add_trigger">Name</label>

                    <input
                      placeholder="Enter Name"
                      className={`w-80 form-control inputfocus`}
                      onChange={(e) =>
                        handleFieldsChange(
                          e.target.value,
                          "name",
                          eachField,
                          index
                        )
                      }
                      name="name"
                      value={eachField?.name}
                      required
                    />
                  </div>
                  <div className="p-2 requiredMargin">
                    <label className="labels_add_trigger">Required</label>
                    <Switch
                      name="required"
                      onChange={(e) =>
                        handleFieldsChange(
                          e.target.checked,
                          "required",
                          eachField,
                          index
                        )
                      }
                      checked={eachField?.required}
                    />
                  </div>
                  {index !== 0 && (
                    <div className="removeMargin">
                      <img
                        src={closeIcon}
                        alt="Remove"
                        onClick={() => handleRemoveField(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>{" "}
            <div className="p-2">
              <div className="d-flex align-items-center">
                <label className="labels_add_trigger">Options</label>
                <span className="strike">*</span>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv d-flex align-items-center justify-content-end rounded-2 p-2 ms-auto"
                    onClick={() =>
                      setOptionsData([
                        ...optionsData,
                        { key: optionsData.length },
                      ])
                    }
                  >
                    <img src={addIcon} alt="img" className="me-2" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>
              </div>
              {optionsData?.map((opt, index) => (
                <div className="p-2 position-relative">
                  <input
                    placeholder="Enter Options"
                    className={`form-control inputfocus ${index !== 0 ? "optionInputCustomWidt":""}`}
                    name="options"
                    onChange={(e) => handleOptionsChange(e, index)}
                    value={opt?.value}
                    required
                  />
                  {index !== 0 && (
                    <div className="closeIcon">
                      <img
                        src={closeIcon}
                        alt="Remove"
                        onClick={() => handleRemoveOption(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-2">
              <label className="labels_add_trigger">Roles</label>
              <span className="strike">*</span>
              <select
                className={`form-select  thin-scrollbar inputfocus m-2`}
                onChange={handleChange}
                name="roles"
                value={inputFields?.roles}
                required
              >
                <option value="">Select</option>
                {roleDetails?.data?.body?.map((item) => (
                  <option>{item?.role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4">
            <div className="d-flex">
              <div
                className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                onClick={() => setOpen(false)}
              >
                <span className="reset-text">Cancel</span>
              </div>

              <button
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
                type="submit"
              >
                <span className="saveText" type="submit">
                  Save
                </span>
              </button>
            </div>
          </div>
        </form>
      </Drawer>
      <CancelModal
        show={showCancelModal}
        handleClose={handleCancelCloseModal}
        resetCancel={cancelFn}
      />
    </div>
  );
};

export default AddTrigger;
