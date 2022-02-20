import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { Action } from "history";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookies";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../shared/firebase";

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

const user_initial = {
  user_name: "aiden",
};

// middleware actions
// const loginAction = (user) => {
//   return function (dispatch, getState, { history }) {
//     console.log(history);
//     // dispatch(logIn(user));
//     dispatch(setUser(user));
//     history.push("/");
//   };
// };

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    signInWithEmailAndPassword(auth, id, pwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.displayName);
        dispatch(setUser({ id: id, pwd: pwd, user_name: user.displayName }));
        history.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    createUserWithEmailAndPassword(auth, id, pwd)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: user_name,
        })
          .then(() => {
            dispatch(
              setUser({ user_name: user_name, id: id, user_profile: "" })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("signupFB error" + errorCode, errorMessage);
        // ..
      });
  };
};

//reducer
export default handleActions(
  {
    // [LOG_IN]: (state, action) =>
    //   produce(state, (draft) => {
    //     setCookie("is_login", "success");
    //     draft.user = action.payload.user;
    //     draft.is_login = true;
    //   }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
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
  loginFB,
  logOut,
  getUser,
  setUser,
  signupFB,
  //   loginAction,
};
export { actionCreators };