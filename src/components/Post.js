import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";

const Post = (props) => {
  const dispatch = useDispatch();
  const {
    user_info,
    image_url,
    contents,
    like_cnt,
    insert_dt,
    id,
    layout,
    comment_cnt,
  } = props;

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
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
                    history.push(`/write/${props.id}`);
                  }}
                >
                  수정
                </Button>{" "}
              </>
            )}
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        {layout === "right" && (
          <>
            <Grid is_flex>
              <Text width="80%" margin="10px" center>
                {contents}
              </Text>
              <Image width="50%" shape="half" src={image_url} />
            </Grid>

            <Grid padding="16px" is_flex>
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </>
        )}

        {layout === "left" && (
          <>
            <Grid is_flex>
              <Image width="50%" shape="half" src={image_url} />
              <Text width="80%" margin="10px" center>
                {contents}
              </Text>
            </Grid>

            <Grid padding="16px" is_flex>
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </>
        )}

        {layout === "bottom" && (
          <>
            <Grid>
              <Text margin="10px">{contents}</Text>
              <Image shape="half" width="100%" src={image_url} />
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
