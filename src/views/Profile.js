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

// 个人空间，用于展示及修改个人资料、游玩历史、收藏、上传等
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
    // get当前用户收藏的游戏
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
    // get当前用户上传的游戏
    axios
      .get(Api(`/games`), {
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
    // get当前用户的游玩历史
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
              {/* 展示游玩历史 */}
              <Grid container spacing={2}>
                {this.state.history.map((historyObj) => (
                  <Grid item xs={2}>
                    <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
                      <CardActionArea onClick={() => console.log("handleInfor")}>
                        <CardMedia
                          component="img"
                          height="100"
                          width="150"
                          image={historyObj.game.thumb}
                          alt={historyObj.game.title}
                        />
                        <CardContent height="50" width="150" align="center">
                          <div>{historyObj.game.title}</div>
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
