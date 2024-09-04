import React, { useEffect, useState } from "react";
import closeIcon from "../../Assets/close.svg";
import {
  gradesPostAction,
  gradesEditAction,
} from "../../Actions/GradeConfigAction";
import { useDispatch, useSelector } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import {
  GRADE_UPDATE_SUCCESS_MESSAGE,
  GRADE_CREATE_SUCCESS_MESSAGE,
  SUCCESS,
  ENTER_KEY,
  ADD_GRADE_TITLE,
  EDIT_GRADE_TITLE,
  GRADE_NAME_ERROR,
  CANVAS_BOTTOM_STYLE,
} from "../../Utils";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import { gradesList } from "../../Actions/AdminStaffManagementActions";
import secureLocalStorage from "react-secure-storage";

export const AddGradeconfiguration = (props) => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const gradeEditDetails = props?.gradeDetails;
  const gradeNameEditDetails = props?.gradeDetails?.gradeName;
  const gradeIdEditDetails = props?.gradeDetails?.gradeId;
  const propsGradeError = props?.gradeError;

  const initialValues = {
    grade: gradeEditDetails ? gradeNameEditDetails : "",
  };

  const [inputFields, setInputFields] = useState(initialValues);
  const [gradeId, setGradeId] = useState("");
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const propsCanvasId = props?.id;

  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };
  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleCancelShowModal = () => {
    const nonEmptyValues = Object.values(inputFields).filter(
      (value) => value !== ""
    );
    const enteredFieldsLength = nonEmptyValues.length;

    if (enteredFieldsLength > 0) {
      setShowCancelModal(true);
    }
  };
  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setInputFields((prevValues) => ({
      ...prevValues,
      grade: gradeEditDetails ? gradeNameEditDetails : "",
    }));
    setGradeId(gradeEditDetails ? gradeIdEditDetails : "");
  }, [gradeEditDetails, gradeNameEditDetails, gradeIdEditDetails]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputFields({ ...inputFields, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  let errorsMsg = {};
  const validateValues = (inputFields) => {
    if (!inputFields.grade) {
      errorsMsg.grade = GRADE_NAME_ERROR;
    }
    return errorsMsg;
  };

  const handleClickInAnotherComponent = () => {
    setIsSnackOpen(true);
  };

  const handleErrorClickInAnotherComponent = () => {
    setIsErrorSnackOpen(true);
  };
  const gradesListfn = () => {
    dispatch(gradesList()).then((response) => {
      if (response.data.status === SUCCESS) {
        handleSnackClose();
        secureLocalStorage.setItem(
          "gradesList",
          JSON.stringify(response?.data?.body)
        );
      }
    });
  };
  const handleSubmit = (event) => {
    event?.preventDefault();
    setErrors(validateValues(inputFields));

    if (Object.keys(errorsMsg).length === 0) {
      let body;
      if (!gradeEditDetails && !isLoading) {
        body = {
          gradeName: inputFields.grade,
        };
        dispatch(gradesPostAction(body)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              handleClickInAnotherComponent();
              gradesListfn();
            }
          },
          (error) => {
            handleErrorClickInAnotherComponent();
          }
        );
      } else {
        body = {
          gradeId: gradeId,
          gradeName: inputFields?.grade,
        };
        sessionStorage.setItem("refreshGrade", inputFields);
        dispatch(gradesEditAction(body, gradeId)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              handleClickInAnotherComponent();
              gradesListfn();
              const refreshinput = sessionStorage.getItem("refreshGrade");
              setInputFields(refreshinput);
            }
          },
          (error) => {
            handleErrorClickInAnotherComponent();
          }
        );
      }
    }
  };

  const resetErrors = () => {
    setErrors({});
  };

  const onCancel = () => {
    resetErrors();
    setInputFields(initialValues);
  };
  const cancelFn = () => {
    handleReload();
    setShowCancelModal(false);
  };
  const handleKeyPress = (e) => {
    if (!isLoading && e?.key === ENTER_KEY) {
      handleSubmit();
    }
  };

  const handleReload = () => {
    onCancel();
    props?.gradesList();
    document.getElementById(propsCanvasId)?.click();
  };

  return (
    <div className="backgroundDiv h-100">
      <SuccessSnack
        open={isSnackOpen}
        onClose={handleSnackClose}
        successMessage={
          gradeEditDetails
            ? GRADE_UPDATE_SUCCESS_MESSAGE
            : GRADE_CREATE_SUCCESS_MESSAGE
        }
      />
      <ErrorSnack
        open={isErrorSnackOpen}
        onClose={handleErrorSnackClose}
        errorMessage={propsGradeError}
      />
      <span data-bs-dismiss="offcanvas" id={propsCanvasId}></span>
      <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
        <span className="titleHeader">
          {gradeEditDetails ? EDIT_GRADE_TITLE : ADD_GRADE_TITLE}
        </span>
        {!inputFields.grade || inputFields.grade === initialValues.grade ? (
          <>
            <img
              src={closeIcon}
              className="close-cursor"
              alt="img"
              data-bs-dismiss="offcanvas"
              onClick={onCancel}
            />
          </>
        ) : (
          <img
            src={closeIcon}
            className="close-cursor"
            alt="img"
            onClick={handleCancelShowModal}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="w-100 m-3">
            <label className="labels">Grade</label>
            <span className="strike">*</span>
            <div className="mt-1">
              <input
                placeholder="Enter Grade"
                className={`w-100 form-control  ${
                  errors.grade ? "errorfocus" : "inputfocus"
                }`}
                onChange={handleChange}
                name="grade"
                value={inputFields?.grade}
                onKeyDown={handleKeyPress}
              />
              {errors.grade ? <p className="error">{errors.grade}</p> : null}
            </div>
          </div>
        </div>

        <div
          className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
          style={CANVAS_BOTTOM_STYLE}
        >
          <div
            className="reset-button align-items-center d-flex  justify-content-center rounded-2"
            onClick={onCancel}
          >
            <span className="reset-text">Reset</span>
          </div>
          <div className="d-flex">
            <div className="reset-button align-items-center d-flex px-3 justify-content-center rounded-2">
              {!inputFields.grade ||
              inputFields.grade === initialValues.grade ? (
                <>
                  <span className="reset-text" data-bs-dismiss="offcanvas" onClick={onCancel}>
                    Cancel
                  </span>
                </>
              ) : (
                <span className="reset-text" onClick={handleCancelShowModal}>
                  Cancel
                </span>
              )}
            </div>

            <button
              className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
              type="submit"
            >
              <span className="saveText" type="submit">
                Submit
              </span>
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
  );
};

export default AddGradeconfiguration;
