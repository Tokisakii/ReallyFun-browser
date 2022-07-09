import React, { Component } from "react";
import { Grid, Container } from "@mui/material";
import axios from "axios";
import { withParams, withNavigate } from "../utils/RouterTool";
import RectangleCard from "../components/RectangleCard";

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
        <Grid container sx={{ mt: 10 }} spacing={2}>
          {games.map((gamesObj) => (
            <RectangleCard gamesObj={gamesObj} />
            // <SquareCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
export default withParams(Searchpage);
