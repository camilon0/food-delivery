import { userTypes } from "../types/userTypes";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_REGISTER:
      return {
        ...action.payload,
      };

    case userTypes.USER_LOGIN:
      return {
        ...action.payload,
      };
    case userTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
