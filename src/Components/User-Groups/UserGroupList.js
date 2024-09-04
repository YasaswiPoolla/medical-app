import React, { useState, useEffect } from "react";
import addIcon from "../../Assets/add.svg";
import searchIcon from "../../Assets/search.svg";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import BootstrapSidebar from "../Sidebar/BootstrapSidebar";
import AddEditUserGroup from "./AddEditUserGroup";
import SuccessSnack from "../../ReUsable-Components/Success-Snack";
import ErrorSnack from "../../ReUsable-Components/Error-Snack";
import editIcon from "../../Assets/edit.svg";
import ReusableModal from "../../ReUsable-Components/Off-Canvas";
import deleteImg from "../../Assets/delete.svg";
import { Tag } from "antd";
import {
  SEARCH_FOCUS_STYLE_VALUE,
  SEARCH_NOFOCUS_STYLE_VALUE,
  STYLE,
  ENTER_KEY,
  MIN_SEARCH_LENGTH,
  ZERO,
  USER_GROUP_CANVAS_ID,
  USER_GROUP_MODAL_ID,
  toolTipFont,
  USER_GROUP_DELETE_SUCCESS_MESSAGE,
  modalWidth,
  SEARCH_FIELD_ID,
  NO_RECORDS,
  SIDE_MENU_TYPE_ADD,
  SIDE_MENU_TYPE_EDIT,
  SIDE_MENU_TYPE_VIEW,
  ROLE_SIZE_WITH_OUT_FILTER,DELETE_SUCCESS_STATUS,MAX_LENGTH_USER_GROUP
} from "../../Utils";
import Pagination from "../Pagination";
import DeleteModal from "../../ReUsable-Components/DeleteAlertbox";
import backgroundImage from "../../Assets/floor_bg_2.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useSelector, useDispatch } from "react-redux";
import { rolesFetchAction } from "../../Actions/RoleConfigurationAction";
import { fetchUserGroups, fetchApplicationMenus, deleteUserGroup } from "../../Actions/UserGroupActions";

