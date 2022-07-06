import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import Api from "../utils/Api";

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Readonly: true,
      Delete: false,
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
      .get(Api(`/user/${this.props.uid}`))
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
        console.log(error);
      });
  }

  handleChangeReadOnly() {
    const temp = this.state.Readonly;
    this.setState({ Readonly: !temp });
  }

  handleChangeDelete() {
    const temp = this.state.Delete;
    this.setState({ Delete: !temp });
  }

  setStateName(e) {
    this.setState({ name: e.target.value });
  }

  setStateAvatar(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        avatar: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  setStateEmail(e) {
    this.setState({ email: e.target.value });
  }

  setStateAuth(e) {
    this.setState({ auth: e.target.value });
  }

  handleUploadAvatar() {
    axios
      .post(Api(`/user/avatar`), {
        avatar: this.state.avatar,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          avatar: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit() {
    this.handleUploadAvatar();
    this.setState({ Readonly: true });
  }

  handleDelete() {
    axios
      .patch(Api(`/user/name`), {
        name: this.state.uid,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Card sx={{ maxWidth: 1 }}>
        <CardMedia component="img" alt={this.state.name} image={this.state.avatar} />
        <IconButton
          color="primary"
          variant="contained"
          component="label"
          sx={{ display: this.state.Readonly ? "none" : "block" }}
        >
          <PhotoCamera />
          <input type="file" hidden onChange={(e) => this.setStateAvatar(e)} />
        </IconButton>
        <CardContent>
          <div>
            <TextField
              disabled={this.state.Readonly}
              id="name"
              label="用户名"
              value={this.state.name}
              variant="standard"
              margin="dense"
              onChange={(e) => this.setStateName(e)}
            />
            {/* <FormHelperText sx={{ display: this.state.Readonly ? "none" : "block" }}>
              3-32个字符,仅包含英文字母、数字和下划线
            </FormHelperText> */}
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
            <FormHelperText sx={{ display: this.state.Readonly ? "none" : "block" }}>
              用户无法修改ID
            </FormHelperText>
          </div>
          <div>
            <TextField
              disabled={this.state.Readonly}
              id="Email"
              label="Email"
              value={this.state.email}
              variant="standard"
              margin="dense"
              onChange={(e) => this.setStateEmail(e)}
            />
            {/* <FormHelperText sx={{ display: this.state.Readonly ? "none" : "flex" }}>
              8-32个字符
            </FormHelperText> */}
          </div>
          <div>
            <Select
              disabled={this.state.Readonly}
              variant="standard"
              labelId="authlabel"
              id="auth"
              label="管理权限"
              value={this.state.auth}
              margin="dense"
              onChange={(e) => this.setStateAuth(e)}
            >
              <MenuItem value={0}>普通玩家</MenuItem>
              <MenuItem value={1}>游戏开发者</MenuItem>
              <MenuItem value={2}>管理员</MenuItem>
            </Select>
            <FormHelperText sx={{ display: this.state.Readonly ? "none" : "block" }}>
              权限修改需经过管理员审核
            </FormHelperText>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => this.handleChangeReadOnly()}
            sx={{ display: this.state.Readonly ? "block" : "none" }}
          >
            修改信息
          </Button>
          <Button
            size="small"
            onClick={() => this.handleSubmit()}
            color="success"
            variant="contained"
            disabled={this.state.Readonly}
            sx={{ display: this.state.Readonly ? "none" : "block" }}
          >
            提交修改
          </Button>
          <Button
            size="small"
            onClick={() => this.handleChangeDelete()}
            color="error"
            variant="contained"
          >
            删除账户
          </Button>
        </CardActions>
        <Alert
          severity="warning"
          action={
            <>
              <Button color="inherit" size="small" onClick={() => this.handleDelete()}>
                确认
              </Button>
              <Button color="inherit" size="small" onClick={() => this.handleChangeDelete()}>
                取消
              </Button>
            </>
          }
          sx={{ display: this.state.Delete ? "block" : "none" }}
        >
          <AlertTitle>Warning</AlertTitle>
          确定要删除账户吗?
        </Alert>
      </Card>
    );
  }
}
