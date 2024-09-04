import { DEPARTMENT_FETCHALL_SUCCESS } from "../ActionTypes/DepartmentTypes";

import { SET_MESSAGE } from "../ActionTypes/GenericTypes";

const initialState = {
	departmentDetails: "",
	departmentError: "",
};

const myFunction = (state = initialState, action) => {
	switch (action.type) {
		case DEPARTMENT_FETCHALL_SUCCESS: {
			return {
				...state,
				departmentDetails: action.payload.data.body,
			};
		}

		case SET_MESSAGE: {
			return {
				...state,
				error: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};

export default myFunction;
