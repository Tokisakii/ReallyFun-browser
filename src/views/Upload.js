import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import GameInfoCard from "../components/GameInfoCard";

const cookies = new Cookies();

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  // 从cookies中获取当前用户uid，返回由该用户上传的游戏
  componentDidMount() {
    axios
      .get(Api(`/games`), {
        params: {
          user_id: cookies.get("uid"),
        },
      })
      .then(
        (response) => {
          this.setState({ games: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            上传游戏
          </Typography>
          {/* create用于鉴别该卡片是否为创建游戏卡片 */}
          <GameInfoCard create={1} />
        </Grid>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            我的上传
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {this.state.games.map((gamesObj) => (
            // <RectangleCard gamesObj={gamesObj} />
            // 使用GameInfoCard组件展示已上传游戏的信息，create为0表示该卡片不是创建游戏卡片
            <GameInfoCard gamesObj={gamesObj} create={0} />
          ))}
        </Grid>
      </Container>
    );
  }
}
