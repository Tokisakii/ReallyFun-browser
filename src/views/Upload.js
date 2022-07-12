import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import RectangleCard from "../components/RectangleCard";

const cookies = new Cookies();

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

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
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            上传游戏
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            我的上传
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {this.state.games.map((gamesObj) => (
            // <RectangleCard gamesObj={gamesObj} />
            <RectangleCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
