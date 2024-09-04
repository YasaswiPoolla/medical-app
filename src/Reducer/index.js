import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import roleReducer from "./RoleConfigurationReducer";
import departmentReducer from "./DepartmentReducer";

import staffCreationReducerFn from "./StaffWorkerCreation";
import PaginationReducer from "./PaginationReducer";
import staffManagementReducerFn from "../Reducer/AdminStaffManagementReducer";
import gradesReducer from "../Reducer/GradeReducer";
import loadingReducer from "./LoadingReducer";
import ProcessFlowReducer from "./ProcessFlowReducer";
import UserGroupReducer from "./UserGroupReducer";

export default combineReducers({
	loading: loadingReducer,
	loginReducer,
	roleReducer,
	departments: departmentReducer,
	staffCreationReducerFn,
	PaginationReducer,
	staffManagementReducerFn,
	gradesReducer,
	ProcessFlowReducer,
	UserGroupReducer,
});
