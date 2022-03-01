import "./App.css";
import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Header from "./Header";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetails";
import Notification from "../pages/Notification";
import Search from "./Search";
import { Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "./Cookies";
import Permit from "./Permit";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const token = getCookie("is_login");
    if (token) {
      dispatch(userActions.loginCheck(token));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Grid width="400px" margin="0 auto">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
          <Route path="/write/:id" exact component={PostWrite} />
          <Route path="/post/:id" exact component={PostDetail} />
          <Route path="/search" exact component={Search} />
          <Route path="/noti" exact component={Notification} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
