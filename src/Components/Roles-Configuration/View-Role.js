import React from "react";
import closeIcon from "../../Assets/close.svg";
import { CANVAS_BOTTOM_STYLE } from "../../Utils";

export const ViewRole = (props) => {
  const viewDetails = props?.editDetails;
  return (
    <div className="">
      <div className="modalHeader p-3 border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between">
        <span className="titleHeader view-overflow ">{viewDetails?.role}</span>
        <img
          src={closeIcon}
          className="close-cursor"
          alt="img"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="p-3">
        <div className="row">
          <div className="col-6">
            <span className="viewlabel">Role</span>
            <p className="viewValues view-overflow">{viewDetails?.role}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <span className="viewlabel">Department</span>
            <p className="viewValues">{viewDetails?.departmentName}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <span className="viewlabel">Grade</span>
            <p className="viewValues view-overflow">{viewDetails?.gradeName}</p>
          </div>
        </div>
      </div>
      <div
        className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-3"
        style={CANVAS_BOTTOM_STYLE}
      >
        <div className="me-1 mb-2 p-0 position-absolute bottom-0  end-0">
          <button
            className="reset-button rounded-2"
            data-bs-dismiss="offcanvas"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
