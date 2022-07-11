import React from "react";
import { Container, Grid } from "@mui/material";

export default class Home extends React.Component {
  render() {
    return (
      <Container maxWidth="lg" component="main">
        <Grid container sx={{ mt: 10 }} spacing={2}>
          首页
        </Grid>
      </Container>
    );
  }
}
