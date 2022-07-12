import React, { Component } from "react";
import { Paper, InputBase, IconButton, Container, Grid, Typography, Link } from "@mui/material";
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
      feedbacklist: [],
      gid: "",
      uid: "",
      games: [],
      hidden: true,
    };
  }

  setStateGid(e) {
    this.setState({ gid: e.target.value });
  }

  setStateUid(e) {
    this.setState({ uid: e.target.value });
  }

  setStateHidden() {
    this.setState({ hidden: false });
  }

  getUndoFeedbacks() {
    axios
      .get(Api(`/feedbacks`), {
        params: { page_size: 3, page_num: 1, handler_id: null },
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
    this.setStateHidden();
    console.log(this.state.games);
  }

  componentDidMount() {
    this.getUndoFeedbacks();
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Typography component="div" variant="h5">
          管理面板
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="div" variant="h5">
              修改用户信息
            </Typography>
          </Grid>
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
              <IconButton sx={{ p: "10px" }} onClick={() => this.getGameData()}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12}>
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
              <IconButton sx={{ p: "10px" }} onClick={() => this.getGameData()}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: this.state.hidden || this.state.games === null ? "none" : "block" }}
          >
            <GameInfoCard gamesObj={this.state.games} />
          </Grid>
          <Grid item xs={12}>
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
