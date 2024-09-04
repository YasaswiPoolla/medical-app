import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import {
  ADD_PRIORITY_TITLE,
  CANVAS_BOTTOM_STYLE,
  countNonEmptyValues,
  EDIT_PRIORITY_TITLE,
  floorRegex,
  isNonNull,
  isSearchRegex,
  matchesValues,
  PRIORITY_CREATE_SUCCESS_MESSAGE,
  PRIORITY_NAME_ERROR,
  PRIORITY_RANK_ERROR,
  PRIORITY_UPDATE_SUCCESS_MESSAGE,
  SUCCESS,
  validateFields,
  wholeNumberRegex,
} from "../../Utils";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import { useDispatch } from "react-redux";
import { priorityEditAction, priorityPostAction } from "../../Actions/PriorityConfigAction";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
export const AddEditPriority = (props) => {
  const propsComponentId = props?.id;
  const priorityEditDetails = props?.editDetails;

  const editFunction = props?.onEditPriority;
  const initialValues = {
    priorityName: priorityEditDetails?priorityEditDetails?.priorityName:"",
    priorityRank: priorityEditDetails?priorityEditDetails?.priorityRank:"",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFormValues(
      (prevValues) => ({
          ...prevValues,
          priorityName: priorityEditDetails ? priorityEditDetails?.priorityName : "",
          priorityRank: priorityEditDetails ? priorityEditDetails?.priorityRank : ""
    }));
    
  }, [priorityEditDetails]);

  const handleChange = (regex) => (e) => {
    const { name, value } = e.target;

    if (isSearchRegex(value, regex)) {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

/**
 * Validates the provided values for priorityName and priorityRank.
 *
 * @function
 * @param {Object} values - The object containing values to be validated.
 * @param {string} values.priorityName - The name of the priority.
 * @param {number} values.priorityRank - The value or rank of the priority.
 * @returns {Object} errors - An object containing error messages for invalid fields.
 */
  const errorsMapping = {
    priorityName: PRIORITY_NAME_ERROR,
    priorityRank: PRIORITY_RANK_ERROR,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors =  validateFields(formValues,errorsMapping);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      let body;
      if (!priorityEditDetails) {
        body = {
          priorityName: formValues?.priorityName,
          priorityRank: Number(formValues?.priorityRank),
        };
        dispatch(priorityPostAction(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            setIsSnackOpen(true);
            setSuccessMsg(PRIORITY_CREATE_SUCCESS_MESSAGE);
            props?.handlePriorityListUpdate();
          }
        });
      } else {
        body = {
          priorityName: formValues?.priorityName,
          priorityRank: Number(formValues?.priorityRank),
          priorityId: priorityEditDetails?.priorityId,
        };
        dispatch(priorityEditAction(body)).then((response) => {
          if (response?.data?.status === SUCCESS) {
            setIsSnackOpen(true);
            setSuccessMsg(PRIORITY_UPDATE_SUCCESS_MESSAGE);
            props?.handlePriorityListUpdate();
          }
        });
      }
    };
}
  
  const resetFn = () => {
    setFormValues(initialValues);
    setFormErrors({});
  };

  const handleCancelShowModal = () => {
    const enteredFieldsLength = countNonEmptyValues(formValues);
    if (enteredFieldsLength > 0) {
      setShowCancelModal(true);
    } else {
      cancelFn();
    }
  };

  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
  };

  const cancelFn = () => {
    document.getElementById(propsComponentId)?.click();
    resetFn();
    handleCancelCloseModal();
    editFunction(null)
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    resetFn();
    document.getElementById(propsComponentId)?.click();
  };
  
  const cancelCdnFn = (formValues, editDetails) => {
    if (isNonNull(formValues) && isNonNull(editDetails)) {
      const keysToCompare = [
        "priorityName",
        "priorityRank"
      ];
      return matchesValues(formValues, editDetails, keysToCompare);
    }
    return false;
  };

  const cancelCdn = cancelCdnFn(formValues, priorityEditDetails);
  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={successMsg}
        />
        <span data-bs-dismiss="offcanvas" id={propsComponentId}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {priorityEditDetails ? EDIT_PRIORITY_TITLE : ADD_PRIORITY_TITLE}
          </span>
          <span
            className="me-0 mt-1 close_button"
            aria-label="Close"
            {...(cancelCdn
              ? { "data-bs-dismiss": "offcanvas" }
              : { onClick: handleCancelShowModal })}
          >
            <img src={closeIcon} alt="img" />
          </span>
        </div>
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Priority Name</label>
              <span className="strike">*</span>
              <div className="mt-1">
                <input
                  type="text"
                  name="priorityName"
                  placeholder="Enter Priority Name"
                  value={formValues.priorityName}
                  className={`w-100 form-control ${
                    formErrors.priorityName ? "errorfocus" : "inputfocus"
                  }`}
                  onChange={handleChange(floorRegex)}
                />
                {formErrors.priorityName && (
                  <p className="error">{formErrors.priorityName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Priority Level</label>
              <span className="strike">*</span>
              <div className="mt-1">
                <input
                  type="text"
                  name="priorityRank"
                  placeholder="Enter Priority Level"
                  value={formValues.priorityRank}
                  className={`w-100 form-control ${
                    formErrors.priorityRank ? "errorfocus" : "inputfocus"
                  }`}
                  onChange={handleChange(wholeNumberRegex)}
                />
                {formErrors.priorityRank && (
                  <p className="error">{formErrors.priorityRank}</p>
                )}
              </div>
            </div>
          </div>
          <div
            className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
            style={CANVAS_BOTTOM_STYLE}
          >
            <div
              className="reset-button align-items-center d-flex justify-content-center rounded-2"
              onClick={resetFn}
            >
              <span className="reset-text">Reset</span>
            </div>
            <div className="d-flex">
              <div
                className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2"
                {...(cancelCdn
                  ? { "data-bs-dismiss": "offcanvas" }
                  : { onClick: handleCancelShowModal })}
              >
                <span className="reset-text">Cancel</span>
              </div>
              <button
                type="submit"
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
              >
                <span className="saveText">Submit</span>
              </button>
            </div>
          </div>
        </form>
        <CancelModal
          show={showCancelModal}
          handleClose={handleCancelCloseModal}
          resetCancel={cancelFn}
        />
      </div>
    </>
  );
};
