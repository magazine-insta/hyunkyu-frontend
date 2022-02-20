import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src}></Image>
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.src}></Image>
        </Grid>
        <Grid padding="16px">
          <Text bold> 댓글 {props.comment_cnt} 개</Text>
        </Grid>
        <div>user profile/ user name/ insert_dt / is_me (edit Btn)</div>
        <div>contents</div>
        <div>image</div>
        <div>comment cnt</div>
      </Grid>
    </React.Fragment>
  );
};
Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3035&q=80",
  },
  image_url:
    "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3035&q=80",
  contents: "고양이네요",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00",
};

export default Post;
