import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddTrigger from "./AddTrigger";
import TextTruncateWithPopover from "./TextTruncateWithPopover";

export default function ElkNode({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [clickedOptionData, setClickedOptionData] = useState({});
  const [editDetails, setEditDetails] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (!open) {
      setEditDetails({});
    }
  }, [open]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (data) => {
    setOpen(true);
    setClickedOptionData(data);
  };

  const handleEdit = async (data) => {
    await setEditDetails(data);
    setAnchorEl(null);
    setOpen(true);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  let topBoxStyle = {
    position: "absolute",
    top: `-${140 + data?.fieldsData?.length * 12}px`,
    left: "0",
    width: "102%",
    marginLeft: "-2px",
    height: `${140 + data?.fieldsData?.length * 12}px`,
    background: "white",
    border: "2px solid #ccc",
    boxSizing: "border-box",
    borderRadius: "6px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderBottom: "2px dotted #ccc",
  };

  return (
    <>
      <div className="node-container">
        <div style={topBoxStyle}>
          <div className="header-box">
            <p className="p-2">
              <TextTruncateWithPopover text={data?.label || ""} numChars={12} />
            </p>
            <IconButton
              aria-describedby={id}
              className="more-icon"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
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
              <p className="p-1 m-0" onClick={() => handleEdit(data)}>
                Edit
              </p>
            </Typography>
          </Popover>
          <p className="p-2 font-size-small">
            <TextTruncateWithPopover
              text={data?.description || ""}
              numChars={30}
            />
          </p>
          <>
            {data?.fieldsData?.[0]?.name ? (
              <p className="font-size-small mx-2 my-1">Fields</p>
            ) : null}
            {data?.fieldsData.map((ele) => (
              <div className="row font-size-small mx-2">
                <div className="col px-2 m-0">
                  <p className="m-0">{ele?.fieldType}</p>
                </div>
                <div className="col px-2 m-0">
                  <p className="m-0">
                    <TextTruncateWithPopover
                      text={ele?.fieldValue || ""}
                      numChars={7}
                    />
                  </p>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="handles targets">
          {data?.targetHandles?.map((handle) => (
            <Handle
              key={handle.id}
              id={handle.id}
              type="target"
              position={Position.Left}
              className="target"
            />
          ))}
        </div>
        <div style={{ padding: 16 * data?.sourceHandles?.length + "px" }}></div>
        <div className="handles sources">
          {data.sourceHandles.map((handle) => (
            <div className="d-flex" key={handle.id}>
              <div className="option-main">
                <p
                  className="option-text"
                  onClick={() => handleOptionClick(handle)}
                >
                  <TextTruncateWithPopover
                    text={handle?.value || ""}
                    numChars={7}
                  />
                </p>
              </div>

              <Handle
                id={handle.id}
                type="source"
                position={Position.Right}
                className="source"
              />
            </div>
          ))}
        </div>
      </div>
      <AddTrigger
        id="addTriggerId"
        open={open}
        setOpen={setOpen}
        editDetails={editDetails}
        clickedOptionData={clickedOptionData}
      />
    </>
  );
}
