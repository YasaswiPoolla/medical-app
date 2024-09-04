import group from "../../Assets/close.svg";

import moment from "moment";
import { CANVAS_BOTTOM_STYLE, DATE_FORMAT } from "../../Utils";

const ViewRosterManagement = (props) => {
  const viewRoasterDetails = props?.editDetails;
  const handleCancel = () => {};

  return (
    <>
      <div className="ng-container">
        <div className="">
          <div className="">
            <div className=" ">
              <div className="card-body ">
                <div className="">
                  <div className="p-2 modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between  ">
                    <span>
                      {`${viewRoasterDetails?.firstName || ""} ${
                        viewRoasterDetails?.lastName || ""
                      }`}
                      ( Details )
                    </span>
                    <span
                      className="me-0 close_button  "
                      aria-label="Close"
                      data-bs-dismiss="offcanvas"
                    >
                      <img src={group} alt="img"></img>
                    </span>
                  </div>

                  <div className="row m-2">
                    <div className="col-6 mt-2">
                      <span className="viewlabel ">Role</span>

                      <p className="viewValues">{viewRoasterDetails?.role}</p>
                    </div>
                    <div className="col-6 mt-2">
                      <span className="viewlabel ">Department</span>

                      <p className="viewValues">{viewRoasterDetails?.departmentName}</p>
                    </div>
                    <div className="col-6 mt-1">
                      <span className="viewlabel">Shift Time Slot</span>

                      <p className="viewValues">
                        {viewRoasterDetails?.shiftStartTime || ""}-
                        {viewRoasterDetails?.shiftEndTime || ""}
                      </p>
                    </div>
                    <div className="col-6 mt-1">
                      <span className="viewlabel">Shift Station</span>

                      <p className="viewValues">
                        {viewRoasterDetails?.stationName}
                      </p>
                    </div>
                    <div className="col-6 mt-1">
                      <span className="viewlabel">Shift Location</span>

                      <p className="viewValues">
                        {viewRoasterDetails?.shiftLocation}
                      </p>
                    </div>
                    <div className="col-6 mt-1">
                      <span className="viewlabel">From Date</span>

                      <p className="viewValues">
                        {moment(props?.editDetails?.startDate).format(
                          DATE_FORMAT
                        )}
                      </p>
                    </div>
                    <div className="col-6 mt-1">
                      <span className="viewlabel">To Date</span>

                      <p className="viewValues">
                        {moment(props?.editDetails?.endDate).format(
                          DATE_FORMAT
                        )}
                      </p>
                    </div>
                  </div>
                  <div
                    className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
                    style={CANVAS_BOTTOM_STYLE}
                  >
                    <div className="me-3 mb-2 position-absolute bottom-0  end-0">
                      <button
                        className="reset-button rounded-2"
                        onClick={handleCancel}
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRosterManagement;
