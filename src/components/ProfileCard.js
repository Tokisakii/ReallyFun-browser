import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Readonly: true,
      id: "",
      name: "",
      email: "",
      avatar: "",
      auth: "",
    };
    this.Get();
  }

  Get() {
    axios
      .get(`http://127.0.0.1:4523/m1/1221635-0-default/user/${this.props.uid}`)
      .then((response) => {
        this.setState({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          avatar: response.data.data.avatar,
          auth: 1,
        });
      })
      .catch((error) => {
        // handle error satuation
        console.log(error);
      });
  }

  handleChange() {
    const temp = this.state.Readonly;
    this.setState({ Readonly: !temp });
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleAuth = (e) => {
    this.setState({ auth: e.target.value });
  };

  handleSubmit() {
    this.setState({ Readonly: true });
    console.log(this.state);
  }

  render() {
    return (
      <Card sx={{ maxWidth: 1 }}>
        <CardMedia component="img" alt={this.state.name} image={this.state.avatar} />
        <CardContent>
          <div>
            <TextField
              disabled={this.state.Readonly}
              id="name"
              label="用户名"
              value={this.state.name}
              variant="standard"
              margin="dense"
              onChange={(e) => this.handleName(e)}
            />
          </div>
          <div>
            <TextField
              disabled
              id="outlined-disabled"
              label="ID"
              value={this.state.id}
              variant="standard"
              margin="dense"
            />
          </div>
          <div>
            <TextField
              disabled={this.state.Readonly}
              id="Email"
              label="Email"
              value={this.state.email}
              variant="standard"
              margin="dense"
              onChange={(e) => this.handleEmail(e)}
            />
          </div>
          <div>
            <InputLabel id="demo-simple-select-standard-label">管理权限</InputLabel>
            <Select
              disabled={this.state.Readonly}
              labelId="authlabel"
              id="auth"
              value={this.state.auth}
              onChange={(e) => this.handleAuth(e)}
              label="权限"
            >
              <MenuItem value={0}>普通玩家</MenuItem>
              <MenuItem value={1}>游戏开发者</MenuItem>
              <MenuItem value={2}>管理员</MenuItem>
            </Select>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => this.handleChange()}>
            修改信息
          </Button>
          <Button size="small" onClick={() => this.handleSubmit()} disabled={this.state.Readonly}>
            提交修改
          </Button>
        </CardActions>
      </Card>
    );
  }
}
