import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Button from "../elements/Button";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  console.log(post);
  const deletePost = () => {
    dispatch(postActions.deletePostFB(id));
  };

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <Button width="auto" padding="4px" margin="4px" _onClick={deletePost}>
        삭제
      </Button>
      <CommentWrite post_id={id} />
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
