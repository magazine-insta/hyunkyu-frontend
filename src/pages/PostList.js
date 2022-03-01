import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import Heart from "../components/Heart";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid, Text } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  // console.log("user_info", user_info);
  const { history } = props;

  React.useEffect(() => {
    // 가지고 있는 데이터가 0개, 1개일 때만 새로 데이터를 호출해요.

    // dispatch(postActions.getPostFB());
    dispatch(postActions.getPostList());
    // console.log("post_list2--------", post_list);
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"} padding="20px 0px" width="" margin="0 auto">
        {/* <Post/> */}
        <InfinityScroll
          callNext={() => {
            // dispatch(postActions.getPostFB(paging.next));
            dispatch(postActions.getPost(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            // console.log("p-----------", p.nickname);

            if (p.nickname === user_info?.user_name) {
              return (
                <>
                  <Grid
                    bg="#ffffff"
                    margin="8px 0px"
                    key={p.postId}
                    _onClick={() => {
                      history.push(`/post/${p.postId}`);
                    }}
                  >
                    <Post key={p.id} {...p} is_me />
                  </Grid>
                  <Heart></Heart>
                </>
              );
            } else {
              return (
                <>
                  <Grid
                    key={p.postId}
                    bg="#ffffff"
                    _onClick={() => {
                      history.push(`/post/${p.postId}`);
                    }}
                  >
                    <Post {...p} />
                  </Grid>
                  <Heart></Heart>
                </>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
