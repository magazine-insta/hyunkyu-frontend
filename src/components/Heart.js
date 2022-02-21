import React from "react";

import { Grid, Input, Button, Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { firestore } from "../shared/firebase";

const Heart = (props) => {
  const dispatch = useDispatch();
  console.log("props-----2", props);
  const id = props.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex key={props.id}>
        <Text margin="0px" bold>
          <FontAwesomeIcon icon={faHeart} />
          하트 {props.comment_cnt}개
        </Text>
      </Grid>
    </React.Fragment>
  );
};

export default Heart;
