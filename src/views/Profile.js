import React, { Component } from "react";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import SquareCard from "../components/SquareCard";

import Api from "../utils/Api";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      favoriteGames: [],
      uploadedGames: [],
      // historyGames: [],
    };
  }

  handleGetUid(value) {
    this.setState({ uid: value });
  }

  componentDidMount() {
    this.handleGetUid(this.props.uid);
    axios
      .get(Api(`/favorites`), {
        params: {
          user_id: this.state.uid,
        },
      })
      .then(
        (response) => {
          this.setState({ favoriteGames: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
    axios
      .get(Api(`/favorites`), {
        params: {
          user_id: this.state.uid,
        },
      })
      .then(
        (response) => {
          this.setState({ uploadedGames: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
    // axios
    //   .get(Api(`/histories`), {
    //     user_id: this.state.uid,
    //   })
    //   .then(
    //     (response) => {
    //       this.setState({ historyGames: response.data.data });
    //     },
    //     (error) => {
    //       console.log("fail", error);
    //     }
    //   );
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            个人空间
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <ProfileCard uid={this.uid} />
            </Grid>
            {/* <Grid item xs={12}>
              <Typography component="div" variant="h3">
                游玩历史
              </Typography>
              <Grid container spacing={2}>
                {this.state.historyGames.map((gamesObj) => (
                  // <RectangleCard gamesObj={gamesObj} />
                  <SquareCard gamesObj={gamesObj} />
                ))}
              </Grid>
            </Grid> */}
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                我的收藏
              </Typography>
              <Grid container spacing={2}>
                {this.state.favoriteGames.map((gamesObj) => (
                  // <RectangleCard gamesObj={gamesObj} />
                  <SquareCard gamesObj={gamesObj} />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                我的上传
              </Typography>
              <Grid container spacing={2}>
                {this.state.uploadedGames.map((gamesObj) => (
                  // <RectangleCard gamesObj={gamesObj} />
                  <SquareCard gamesObj={gamesObj} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
