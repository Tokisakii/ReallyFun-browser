import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import RectangleCard from "../components/RectangleCard";

const cookies = new Cookies();

// 收藏页面，用于展示用户收藏的游戏
export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  // 初始化获取用户收藏的游戏
  componentDidMount() {
    axios
      .get(Api(`/favorites`), {
        params: {
          user_id: cookies.get("uid"),
        },
      })
      .then(
        (response) => {
          this.setState({ games: response.data.data });
          console.log(this.state.games);
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  render() {
    return (
      <Container maxWidth="md" component="main">
        <Grid container sx={{ mt: 10 }} spacing={2}>
          {this.state.games.map((gamesObj) => (
            // 使用长方形游戏卡片进行展示
            <RectangleCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
