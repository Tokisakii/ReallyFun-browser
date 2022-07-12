import React, { Component } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Container,
  Grid,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Api from "../utils/Api";
import FeedbackCard from "../components/FeedbackCard";
import GameInfoCard from "../components/GameInfoCard";
import ProfileCard from "../components/ProfileCard";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      feedbacklist: [], // 接收反馈列表
      gid: "", // 记录游戏id
      uid: "", // 记录用户id
      games: [], // 接收get返回的游戏信息
      hiddenuser: true, // 隐藏用户详情卡片
      hiddengame: true, // 隐藏游戏详情卡片
      open: false,
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  setStateGid(e) {
    this.setState({ gid: e.target.value });
  }

  setStateUid(e) {
    this.setState({ uid: e.target.value });
  }

  setStateHiddenUser() {
    this.setState({ hiddenuser: false });
  }

  setStateHiddenGame() {
    this.setState({ hiddengame: false });
  }

  getUndoFeedbacks() {
    axios
      .get(Api(`/feedbacks`), {
        params: { page_size: 3, page_num: 1, handler_id: null }, // 最多请求三个反馈，若要处理更多需要跳转至对应界面
      })
      .then((response) => {
        this.setState({
          feedbacklist: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getGameData() {
    axios.get(Api(`/game/`), { params: { id: this.state.gid } }).then(
      (response) => {
        this.setState({ games: [response.data.data] });
      },
      (error) => {
        console.log("fail", error);
      }
    );
    this.setStateHiddenGame(); // 解除游戏卡片隐藏
  }

  componentDidMount() {
    this.setState({ uid: this.props.uid });
    axios
      .get(Api(`/user/`), {
        params: { id: this.state.id },
      })
      .then((response) => {
        this.setState({
          // auth: response.data.data.auth,
          auth: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    if (this.state.auth === 0 || this.state.auth === 1) {
      this.setState({ open: true });
    }
    this.getUndoFeedbacks(); // 获取未处理的反馈列表
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={() => this.handleClose()}>
          <Alert onClose={() => this.handleClose()} severity="success" sx={{ width: "100%" }}>
            反馈提交成功！
          </Alert>
        </Snackbar>
        <Typography component="div" variant="h4">
          管理面板
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="div" variant="h5">
              修改用户信息
            </Typography>
          </Grid>
          {/* 搜索框 */}
          <Grid item xs={12}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="请输入用户ID"
                onChange={(e) => this.setStateUid(e)}
              />
              {/* 触发点击事件时解除隐藏用户卡片 */}
              <IconButton sx={{ p: "10px" }} onClick={() => this.setStateHiddenUser()}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {/* 用户卡片 */}
          <Grid
            item
            xs={12}
            sx={{ display: this.state.hiddenuser || this.state.uid === null ? "none" : "block" }}
          >
            <ProfileCard uid={this.state.uid} />
          </Grid>
          <Grid item xs={12}>
            <Typography component="div" variant="h5">
              修改游戏信息
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="请输入游戏ID"
                onChange={(e) => this.setStateGid(e)}
              />
              {/* 触发点击事件时获取对应游戏信息，并解除隐藏 */}
              <IconButton sx={{ p: "10px" }} onClick={() => this.getGameData()}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {/* 游戏卡片 */}
          <Grid
            item
            xs={12}
            sx={{ display: this.state.hiddengame || this.state.games === null ? "none" : "block" }}
          >
            <GameInfoCard gamesObj={this.state.games} create={0} />
          </Grid>
          <Grid item xs={12}>
            {/* 点击即可跳转到反馈处理界面 */}
            <Link href="/handlefeedback" variant="h5">
              处理反馈
            </Link>
          </Grid>
          <Grid container spacing={2}>
            {this.state.feedbacklist.map((feedback) => (
              <FeedbackCard feedback={feedback} />
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }
}
