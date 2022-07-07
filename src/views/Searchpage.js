import React, { Component } from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import GameList from "../components/GameList";
import { withParams, withNavigate } from "../utils/RouterTool";

class Searchpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:4523/m1/1221635-0-default/games", {
        params: { tag_id: this.props.params.searchParams },
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
    const { games } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <GameList games={games} />
      </Container>
    );
  }
}
export default withParams(Searchpage);
