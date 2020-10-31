import * as authType from "../../constants/auth";
export const login = (state = { userRole: "admin" }, action) => {
  switch (action.type) {
    case authType.LOGIN: {
      return {
        ...state,
      };
    }
    case authType.LOGIN_SUCCESS: {
      return { ...state, values: action.payload };
    }
    case authType.LOGIN_FAILD: {
      return { ...state };
    }
    case authType.LOGOUT: {
      return { ...state };
    }
    case authType.LOGOUT_SUCCESS: {
      return { ...state, values: action.payload };
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole };
    }
    default: {
      return state;
    }
  }
};
