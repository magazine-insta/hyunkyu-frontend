import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { setCookie } from "../shared/Cookies";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이비 비번 입력해");
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };
  return (
    <React.Fragment>
      <Grid padding="16px ">
        <Grid padding={16}>
          <Text size="32px" bold>
            로그인 페이지
          </Text>
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            value={id}
            _onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="아이디를 입력하세요."
          />
        </Grid>
        <Grid padding="16px 0px 32px 0px">
          <Input
            label="비밀번호"
            value={pwd}
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </Grid>

        <Button _onClick={login}>로그인</Button>
      </Grid>

      {/* <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>
      </Grid>
      <Grid padding="16px 0px">
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          _onChange={() => {
            console.log("아이디 입력 완료!");
          }}
        ></Input>
      </Grid>

      <Grid padding="16px 0px">
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          _onChange={() => {
            console.log("비밀번호 입력 완료!");
          }}
        ></Input>
      </Grid>
      <Button
        text="로그인하기"
        _onClick={() => {
          console.log("로그인 완료!");
        }}
      >
        dd
      </Button> */}
    </React.Fragment>
  );
};

export default Login;