const UserGroupList = (props) => {
  const dispatch = useDispatch();
  const { roleDetails } = useSelector((state) => state.roleReducer);
  const { userGroups,applicationMenuList } = useSelector((state) => state.UserGroupReducer);
  const { currentPage,totalPages, itemsPerPage} = useSelector((state) => state.PaginationReducer);
  const [userGroupList, setUserGroupList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleOptionsData, setRolesOptionsData] = useState([]);
  const [menuOptionsData, setMenuOptionsData] = useState([]);
  const [sideMenuType, setSideMenuType] = useState("");
  const [selectedUserGroup, setSelectedUserGroup] = useState({});
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const fetchUserGroupsFunc = () => {
    dispatch(fetchUserGroups(currentPage,itemsPerPage,searchTerm));
  }

  useEffect(() => {
    dispatch(rolesFetchAction(0,ROLE_SIZE_WITH_OUT_FILTER));
    fetchUserGroupsFunc()
    dispatch(fetchApplicationMenus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserGroupsFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage,totalPages,itemsPerPage,dispatch]);

  useEffect(() => {
    if (roleDetails?.data?.body?.length > 0) {
      let tempRoles = roleDetails?.data?.body?.map((item) => {
        return { label: item?.role, value: item?.role, id: item?.roleId };
      });
      setRolesOptionsData(tempRoles);
    }
  }, [roleDetails]);

  useEffect(() => {
    if (applicationMenuList?.body?.length > 0) {
      let tempMenus = applicationMenuList?.body?.map((item) => {
        return { label: item?.menuName, value: item?.menuName, id: item?.menuId };
      });
      setMenuOptionsData(tempMenus);
    } 
  }, [applicationMenuList]);

  useEffect(() => {
    if (userGroups?.body?.length > 0) {
      let tempArray = []
      userGroups?.body?.forEach((element) => {
        let tempObj = {userGroupId : element?.userGroupId || null};
        tempObj["groupName"] = element?.userGroupName;
        let tempRoles = [];
        let tempMenus = [];
        element?.roles?.forEach((role) => {
          let tempRole = {
            name: role?.role
          }
          tempRoles.push(tempRole)
        });
        element?.menus?.forEach((menu) => {
          let tempMenu = {
            name: menu?.menuName
          }
          tempMenus.push(tempMenu)
        });
        tempObj["roles"] = tempRoles
        tempObj["modules"] = tempMenus
        tempArray.push(tempObj)

      });
      setUserGroupList(tempArray);
    }else{
      setUserGroupList([])
    }
  }, [userGroups]); 

  useEffect(() => {
    if (searchTerm.length === ZERO) {
      fetchUserGroupsFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleYes = () => {
    dispatch(deleteUserGroup(selectedUserGroup?.userGroupId)).then(response => {
      if(response?.status === DELETE_SUCCESS_STATUS){
        setIsSnackOpen(true);
        fetchUserGroupsFunc()
      }
    })
    handleClose();
  };

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);

  const handleErrorSnackClose = () => {
    setIsErrorSnackOpen(false);
  };

  const AddEditError = props?.errorMessage;

  const handleSearchFocus = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_FOCUS_STYLE_VALUE);
  };

  const handleSearchBlur = () => {
    let searchId = document.getElementById(SEARCH_FIELD_ID);
    searchId.setAttribute(STYLE, SEARCH_NOFOCUS_STYLE_VALUE);
  };

  const handleSearch = () => {
    if (searchTerm.length > MIN_SEARCH_LENGTH || searchTerm.length === ZERO) {
      fetchUserGroupsFunc();
    }
  };

  const deletefn = (data) => {
    setSelectedUserGroup(data)
    setShowModal(true)
  };

  const handleClick = (type,item) => {
    setSideMenuType(type);
    setSelectedUserGroup(item);
  };

  return (
    <>
      <div className="d-flex">
        <div>
          <BootstrapSidebar />
        </div>
        <div className="tableBackground ms-5">
          <div className="ms-2 ">
            <Header />
          </div>
          <div className="">
            <SuccessSnack
              open={isSnackOpen}
              onClose={handleSnackClose}
              successMessage={USER_GROUP_DELETE_SUCCESS_MESSAGE}
            />
            <ErrorSnack
              open={isErrorSnackOpen}
              onClose={handleErrorSnackClose}
              errorMessage={AddEditError}
            />

            <div className="headerOne border d-flex justify-content-between align-items-center p-4">
              <span className="titleHeader">User Group Configuration</span>
              <div className="d-flex align-items-center">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Add</Tooltip>}
                >
                  <div
                    className="addDiv p-2 d-flex align-items-center rounded-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target={`#${USER_GROUP_MODAL_ID}`}
                    aria-controls="offcanvasRight"
                    onClick={() => setSideMenuType(SIDE_MENU_TYPE_ADD)}
                  >
                    <img src={addIcon} alt="img" className="me-2" />
                    <span>Add</span>
                  </div>
                </OverlayTrigger>

                <div
                  className="ms-3 search align-items-center d-flex justify-content-center"
                  id={SEARCH_FIELD_ID}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                >
                  <img src={searchIcon} className="ms-2" alt="img" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="search_input w-100 ms-2"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === ENTER_KEY) {
                        handleSearch();
                      }
                    }}
                    maxLength={MAX_LENGTH_USER_GROUP}
                  />
                </div>
              </div>
            </div>
            <div className="table_backgroud ms-4">
              <div className="d-flex">
                <div className="scroll-container">
                  <table className="container-fluid mt-2 table">
                    <thead className="table_head border border-top border-end-0  border-start-0">
                      <tr>
                        <th className="labels">
                          <div className="table-row  border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">User Group</span>
                          </div>
                        </th>
                        <th className="labels">
                          <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">Module Name</span>
                          </div>
                        </th>
                        <th className="labels">
                          <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">Role</span>
                          </div>
                        </th>
                        <th className="labels">
                          <div className="table-row border  border-top-0 border-bottom-0 border-start-0 ">
                            <span className="text-font">Actions</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userGroupList?.length > 0 ? (
                        userGroupList?.map((item, index) => {
                          return (
                            <tr className="row-highlight">
                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target={`#${USER_GROUP_MODAL_ID}`}
                                aria-controls="offcanvasRight"
                                onClick={() => handleClick(SIDE_MENU_TYPE_VIEW,item)}
                              >
                                {item?.groupName ? item?.groupName : "-"}
                              </td>
                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target={`#${USER_GROUP_MODAL_ID}`}
                                aria-controls="offcanvasRight"
                                onClick={() => handleClick(SIDE_MENU_TYPE_VIEW,item)}
                              >
                                {item?.modules?.map(
                                  (moduleItem, moduleIndex) => (
                                    <Tag key={moduleIndex} color="default">
                                      {moduleItem?.name}
                                    </Tag>
                                  )
                                )}
                              </td>

                              <td
                                className="table-td"
                                key={index}
                                data-bs-toggle="offcanvas"
                                data-bs-target={`#${USER_GROUP_MODAL_ID}`}
                                aria-controls="offcanvasRight"
                                onClick={() => handleClick(SIDE_MENU_TYPE_VIEW,item)}
                              >
                                {item?.roles?.map((roleItem, roleIndex) => (
                                  <Tag key={roleIndex} color="default">
                                    {roleItem?.name}
                                  </Tag>
                                ))}
                              </td>

                              <td className=" table-td py-1">
                                <div className=" d-flex justify content-center">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      <Tooltip style={toolTipFont}>
                                        Edit
                                      </Tooltip>
                                    }
                                  >
                                    <img
                                      src={editIcon}
                                      data-bs-toggle="offcanvas"
                                      data-bs-target={`#${USER_GROUP_MODAL_ID}`}
                                      aria-controls="offcanvasRight"
                                      className="cursorClass button-border p-2"
                                      alt="img"
                                      onClick={() => handleClick(SIDE_MENU_TYPE_EDIT,item)}
                                    />
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      <Tooltip style={toolTipFont}>
                                        Delete
                                      </Tooltip>
                                    }
                                  >
                                    <img
                                      src={deleteImg}
                                      className="deleteCursor button-border p-2 ms-2"
                                      onClick={() => {
                                        deletefn(item);
                                      }}
                                      alt="img"
                                    ></img>
                                  </OverlayTrigger>

                                  
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={4}>
                            <div className="text-center">
                              {NO_RECORDS}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 bg_img ms-2">
                  <img
                    src={backgroundImage}
                    className="ms-5 bg_img2"
                    alt="img"
                  />
                </div>
              </div>
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
            <ReusableModal id={USER_GROUP_MODAL_ID} style={modalWidth}>
              <AddEditUserGroup
                AddEditError={AddEditError}
                roleOptionsData={roleOptionsData}
                menuOptionsData={menuOptionsData}
                id={USER_GROUP_CANVAS_ID}
                sideMenuType={sideMenuType}
                fetchUserGroupsFunc={fetchUserGroupsFunc}
                selectedUserGroup={selectedUserGroup}
                setSelectedUserGroup={setSelectedUserGroup}
              />
            </ReusableModal>
          </div>

          <DeleteModal
            showModal={showModal}
            handleClose={handleClose}
            handleYes={handleYes}
          />

          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroupList;
