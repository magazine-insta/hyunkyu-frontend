import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Button from "../elements/Button";

import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  //   console.log(props);
  const dispatch = useDispatch();
  const id = props.match.params.id;
  //   console.log("id", id);
  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);
  //   console.log("post_list", post_list[0]);
  let post_idx;
  //   console.log("post_idx", post_idx);
  post_list.map((p, num) => {
    // console.log(p.postId, id);
    if (p.postId === parseInt(id)) {
      post_idx = num;
    }
  });

  const post = post_list[post_idx];

  //   console.log("post2----------", post);
  const deletePost = () => {
    dispatch(postActions.deletePostFB(id));
  };

  React.useEffect(() => {
    // console.log("post", post);

    dispatch(postActions.getOnePostFB2(id));
  }, [dispatch]);

  return (
    <React.Fragment>
      {post && <Post {...post} />}
      <Button width="auto" padding="4px" margin="4px" _onClick={deletePost}>
        삭제
      </Button>
      <CommentWrite post_id={id} />
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
