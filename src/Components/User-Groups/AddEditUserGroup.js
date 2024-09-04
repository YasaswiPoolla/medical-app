import React, { useState, useEffect } from "react";
import closeIcon from "../../Assets/close.svg";
import { useSelector, useDispatch } from "react-redux";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import CustomSelect from "../../ReUsable-Components/Multi-Select";
import {
  USER_GROUP_CREATE_SUCCESS_MESSAGE,
  USER_GROUP_UPDATE_SUCCESS_MESSAGE,
  validateFields,
  CANVAS_BOTTOM_STYLE,
  ENTER_KEY,
  SIDE_MENU_TYPE_ADD,
  SIDE_MENU_TYPE_VIEW,
  USER_GROUP_ERROR,
  USER_GROUP_MODULE_ERROR,
  ROLE_NAME_ERROR,MAX_LENGTH_USER_GROUP,alphaPatternRegex,SUCCESS,
  SIDE_MENU_TYPE_EDIT
} from "../../Utils";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import CancelModal from "../../ReUsable-Components/Cancel-Modal";
import { postUserGroup, editUserGroup } from "../../Actions/UserGroupActions"

const errorsMapping = {
  userGroupName: USER_GROUP_ERROR,
  modules: USER_GROUP_MODULE_ERROR,
  roles: ROLE_NAME_ERROR,
};


