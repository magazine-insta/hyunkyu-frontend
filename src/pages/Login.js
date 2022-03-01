import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const changeId = (e) => {
    setUserName(e.target.value);
  };

  const changePwd = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    if (username === "" || password === "") {
      window.alert("아이비 비번 입력해");
      return;
    }
    dispatch(userActions.login(username, password));
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
            value={username}
            _onChange={changeId}
            placeholder="아이디를 입력하세요."
          />
        </Grid>
        <Grid padding="16px 0px 32px 0px">
          <Input
            label="비밀번호"
            value={password}
            _onChange={changePwd}
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </Grid>

        <Button _onClick={login}>로그인</Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
