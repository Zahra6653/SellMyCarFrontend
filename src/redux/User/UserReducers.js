import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducers;
