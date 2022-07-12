import React, { Component } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
} from "@mui/material";
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
      history: [],
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
    axios
      .get(Api(`/histories`), {
        user_id: this.state.uid,
      })
      .then(
        (response) => {
          this.setState({ history: response.data.data });
          console.log(response.data.data);
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
            个人空间
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <ProfileCard uid={this.state.uid} />
            </Grid>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                <Link href="/history">游玩历史</Link>
              </Typography>
              <Grid container spacing={2}>
                {this.state.history.map((historyObj) => (
                  // <RectangleCard gamesObj={gamesObj} />
                  <Grid item xs={2}>
                    <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
                      <CardActionArea onClick={() => console.log("handleInfor")}>
                        <CardMedia
                          component="img"
                          height="100"
                          width="150"
                          image={historyObj.game_info.thumb}
                          alt={historyObj.game_info.title}
                        />
                        <CardContent height="50" width="150">
                          <div>{historyObj.game_info.title}</div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                <Link href="/collection">我的收藏</Link>
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
                <Link href="/upload">我的上传</Link>
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
