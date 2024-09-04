import React, { useEffect } from "react";
import "./BootstrapSidebar.css";
import barsimage from "./bars.svg";
import { useNavigate } from "react-router-dom";
import sideBarIcon1 from "./Sidenavimg1.svg";
import sideBarIcon2 from "./Sidenavimg2.svg";
import branchIcon from "./Sidenavimg3.svg";
import sideBarIcon4 from "./Sidenavimg4.svg";
import { defaultPage } from "../../Reducer/PaginationReducer";
import { useDispatch } from "react-redux";
import paths from '../../router/paths'

export const BootstrapSidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    defaultPage(dispatch);
  }, [dispatch]);

  return (
    <div className="sidebar">
      <ul className="nav-list m-0 p-0">
        <li className="d-flex justify-content-center align-items-center barli">
          <img src={barsimage} alt="" className="imagestyles" />
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.adminStaffList);
            }
          }}
        >
          <img src={sideBarIcon1} alt="" className="imagestyles" />
          <span className="tooltip">Hospital Staff</span>
        </li>
        <li
          className=" d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.rosterConfiguration);
            }
          }}
        >
          <img src={sideBarIcon2} alt="" className="imagestyles" />
          <span className="tooltip">Roster Configuration</span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.rosterManagementLists);
            }
          }}
        >
          <img src={branchIcon} alt="" className="imagestyles" />
          <span className="tooltip">Roster Management</span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.departmentConfigurationLists);
            }
          }}
        >
          <img src={sideBarIcon4} alt="" className="imagestyles" />
          <span className="tooltip">Department Configuration</span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.rolesConfigurationList);
            }
          }}
        >
          <img src={sideBarIcon2} alt="" className="imagestyles" />
          <span
            className="tooltip"
            onClick={() => {
              defaultPage(dispatch);
            }}
          >
            Roles - Department Configuration
          </span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.userGroupList);
            }
          }}
        >
          <img src={sideBarIcon2} alt="" className="imagestyles" />
          <span
            className="tooltip"
            onClick={() => {
              defaultPage(dispatch);
            }}
          >
            User Group Configuration
          </span>
        </li>
        
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.gradesConfigurationList);
            }
          }}
        >
          <img src={branchIcon} alt="" className="imagestyles" />
          <span className="tooltip">Employee Grade Configuration</span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.priorityList);
            }
          }}
        >
          <img src={branchIcon} alt="" className="imagestyles" />
          <span className="tooltip">Priority Configuration</span>
        </li>
        <li
          className="d-flex justify-content-center align-items-center"
          onClick={(e) => {
            if (!e.target.classList.contains("tooltip")) {
              defaultPage(dispatch);
              handleNavigation(paths.processFlow);
            }
          }}
        >
          <img src={branchIcon} alt="" className="imagestyles" />
          <span className="tooltip">Process Flows</span>
        </li>
        
      </ul>
    </div>
  );
};

export default BootstrapSidebar;
