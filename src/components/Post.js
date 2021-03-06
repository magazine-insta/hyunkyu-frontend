import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

const Post = (props) => {
  const { layoutType } = props;

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.nickname}</Text>
          </Grid>
          <Grid is_flex width="auto">
            {props.is_me && (
              <>
                {" "}
                <Button
                  width="auto"
                  padding="4px"
                  margin="4px"
                  _onClick={() => {
                    // window.location.replace(`/write/${props.postId}`);
                    history.push(`/write/${props.postId}`);
                  }}
                >
                  수정
                </Button>{" "}
              </>
            )}
            <Text>{props.createdAt}</Text>
          </Grid>
        </Grid>
        {layoutType === "RIGHT" && (
          <>
            <Grid is_flex>
              <Text width="80%" margin="10px" center>
                {props.contents}
              </Text>
              <Image width="50%" shape="half" src={props.imageUrl} />
            </Grid>

            <Grid padding="16px" is_flex>
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </>
        )}

        {layoutType === "LEFT" && (
          <>
            <Grid is_flex>
              <Image width="50%" shape="half" src={props.imageUrl} />
              <Text width="80%" margin="10px" center>
                {props.contents}
              </Text>
            </Grid>

            <Grid padding="16px" is_flex>
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </>
        )}

        {layoutType === "BOTTOM" && (
          <>
            <Grid>
              <Text margin="10px">{props.contents}</Text>
              <Image shape="half" width="100%" src={props.imageUrl} />
            </Grid>

            <Grid padding="16px" is_flex>
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
