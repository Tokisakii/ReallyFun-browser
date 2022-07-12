import React, { Component } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import RectangleCard from "../components/RectangleCard";
import Api from "../utils/Api";

// 根据收藏数获取游戏列表
export default class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    axios
      .get(Api(`/games`), {
        params: {
          key: "favorite",
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
            // <RectangleCard gamesObj={gamesObj} />
            <RectangleCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
