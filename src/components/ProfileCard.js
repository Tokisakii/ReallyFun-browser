import React, { Component } from "react";
import {
  Alert,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Button,
  IconButton,
  ButtonGroup,
  Snackbar,
  InputLabel,
  TextField,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import Api from "../utils/Api";

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Changeinfo: false, // 是否修改信息
      Changepassword: false, // 是否修改密码
      Delete: false, // 是否进行删除操作
      id: "",
      name: "",
      // newname: "",
      email: "",
      avatar: "",
      // newavatar: "",
      auth: "",
      // newauth: "",
      oldpassword: "",
      newpassword: "",
      open: false, // 消息栏的弹出
      // showPassword: false,
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.uid });
    axios
      .get(Api(`/user/`), {
        params: { id: this.state.id },
      })
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

  handleChangeInfo() {
    const temp = this.state.Changeinfo;
    this.setState({ Changeinfo: !temp });
  }

  handleChangeDelete() {
    const temp = this.state.Delete;
    this.setState({ Delete: !temp, open: true });
  }

  handleChangePassword() {
    const temp = this.state.Changepassword;
    this.setState({ Changepassword: !temp });
  }

  setStateOldPassword(e) {
    this.setState({ oldpassword: e.target.value });
  }

  setStateNewPassword(e) {
    this.setState({ newpassword: e.target.value });
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
        params: {
          avatar: this.state.avatar,
        },
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

  // handleUpdateName() {
  //   axios
  //     .post(Api(`/user/name`), {
  //       name: this.state.name,
  //     })
  //     .then((response) => {
  //       if (response.data.code === 0) {
  //         console.log(response.data);
  //         const temp = this.state.name;
  //         this.setState({
  //           name: temp,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  handleSubmit() {
    // this.handleUpdateName();
    this.handleUploadAvatar();
    this.setState({ Changeinfo: false, Changepassword: false });
  }

  handleDelete() {
    axios
      .patch(Api(`/user/name`), {
        params: {
          name: this.state.uid,
        },
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
      <Card>
        <Grid container>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              height="250"
              width="250"
              alt={this.state.name}
              image={this.state.avatar}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      disabled={!this.state.Changeinfo}
                      id="name"
                      label="用户名"
                      value={this.state.name}
                      variant="standard"
                      margin="dense"
                      onChange={(e) => this.setStateName(e)}
                    />
                    <FormHelperText sx={{ display: this.state.Changeinfo ? "block" : "none" }}>
                      3-32个字符,仅包含英文字母、数字和下划线
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="ID"
                      value={this.state.id}
                      variant="standard"
                      margin="dense"
                    />
                    <FormHelperText sx={{ display: this.state.Changeinfo ? "block" : "none" }}>
                      用户无法修改ID
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled={!this.state.Changeinfo}
                      id="Email"
                      label="Email"
                      value={this.state.email}
                      variant="standard"
                      margin="dense"
                      onChange={(e) => this.setStateEmail(e)}
                    />
                    <FormHelperText sx={{ display: this.state.Changeinfo ? "flex" : "none" }}>
                      形如xxx@yyy.com
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel variant="standard" htmlFor="auth">
                      管理权限
                    </InputLabel>
                    <Select
                      disabled={!this.state.Changeinfo}
                      variant="standard"
                      labelId="authlabel"
                      width={500}
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
                    <FormHelperText sx={{ display: this.state.Changeinfo ? "block" : "none" }}>
                      权限修改需经过管理员审核
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="oldpassword"
                      variant="standard"
                      type="password"
                      value={this.state.oldpassword}
                      disabled={!this.state.Changepassword}
                      onChange={(value) => this.setStateOldPassword(value)}
                      label={this.state.Changepassword ? "Old Password" : "Password"}
                      sx={{ display: this.state.Changeinfo ? "none" : "block" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="newpassword"
                      variant="standard"
                      type="password"
                      value={this.state.newpassword}
                      onChange={(value) => this.setStateNewPassword(value)}
                      label="New Password"
                      sx={{ display: this.state.Changepassword ? "block" : "none" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <CardActions>
              <IconButton
                color="primary"
                variant="contained"
                component="label"
                sx={{ display: this.state.Changeinfo ? "block" : "none" }}
              >
                <PhotoCamera />
                <input type="file" hidden onChange={(e) => this.setStateAvatar(e)} />
              </IconButton>
              <ButtonGroup
                variant="contained"
                size="small"
                sx={{
                  display: this.state.Changeinfo || this.state.Changepassword ? "none" : "block",
                }}
              >
                <Button onClick={() => this.handleChangeInfo()}>修改信息</Button>
                <Button onClick={() => this.handleChangePassword()}>修改密码</Button>
              </ButtonGroup>
              <Button
                size="small"
                onClick={() => this.handleSubmit()}
                color="success"
                variant="contained"
                // disabled={this.state.Readonly}
                sx={{
                  display: this.state.Changeinfo || this.state.Changepassword ? "block" : "none",
                }}
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
            <Snackbar open={this.state.open} autoHideDuration={6000}>
              {/* <Snackbar autoHideDuration={6000}> */}
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
                sx={{
                  display: this.state.Delete ? "block" : "none",
                }}
              >
                <div>确定要删除账户吗?</div>
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Card>
    );
  }
}
