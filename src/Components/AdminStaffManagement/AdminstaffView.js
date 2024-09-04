import React from "react";
import closeIcon from "../../Assets/close.svg";
import {
  CANVAS_BOTTOM_STYLE,
  FULL_NAME_LENGTH,
  ZERO,
  defaultValue,
  formatViewTitle,
  userName,
} from "../../Utils";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Tooltip } from "react-bootstrap";

export const AdminstaffView = (props) => {
  const fullName =
    userName(props?.viewDetails?.firstName,props?.viewDetails?.lastName)
  return (
    <div className="">
      <div className="modalHeader p-3 border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between">
        <span className="titleHeader view-overflow ">
          {fullName?.length > FULL_NAME_LENGTH ? (
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>{fullName}</Tooltip>}
            >
              <span>
                {`${fullName.substring(ZERO, FULL_NAME_LENGTH)}...(Details)`}
              </span>
            </OverlayTrigger>
          ) : (
            <>{formatViewTitle(fullName)}</>
          )}
        </span>
        <img
          src={closeIcon}
          className="close-cursor"
          alt="img"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="p-3">
        <div className="ng-container row">
          <div className="col-6">
            <span className="viewlabel">Employee ID</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.empId)}
            </p>
          </div>
          <div className="col-6">
            <span className="viewlabel">First Name</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.firstName)}
            </p>
          </div>
        </div>

        <div className="ng-container row">
          <div className="col-6">
            <span className="viewlabel">Last Name</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.lastName)}
            </p>
          </div>

          <div className="col-6">
            <span className="viewlabel">Mobile Number</span>
            <p className="viewValues">
              {defaultValue(props?.viewDetails?.phoneNo)}
            </p>
          </div>
        </div>

        <div className="ng-container row">
          <div className="col-6">
            <span className="viewlabel">Email ID</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.emailId)}
            </p>
          </div>

          <div className="col-6">
            <span className="viewlabel">Role</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.role)}
            </p>
          </div>
        </div>

        <div className="ng-container row">
          <div className="col-6">
            <span className="viewlabel">Grade</span>
            <p className="viewValues">
              {defaultValue(props?.viewDetails?.gradeName)}
            </p>
          </div>
          <div className="col-6">
            <span className="viewlabel">Department</span>
            <p className="viewValues view-overflow">
              {defaultValue(props?.viewDetails?.departmentName)}
            </p>
          </div>
        </div>
      </div>

      <div
        className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-3"
        style={CANVAS_BOTTOM_STYLE}
      >
        <div className="me-4 mb-2 position-absolute bottom-0  end-0">
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

export default AdminstaffView;
