import React, { Component } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ProfileCard from "../components/ProfileCard";
import SquareCard from "../components/SquareCard";

export default class Profile extends Component {
  uid = this.props.uid;

  render() {
    return (
      <Container sx={{ mt: 12 }} component="main" maxWidth="md">
        <Typography component="div" variant="h3">
          个人空间
        </Typography>
        <Stack direction="row" spacing={2} sx={{ border: 1 }}>
          <ProfileCard uid={this.uid} />
          <Stack xs={6} sx={{ border: 1 }}>
            <Typography component="div" variant="h3">
              我的收藏
            </Typography>
            <Typography component="div" variant="h3">
              我的上传
            </Typography>
          </Stack>
        </Stack>
      </Container>
    );
  }
}
