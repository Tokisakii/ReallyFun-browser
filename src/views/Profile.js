import React, { Component } from "react";
import { Button, Container, Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      id: "",
      avatar: "",
      name: "",
      email: "",
    };
    this.Get();
  }

  Get = () => {
    axios
      .get("http://127.0.0.1:4523/m1/1221635-0-default/user/1")
      .then((response) => {
        this.setState({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          avatar: response.data.data.avatar,
          auth: response.data.data.auth,
        });
      })
      .catch((error) => {
        // handle error satuation
        console.log(error);
      });
  };

  render() {
    return (
      <Container
        component="main"
        maxWidth="md"
        color="blue"
        sx={{ mt: 10, justifyContent: "center" }}
      >
        <Stack variant="h1" component="h2">
          <Stack>
            <div>个人空间</div>
          </Stack>
          <Stack>
            <Avatar alt="Avatar" src={this.state.avatar} sx={{ width: 112, height: 112 }} />
          </Stack>
          <Stack> 用户名: {this.state.name}</Stack>
          <Stack> 用户ID: {this.state.id}</Stack>
          <Stack> Email: {this.state.email}</Stack>
          <Stack> 用户权限: {this.state.auth}</Stack>
        </Stack>
      </Container>
    );
  }
}
