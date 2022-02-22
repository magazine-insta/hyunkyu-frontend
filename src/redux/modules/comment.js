import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { actionCreators as postActions } from "./post";

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
const addLike = createAction(ADD_LIKE, (post_id, comment) => ({
  post_id,
  comment,
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
        let _list = [];
        docs.forEach((doc) => {
          _list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setLike(post_id, _list));
      })
      .catch((err) => {
        console.log("get comment like fb err :::", err);
      });
  };
};

const addLikeFB = (post_id, is_like, like_count) => {
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;
    const post = getState().post.list.find((l) => l.id === post_id);

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      is_like: is_like,
      like_cnt: like_count,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    commentDB.doc(post_id).update({ like_cnt: like_count });
    // firestore에 코멘트 정보를 넣어요!
    // commentDB.add(comment).then((doc) => {
    //   const postDB = firestore.collection("post");
    //   comment = { ...comment, id: doc.id };

    //   const post = getState().post.list.find((l) => l.id === post_id);

    //   //   firestore에 저장된 값을 +1해줍니다!
    //   const increment = firestore.FieldValue.increment(1);

    //   // post에도 comment_cnt를 하나 플러스 해줍니다.
    //   commentDB
    //     .doc(post_id)
    //     .update({ like_count: increment })
    //     .then((_post) => {
    //       dispatch(addComment(post_id, comment));
    //       // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
    //       if (post) {
    //         dispatch(
    //           postActions.editPost(post_id, {
    //             like_count: parseInt(post.comment_cnt) + 1,
    //           })
    //         );
    //       }
    //     });
    // });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].push(action.payload.comment);
      }),
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
  getLikeFB,
  addLikeFB,
};

export { actionCreators };
