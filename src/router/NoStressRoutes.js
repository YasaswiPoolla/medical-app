import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import paths from './paths';
import Login from "../Components/Login/Login";
import TimeSlotsLists from "../Components/TimeSlots/time-slots-lists";
import FlootLists from "../Components/Floor/floor-lists";
import StationLists from "../Components/Station/station-lists";
import RosterManagementLists from "../Components/Roster-Management/roster-management-lists";
import AdminStaffList from "../Components/AdminStaffManagement/AdminStaffList";
import RosterConfiguration from "../Components/Roster-Configuration/roster-configuration";
import { Header } from "../Components/Header/Header";
import DepartmentConfiguration from "../Components/Department-Configuration/department-configuration-lists";
import RolesConfiguratioon from '../Components/Roles-Configuration/RolesList'
import GradesConfiguration from '../Components/Grades-Configuration/GradesList'
import ProcessList from '../Components/ProcessFlows/ProcessList';
import AddProcessFlow from '../Components/ProcessFlows/AddProcessFlow'
import ProtectedRoute from './ProtectedRoute';
import PriorityConfiguration from "../Components/Priority-Configuration/PriorityList";
import UserGroupList from "../Components/User-Groups/UserGroupList";

const AppRouter = (props) => {
  return (
    <Router>
      <Routes>
        <Route path={paths.home} element={<Login />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.adminStaffList} element={<ProtectedRoute><AdminStaffList /></ProtectedRoute>} />
        <Route path={paths.rosterConfiguration} element={<ProtectedRoute><RosterConfiguration /></ProtectedRoute>} />
        <Route path={paths.hospitalLists} element={<ProtectedRoute><TimeSlotsLists /></ProtectedRoute>} />
        <Route path={paths.timeSlotsLists} element={<ProtectedRoute><TimeSlotsLists /></ProtectedRoute>} />
        <Route path={paths.floorLists} element={<ProtectedRoute><FlootLists /></ProtectedRoute>} />
        <Route path={paths.stationLists} element={<ProtectedRoute><StationLists /></ProtectedRoute>} />
        <Route path={paths.header} index element={<ProtectedRoute><Header /></ProtectedRoute>} />
        <Route path={paths.rosterManagementLists} element={<ProtectedRoute><RosterManagementLists /></ProtectedRoute>} />
        <Route path={paths.departmentConfigurationLists} element={<ProtectedRoute><DepartmentConfiguration /></ProtectedRoute>} />
        <Route path={paths.rolesConfigurationList} element={<ProtectedRoute><RolesConfiguratioon /></ProtectedRoute>} />
        <Route path={paths.gradesConfigurationList} element={<ProtectedRoute><GradesConfiguration /></ProtectedRoute>} />
        <Route path={paths.processFlow} element={<ProtectedRoute><ProcessList /></ProtectedRoute>} />
        <Route path={paths.addProcessFlow} element={<ProtectedRoute><AddProcessFlow /></ProtectedRoute>} />
        <Route path={paths.priorityList} element={<ProtectedRoute><PriorityConfiguration /></ProtectedRoute>} />
        <Route path={paths.userGroupList} element={<ProtectedRoute><UserGroupList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
