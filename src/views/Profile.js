import React, { Component } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ProfileCard from "../components/ProfileCard";

export default class Profile extends Component {
  render() {
    return (
      <Container sx={{ mt: 12, border: 1 }} component="main" maxWidth="md">
        <Typography component="div" variant="h3">
          个人空间
        </Typography>
        <Stack direction="row" spacing={2} sx={{ border: 1 }}>
          <ProfileCard />
          <Stack xs={6} sx={{ border: 1 }}>
            <Stack>我的收藏</Stack>
            <Stack>我的上传</Stack>
          </Stack>
        </Stack>
      </Container>
    );
  }
}
