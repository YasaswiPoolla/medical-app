import { Api } from '../Interceptor/Interceptor';
import { USER_GROUPS_API_END_POINT,APPLICATION_MENU_API_END_POINT } from './userGroupsApiEndPoints';

export const fetchUserGroupService = (currentPage, itemsPerPage, searchTerm) => {
  return Api.get(USER_GROUPS_API_END_POINT, {
    params: {
      'pageNumber': currentPage,
      'pageSize': itemsPerPage,
      'searchTerm': searchTerm
    }
  });
};

export const fetchApplicationMenuService = () => {
  return Api.get(APPLICATION_MENU_API_END_POINT, {
    params: {}
  });
};

export const postUserGroupService = (body) => {
  return Api.post(USER_GROUPS_API_END_POINT, body);
};

export const deleteUserGroupService = (userGroupId) => {
  return Api.delete(`${USER_GROUPS_API_END_POINT}?user_group_id=${userGroupId}`);
};

export const editUserGroupService = (userGroupId, body) => {
  return Api.put(USER_GROUPS_API_END_POINT, body, {
    params: {
      user_group_id: userGroupId,
    },
  });
};

export const userGroupSearchService = (searchTerm) => {
  return Api.get(USER_GROUPS_API_END_POINT, {
    params: {
      searchTerm: searchTerm,
    },
  });
};

const userGroupsServices = {
  fetchUserGroupService,
  fetchApplicationMenuService,
  postUserGroupService,
  deleteUserGroupService,
  editUserGroupService,
  userGroupSearchService
};

export default userGroupsServices;