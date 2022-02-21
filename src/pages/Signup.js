import React, { useState } from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [user_name, setUserName] = useState("");
  const [profile, setProfile] = useState("");

  const signup = () => {
    if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    if (id === "" || pwd === "" || user_name === "" || profile === "") {
      window.alert("아이디, 패스워드, 닉네임,프로필을 모두 입력해주세요!");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name, profile));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid>
          <Text size="32px" bold>
            회원가입
          </Text>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          ></Input>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="프로필"
            placeholder="프로필 주소를 입력해주세요"
            _onChange={(e) => {
              setProfile(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid padding="16px 0px 32px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          ></Input>
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
