import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { Action } from "history";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookies";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
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
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, id, pwd)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user.displayName);
            dispatch(
              setUser({
                id: id,
                pwd: pwd,
                user_name: user.displayName,
                uid: user.uid,
              })
            );
            history.push("/");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });

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

const signupFB = (id, pwd, user_name, profile) => {
  return function (dispatch, getState, { history }) {
    createUserWithEmailAndPassword(auth, id, pwd)
      .then((userCredential) => {
        // Signed in
        updateProfile(auth.currentUser, {
          displayName: user_name,
        })
          .then(() => {
            const user = userCredential.user;
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: profile,

                uid: user.uid,
              })
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

const loginCheckFB = () => {
  return function (dispatch, getState) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: uid,
          })
        );
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.replace("/");
      })
      .catch((error) => {
        // An error happened.
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
  loginCheckFB,
  logoutFB,
  //   loginAction,
};
export { actionCreators };
