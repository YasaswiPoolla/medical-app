import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import close from "../Assets/close.svg";
import { CANCEL_NO_BUTTON_STYLE, CANCEL_YES_BUTTON_STYLE } from "../Utils";

const CancelModal = ({ show, handleClose, resetCancel }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <div className="d-flex justify-content-between w-100">
          <span className="alert_text"> Alert</span>
          <span>
            <img
              src={close}
              className="close-cursor"
              alt="img"
              onClick={handleClose}
            ></img>
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <span className="alerttextInModal">
          By Canceling all the entered data will be lost, do you want to go
          ahead?
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={CANCEL_YES_BUTTON_STYLE}
          className="reset-button"
          onClick={resetCancel}
        >
          Yes
        </Button>
        <Button
          style={CANCEL_NO_BUTTON_STYLE}
          className="save-button"
          onClick={handleClose}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;
