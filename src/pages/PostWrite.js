import React, { useState } from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  console.log("post_list-------", post_list);
  const post_id = props.match.params.id;
  console.log("post_id----------2", typeof post_id);
  const is_edit = parseInt(post_id) ? true : false;
  console.log("is_edit----------2", is_edit);
  const { history } = props;

  let _post = is_edit
    ? post_list.find((p) => p.postId === parseInt(post_id))
    : null;
  console.log(_post);
  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  const [layout, setLayout] = useState(_post ? _post.layout : "bottom");

  React.useEffect(() => {
    // if (is_edit && !_post) {
    //   console.log("포스트 정보가 없어요!");
    //   //   history.goBack();

    //   return;
    // }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.imageURL));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB2(contents, layout));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents, layout }));
  };
  const is_checked = (e) => {
    if (e.target.checked) {
      setLayout(e.target.value);
    }
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>
      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="RIGHT"
          id="right"
          onChange={is_checked}
        />
        <label htmlFor="right">
          <strong>이미지가 오른편에, 텍스트는 왼편에 위치한 레이아웃</strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Text width="80%" margin="10px" center>
          {contents}
        </Text>
        <Image
          width="50%"
          shape="half"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="LEFT"
          id="left"
          onChange={is_checked}
        />
        <label htmlFor="left">
          <strong>이미지가 왼편에, 텍스트는 오른편에 위치한 레이아웃</strong>
        </label>
      </Grid>
      <Grid is_flex>
        <Image
          width="50%"
          shape="half"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
        <Text width="80%" margin="10px" center>
          {contents}
        </Text>
      </Grid>

      <Grid padding="16px">
        <input
          type="radio"
          name="layout"
          value="BOTTOM"
          id="bottom"
          onChange={is_checked}
          style={{ color: "skyblue" }}
        />
        <label htmlFor="bottom">
          {" "}
          <strong>텍스트가 위에, 이미지는 아래에 위치한 레이아웃</strong>
        </label>
      </Grid>
      <Grid>
        <Text margin="10px">{contents}</Text>
        <Image
          shape="half"
          width="100%"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button
            text="게시글 수정"
            _onClick={editPost}
            _disabled={!preview || contents === "" ? true : false}
          ></Button>
        ) : (
          <Button
            text="게시글 작성"
            _onClick={addPost}
            _disabled={!preview || contents === "" ? true : false}
          ></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
