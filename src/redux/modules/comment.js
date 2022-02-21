import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const setLike = createAction(SET_LIKE, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addLike = createAction(ADD_LIKE, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id) => {
  return function (dispatch) {
    console.log("in get comment fb");

    firestore
      .collection("comment")
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let _list = [];
        docs.forEach((doc) => {
          _list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setComment(_list, post_id));
      })
      .catch((err) => {
        console.log("get comment fb err :::", err);
      });
  };
};

const getLikeFB = (post_id) => {
  return function (dispatch) {
    console.log("in get like fb");

    firestore
      .collection("comment")
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        console.log("docs------", docs);
        let _list = [];
        docs.forEach((doc) => {
          _list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setLike(_list, post_id));
      })
      .catch((err) => {
        console.log("get comment like fb err :::", err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  setLike,
  addLike,
};

export { actionCreators };