const AddEditUserGroup = (internalProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [customSelectModules, setCustomSelectModules] = useState([]);
  const [customSelectRoles, setCustomSelectRoles] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const propsCanvasId = internalProps?.id;
  const roleOptionsData = internalProps?.roleOptionsData;
  const menuOptionsData = internalProps?.menuOptionsData;
  const fetchUserGroupsFunc = internalProps?.fetchUserGroupsFunc;
  const selectedUserGroup = internalProps?.selectedUserGroup;
  const setSelectedUserGroup = internalProps?.setSelectedUserGroup;
  const sideMenuType = internalProps?.sideMenuType;
  const [disableValue, setDisableValue] = useState(false);
  
  const [errors, setErrors] = useState({});

  const initialValues = {
    userGroupName: internalProps?.editDetails?.role || "",
    modules: internalProps?.editDetails?.modules || [],
    roles: internalProps?.editDetails?.roles || [],
  };
  const [inputFields, setInputFields] = useState(initialValues);

  useEffect(() => {
    setDisableValue(sideMenuType === SIDE_MENU_TYPE_VIEW);
  }, [sideMenuType]);

  useEffect(() => {
    if(selectedUserGroup){
      let tempObj = {
        userGroupName : selectedUserGroup?.groupName,
        modules : [],
        roles : []
      }
      selectedUserGroup?.roles?.forEach((role) => {
        let tempRole = roleOptionsData?.find((item) => item?.value === role?.name);
        tempObj.roles.push(tempRole?.id)
      });

      selectedUserGroup?.modules?.forEach((menu) => {
        let tempMenu = menuOptionsData?.find((item) => item?.value === menu?.name);
        tempObj.modules.push(tempMenu?.id);
      });
      setInputFields(tempObj);
      setCustomSelectModules(tempObj?.modules);
      setCustomSelectRoles(tempObj?.roles);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserGroup]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if(alphaPatternRegex.test(value)){
      setIsChanged(true)
      setInputFields((prevInputFields) => {
        const updatedInputFields = {
          ...prevInputFields,
          [name]: value,
        };
        return updatedInputFields;
      });
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    let validationErrors = validateFields(inputFields,errorsMapping)
    await setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0){
      let payload = {
        userGroupName : inputFields?.userGroupName,
        roleIds : inputFields?.roles,
        menuIds : inputFields?.modules
      }
      if(sideMenuType === SIDE_MENU_TYPE_ADD){
        dispatch(postUserGroup(payload)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              setIsSnackOpen(true);
              fetchUserGroupsFunc()
            }
          }
        );
      }else if(sideMenuType === SIDE_MENU_TYPE_EDIT){
        payload["userGroupId"] = selectedUserGroup?.userGroupId;
        dispatch(editUserGroup(selectedUserGroup?.userGroupId,payload)).then(
          (response) => {
            if (response?.data?.status === SUCCESS) {
              setIsSnackOpen(true);
              fetchUserGroupsFunc()
            }
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
    setIsChanged(false);
    setSelectedUserGroup({});
  };

  const onReset = () => {
   if(sideMenuType === SIDE_MENU_TYPE_ADD){
    resetErrors();
    setInputFields({
      userGroupName: "",
      modules: [],
      roles: [],
    });
    setCustomSelectModules([]);
    setCustomSelectRoles([]);
    setSelectedUserGroup({})
   }
  };


  const handleSnackClose = () => {
    setIsSnackOpen(false);
    handleReload();
  };

  const handleReload = () => {
    document.getElementById(propsCanvasId)?.click();
    onReset();
    setIsChanged(false);
  };

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const handleCancelShowModal = () => {
    const nonEmptyValues = Object.values(inputFields).filter(
      (value) => (value?.length > 0)
    );
    const enteredFieldsLength = nonEmptyValues.length;

    if (enteredFieldsLength > 0 && sideMenuType !== SIDE_MENU_TYPE_VIEW && isChanged) {
      setShowCancelModal(true);
    }else{
      handleReload()
      onCancel()
    }
  };
  const handleCancelCloseModal = () => {
    setShowCancelModal(false);
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


  const handleSelectedValues = (values, name) => {
    setIsChanged(true)
    setInputFields((prevInputFields) => {
      const updatedInputFields = {
        ...prevInputFields,
        [name]: values,
      };
      return updatedInputFields;
    });
  };

  return (
    <>
      <div className="backgroundDiv h-100">
        <SuccessSnack
          open={isSnackOpen}
          onClose={handleSnackClose}
          successMessage={
            selectedUserGroup?.userGroupId
              ? USER_GROUP_UPDATE_SUCCESS_MESSAGE
              : USER_GROUP_CREATE_SUCCESS_MESSAGE
          }
        />
        <ErrorSnack
          open={isErrorSnackOpen}
          onClose={handleErrorSnackClose}
          errorMessage={internalProps?.AddEditError}
        />
        <span data-bs-dismiss="offcanvas" id={propsCanvasId}></span>
        <div className="modalHeader border border-end-0 border-top-0 border-bottom-1 border-start-0 align-items-center d-flex justify-content-between p-3">
          <span className="titleHeader">
            {sideMenuType} User Group Configuration
          </span>
          <img
              src={closeIcon}
              className="close-cursor"
              onClick={handleCancelShowModal}
              alt="img"
            />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">User Group Name</label>
              <span className="strike">*</span>
              <div className="mt-1">
                <input
                  placeholder="Enter User Group"
                  className={`w-100 form-control  ${
                    errors.userGroupName ? "errorfocus" : "inputfocus"
                  }`}
                  onChange={handleChange}
                  name="userGroupName"
                  value={inputFields?.userGroupName}
                  disabled={disableValue}
                  onKeyDown={handleKeyPress}
                  maxLength={MAX_LENGTH_USER_GROUP}
                />
                {errors.userGroupName ? (
                  <p className="error">{errors.userGroupName}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Modules</label>
              {sideMenuType === SIDE_MENU_TYPE_ADD && <span className="strike">*</span>}
              <div className="mt-1">
                <CustomSelect
                  inputName="Modules"
                  options={menuOptionsData}
                  disabled={disableValue}
                  defaultValue={inputFields?.modules || []}
                  onChange={(values) => handleSelectedValues(values, "modules")}
                  customSelectedValues={customSelectModules}
                  setCustomSelectedValues={setCustomSelectModules}
                  className={`${
                    errors.modules ? "custom-select-error" : ""
                  }`}
                />
                {errors.modules ? (
                  <p className="error">{errors.modules}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div className="w-100 m-3">
              <label className="labels">Roles</label>
              <span className="strike">*</span>
              <div className="mt-1">
                <CustomSelect
                  inputName="Roles"
                  options={roleOptionsData}
                  disabled={disableValue}
                  defaultValue={inputFields?.roles || []}
                  onChange={(values) => handleSelectedValues(values, "roles")}
                  customSelectedValues={customSelectRoles}
                  setCustomSelectedValues={setCustomSelectRoles}
                  className={`${
                    errors.roles ? "custom-select-error" : ""
                  }`}
                />
                {errors?.roles ? <p className="error">{errors.roles}</p> : null}
              </div>
            </div>
          </div>

          <div
            className="modalHeader w-100 border border-end-0 border-top-1 border-bottom-0 border-start-0 align-items-center d-flex justify-content-between p-4"
            style={CANVAS_BOTTOM_STYLE}
          >
            <div
              className="reset-button align-items-center d-flex  justify-content-center rounded-2"
              onClick={onReset}
            >
              <span className="reset-text">Reset</span>
            </div>
            <div className="d-flex">
              <div className="reset-button align-items-center  px-3 d-flex  justify-content-center rounded-2 close-cursor" onClick={handleCancelShowModal}>
              <span className="reset-text">
                    Cancel
                  </span>
              </div>
              <button
                className="save-button align-items-center ms-3 d-flex border justify-content-center rounded-2"
                type="submit"
                disabled={disableValue}
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

export default AddEditUserGroup;
