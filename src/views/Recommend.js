import React, { Component } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import GameList from "../components/GameList";

export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    axios
      .get(Api(`/games`), {
        key: "favorite",
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
      <Container component="main" maxWidth="md">
        <GameList games={this.state.games} />
      </Container>
    );
  }
}
