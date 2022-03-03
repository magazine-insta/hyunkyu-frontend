import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { doc, deleteDoc } from "firebase/firestore";
import { actionCreators as imageActions } from "./image";
import axios from "axios";
import { getCookie } from "../../shared/Cookies";

const GET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";

const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));

const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({
  post_id,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: 0, next: true, size: 3 },
  is_loading: false,
};
const baseURL = "http://13.209.40.211/api/post";
const token = getCookie("is_login");

const initialPost = {
  //   id: 0,
  //   user_info: {
  //     user_name: "mean0",
  //     user_profile:
  //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2043&q=80",
  //   },
  contents: "",
  comment_cnt: 10,
  imageUrl: "",
  layoutType: "BOTTOM",
};
const editPostFB2 = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    console.log(_post);
    const editPostData = {
      ...post,
      postId: post_id,
      imageUrl: _post.imageUrl,
    };
    console.log(editPostData);

    if (_image === _post.imageUrl) {
      axios
        .post(`api/post/${post_id}`, editPostData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          history.replace("/");
          dispatch(editPost(post_id, editPostData));
        })
        .catch((err) => console.log("updatePost: ", err.response));
      return;
    } else {
      const _upload = storage
        .ref(`images/${post_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            return url;
          })
          .then((url) => {
            axios
              .post(
                `api/post/${post_id}`,
                { ...post, imageUrl: url },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  withCredentials: true,
                }
              )
              .then(() => {
                history.replace("/");
                dispatch(editPost(post_id, { ...post, imageUrl: url }));
              })
              .catch((err) => console.log(" ", err.code, err.message));
          })
          .catch((err) => {
            console.log("앗! 이미지 업로드에 문제가 있어요!", err.message);
          });
      });
    }
  };
};
const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    // console.log(_post);

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            // console.log(url);

            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};
const addPostFB2 = (contents = "", layout) => {
  return function (dispatch, getState, { history }) {
    // const postDB2 = firestore.collection("post2");

    const _user = getState().user.user;

    const user_info = {
      nickname: _user.nickname,
    };

    const _post = {
      ...initialPost,
      layoutType: layout,
      contents: contents,
    };

    const _image = getState().image.preview;

    // console.log(_image);
    // console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.nickname}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          //   console.log(url);
          //   postDB2.add({ imageURL: url });

          dispatch(imageActions.uploadImage(url));
          return url;
        })
        .then((url) => {
          const postData = { ..._post, imageUrl: url };

          axios
            .post(baseURL, postData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            })
            .then((res) => {
              //   history.replace("/");
              window.location.replace("/");
              dispatch(addPost(res.data));
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              //   console.log("post 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          //   console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const getPostList = (start = 1, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((docss) => {
        // console.log(docss.data);
        let docs = docss.data;

        dispatch(getPost(docs));
      });
  };
};

const getOnePostFB2 = (id) => {
  return function (dispatch, getState, { history }) {
    // console.log("id-------", id);
    axios
      .get(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        history.replace(`/post/${id}`);
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deletePostFB = (id) => {
  return async function (dispatch, getState, { history }) {
    // console.log(id);
    const postDB = firestore.collection("post");
    const _id = postDB.doc(id);
    // console.log(_id);
    await deleteDoc(doc(postDB, id)).then(window.location.replace("/"));
  };
};
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {}),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostFB2,
  getPost,
  getPostList,
  editPost,
  editPostFB2,
  editPostFB,
  deletePostFB,
  getOnePostFB2,
};

export { actionCreators };
