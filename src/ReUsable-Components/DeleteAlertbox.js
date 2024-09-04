import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Closeicon from "../Assets/close.svg";
import { CANCEL_NO_BUTTON_STYLE, CANCEL_YES_BUTTON_STYLE } from "../Utils";

export const DeleteAlertbox = ({ showModal, handleClose, handleYes }) => {
  return (
    <div>
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
        <Modal.Body>Are you sure you want to Delete?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={CANCEL_YES_BUTTON_STYLE}
            className="reset-button"
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={handleYes}
            style={CANCEL_NO_BUTTON_STYLE}
            className="save-button"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAlertbox;
