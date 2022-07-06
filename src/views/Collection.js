import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Stack, CardActionArea, Grid } from "@mui/material";
import axios from "axios";

const cookies = new Cookies();

export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
    this.handleGetRecommendGameList();
  }

  handleGetRecommendGameList() {
    axios
      .get("http://127.0.0.1:4523/m1/1221635-0-default/favorites", {
        user_id: cookies.get("uid"),
      })
      .then(
        (response) => {
          this.setState(response.data);
          console.log(this.state.games);
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  render() {
    return (
      <Grid container sx={{ mt: 12 }}>
        {this.state.games}
      </Grid>
    );
  }
}
