import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Container } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import GameList from "../components/GameList";

const cookies = new Cookies();

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    axios
      .get(Api(`/histories`), {
        user_id: cookies.get("uid"),
      })
      .then(
        (response) => {
          this.setState({ games: response.data.data });
          console.log(response.data.data.game_info);
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
