import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie } from "../../shared/Cookies";
import instance from "../../shared/Axios";

// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const login = (username, password) => {
  return function (dispatch, getState, { history }) {
    const data = {
      username: username,
      password: password,
    };
    instance
      .post("/api/login", data, { withCredentials: true })
      .then((res) => {
        // const user = userCredential.user;
        // console.log(user.displayName);
        const accessToken = res.data.token;
        // console.log("accessToken-------", accessToken);
        setCookie("is_login", `${accessToken}`);
        dispatch(
          logIn({
            username: res.data.username,
            password: res.password,
          })
        );
        history.push("/");
      })
      .catch((err) => console.log("getPostFB::: ", err.message));
  };
};

const signup = (username, password, nickname) => {
  return function (dispatch, getState, { history }) {
    const data = {
      username: username,
      password: password,
      nickname: nickname,
    };
    instance
      .post("/api/signup", data, { withCredentials: true })
      .then((res) => {
        window.alert(res.data.username);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const loginCheck = (token) => {
  return async function (dispatch, getState) {
    // const token = getCookie("is_login");
    // console.log("loginCheckFB2", token);

    instance
      .get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const user_info = {
          userId: res.data.userId,
          userEmail: res.data.username,
          nickname: res.data.nickname,
        };
        dispatch(setUser(user_info));
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };
};

const logout = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace("/");
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  //   logIn,
  login,
  logOut,
  getUser,
  setUser,
  signup,
  loginCheck,
  logout,
  //   loginAction,
};
export { actionCreators };
