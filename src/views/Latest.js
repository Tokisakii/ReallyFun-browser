import React, { Component } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import RectangleCard from "../components/RectangleCard";

// 用于展示最新上线的游戏
export default class Latest extends Component {
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
          key: "time",
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
            <RectangleCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
