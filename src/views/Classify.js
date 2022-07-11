import React from "react";
import { Container, Grid } from "@mui/material";
import ClippedDrawer from "../components/Drawer";
import SquareCard from "../components/SquareCard";

export default class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  handleSaveGames(value) {
    this.setState({ games: value });
  }

  render() {
    // const { games } = this.state;
    return (
      <>
        <ClippedDrawer onSaveGames={(value) => this.handleSaveGames(value)} />
        <Container maxWidth="md" component="main">
          <Grid container sx={{ mt: 10 }} spacing={2}>
            {this.state.games.map((gamesObj) => (
              // <RectangleCard gamesObj={gamesObj} />
              <SquareCard gamesObj={gamesObj} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}
