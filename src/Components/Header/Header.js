import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { connect } from "react-redux";
import usericon from "./usericon.svg";
import { useNavigate} from 'react-router-dom';
import { Dropdown, Tooltip } from "react-bootstrap";
import "./Header.css";
import loginImage from "../../Assets/unifyLogo.svg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Closeicon from "./Closeicon.svg";
import {
  HEADER_STYLE,
  MAX_USER_NAME_LENGTH,
  ZERO,
  dropdownfont,
  userName,
} from "../../Utils";
import { LOGOUT_NO_BUTTON_STYLE, LOGOUT_YES_BUTTON_STYLE } from "../../Utils";
import signouticon from "../../Assets/signout.svg";
import pathicon from "../../Assets/path.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export const Header = (props) => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(secureLocalStorage.getItem("reactlocal"));
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGridClick = () => {
    setShowDropdown(!showDropdown);
  };

  let userRoleId = userDetails?.data?.body?.role;

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  const handleLogout = () => {
    setShowModal(false);
    sessionStorage.clear();
    localStorage.clear();
    navigate("/",{replace : true})
    window.location.reload();
  };
  const toolTip = (
    <Tooltip id="tooltip">
      {userName(
        userDetails?.data?.body?.firstName,
        userDetails?.data?.body?.lastName
      )}
    </Tooltip>
  );
  return (
    <>
      <Box p={1} sx={HEADER_STYLE}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item className="d-flex ms-2">
            <img alt="img" src={loginImage} className="logo-image p-0 m-0" />
            <p className="heading m-1">
              <span>UnifyCare</span>
            </p>
          </Grid>
          <Grid item onClick={handleGridClick}>
            <div className="d-flex m-2">
              <div className="userbox d-flex justify-content-center align-items-center p-1">
                <img alt="" src={usericon} className="w-100 h-50 m-2" />
              </div>
              <div className="ps-2 close-cursor">
                <div className="user-font">
                  <OverlayTrigger placement="bottom" overlay={toolTip}>
                    <span bsStyle="default">
                      {userName(
                        userDetails?.data?.body?.firstName,
                        userDetails?.data?.body?.lastName
                      ).length > MAX_USER_NAME_LENGTH ? (
                        <div
                          className="user"
                          title={userName(
                            userDetails?.data?.body?.firstName,
                            userDetails?.data?.body?.lastName
                          )}
                        >
                          {`${userName(
                            userDetails?.data?.body?.firstName,
                            userDetails?.data?.body?.lastName
                          ).substring(ZERO, MAX_USER_NAME_LENGTH)}...`}
                        </div>
                      ) : (
                        <>
                          {userName(
                            userDetails?.data?.body?.firstName,
                            userDetails?.data?.body?.lastName
                          )}
                        </>
                      )}
                    </span>
                  </OverlayTrigger>
                </div>
                <div className="row userrole">
                  <span>{userRoleId}</span>
                </div>
              </div>
              <div className="d-flex justify-content-start ps-1">
                <Dropdown show={showDropdown} onToggle={setShowDropdown}>
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    className="custom-toggle"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    className="custom-input-style"
                    style={dropdownfont}
                  >
                    <Dropdown.Item
                      onClick={handleShow}
                      className="d-flex justify-content-start align-items-center logout-button"
                    >
                      <img src={signouticon} alt="img" className="me-2" />
                      <img src={pathicon} alt="img" className="me-2" />
                      <span>Sign Out</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100">
            <span className="alert_text"> Alert</span>
            <span>
              <img
                src={Closeicon}
                className="close-cursor"
                alt="img"
                onClick={handleClose}
              ></img>
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={LOGOUT_NO_BUTTON_STYLE}
            className="reset-button"
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={handleLogout}
            style={LOGOUT_YES_BUTTON_STYLE}
            className="save-button"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    state: store.loginReducer,
  };
};

export default connect(mapStateToProps)(Header);
