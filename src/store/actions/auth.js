import axios from "axios";
import * as actionTypes from "./actionTypes";

const localhost = 'http://localhost:8000'

export const endpoint = `${localhost}`

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("dinner_token");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};


export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${endpoint}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem("dinner_token", token);
        dispatch(authSuccess(token));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};


export const authSignup = (username, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${endpoint}/rest-auth/registration/`, {
        username: username,
        email: `${username}@${username}.com`,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem("dinner_token", token);
        dispatch(authSuccess(token));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("dinner_token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};
