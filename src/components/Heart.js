import React, { useState } from "react";

import { Grid, Input, Button, Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";
import { firestore } from "../shared/firebase";

const Heart = (props) => {
  const dispatch = useDispatch();
  const [is_like, setIsLike] = useState(false);
  const [like_count, setLikeCount] = useState(0);
  const [showing, setShowing] = useState(false);

  const id = props.id;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  const comment_list = useSelector((state) => state.comment.list);

  const { post_id } = props;
  const increaselike = () => {
    setLikeCount(like_count + 1);
  };
  const decreaseLike = () => {
    setLikeCount(like_count - 1);
  };
  const changeIsLike = () => {
    setIsLike(!is_like);

    // dispatch(postActions.addPostFB("", post_id, is_like, like_count));
  };
  const toggleShowing = () => setShowing(!showing);
  React.useEffect(() => {
    if (!comment_list[post_id]) {
      // 코멘트 정보가 없으면 불러오기
      dispatch(likeActions.getLikeFB(post_id));
    }
  }, []);

  if (!comment_list[post_id] || !post_id) {
    return null;
  }
  if (is_like) {
    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold color="red">
            <FontAwesomeIcon
              style={{ color: "red" }}
              icon={faHeart}
              onClick={() => {
                decreaseLike();
                changeIsLike();
              }}
            />
          </Text>
          <Text> 하트 {like_count}개</Text>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
          <Text margin="0px" bold>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => {
                increaselike();

                changeIsLike();
              }}
            />
          </Text>
          <Text> 하트 {like_count}개</Text>
        </Grid>
      </React.Fragment>
    );
  }
};

Heart.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  is_like: false,
  like_cnt: 0,
  insert_dt: "2021-01-01 19:00:00",
};

export default Heart;
