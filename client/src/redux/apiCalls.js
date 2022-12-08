import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { registerStart, registerSuccess, registerFailure } from "./registerRedux.js";
import { logoutStart, logoutSuccess, logoutFailure } from "./logoutRedux.js";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};


// function to register
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/users/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
}


//function to logout
export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try {
    await publicRequest.get("/users/logout");
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure());
  }
}
