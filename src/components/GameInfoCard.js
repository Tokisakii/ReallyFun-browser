import * as React from "react";
import {
  Alert,
  Button,
  Checkbox,
  Card,
  CardContent,
  CardMedia,
  FormControlLabel,
  TextField,
  Grid,
  Snackbar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import Api from "../utils/Api";

export default class GameInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      create: 0,
      change: false,
      id: "",
      title: "",
      intro: "",
      tutorial: "",
      entry: "",
      bundle: "",
      thumb: "",
      hidden: false,
      delete: false,
      open: false,
    };
  }

  componentDidMount() {
    if (this.props.create === 0) {
      this.setState({ id: this.props.id });
      axios
        .get(Api(`/game/`), {
          params: {
            id: this.state.id,
          },
        })
        .then(
          (response) => {
            this.setState({
              title: response.data.data.title,
              intro: response.data.data.intro,
              entry: response.data.data.entry,
              bundle: response.data.data.bundle,
              thumb: response.data.data.thumb,
              hidden: response.data.data.is_hidden,
            });
          },
          (error) => {
            console.log("fail", error);
          }
        );
    } else {
      this.setState({ create: 1 });
    }
  }

  setStateTitle(e) {
    this.setState({ title: e.target.value });
  }

  setStateIntro(e) {
    this.setState({ intro: e.target.value });
  }

  setStateTutorial(e) {
    this.setState({ tutorial: e.target.value });
  }

  setStateEntry(e) {
    this.setState({ entry: e.target.value });
  }

  setStateBundle(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        bundle: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  setStateThumb(e) {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        thumb: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  setStateChange() {
    this.setState({ change: true });
  }

  changeHidden() {
    const temp = this.state.hidden;
    this.setState({ hidden: !temp });
  }

  changeDelete() {
    const temp = this.state.delete;
    this.setState({ delete: !temp, open: true });
  }

  handleCreateGame() {
    axios
      .post(Api(`/game`), {
        params: {
          title: this.state.title,
          intro: this.state.intro,
          tutorial: this.state.tutorial,
          entry: this.state.entry,
          bundle: this.state.bundle,
          thumb: this.state.thumb,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUploadBundle() {
    axios
      .post(Api(`/game/bundle`), {
        params: { id: 1, entry: this.state.entry, bundle: this.state.bundle },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUploadThumb() {
    axios
      .post(Api(`/game/thumb`), {
        params: { id: 1, thumb: this.state.thumb },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit() {
    this.handleUploadBundle();
    this.handleUploadThumb();
    this.setState({ change: false });
    window.location.reload();
  }

  handleDelete() {
    axios
      .delete(Api(`/game/`), {
        params: {
          id: this.state.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { gamesObj } = this.props;
    return (
      <Grid item xs={12}>
        <Card sx={{ maxWidth: "md" }}>
          <Grid container>
            <Grid item xs={8}>
              <CardContent height="150" width="450">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)}
                      required
                      fullWidth
                      id="gamename"
                      label="游戏名称"
                      value={this.state.title}
                      variant="standard"
                      onChange={(e) => this.setStateTitle(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)}
                      required
                      fullWidth
                      multiline
                      maxRows={2}
                      id="intro"
                      label="游戏简介"
                      value={this.state.intro}
                      onChange={(e) => this.setStateIntro(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)}
                      required
                      fullWidth
                      multiline
                      maxRows={2}
                      id="tutorial"
                      label="游戏玩法"
                      value={this.state.tutorial}
                      onChange={(e) => this.setStateTutorial(e)}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)}
                      required
                      fullWidth
                      id="entry"
                      label="入口文件路径"
                      value={this.state.entry}
                      variant="standard"
                      onChange={(e) => this.setStateEntry(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Button
                          disabled={!(this.state.change || this.state.create)}
                          variant="contained"
                          component="label"
                        >
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => this.setStateThumb(e)}
                          />
                          上传缩略图
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          disabled={!(this.state.change || this.state.create)}
                          variant="contained"
                          component="label"
                        >
                          <input
                            type="file"
                            hidden
                            accept=".zip"
                            onChange={(e) => this.setStateBundle(e)}
                          />
                          上传源文件
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.hidden}
                              onChange={() => this.changeHidden()}
                              inputProps={{ "aria-label": "controlled" }}
                              size="small"
                            />
                          }
                          disabled={!(this.state.change || this.state.create)}
                          label="是否隐藏"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => this.handleCreateGame()}
                          sx={{ display: this.state.create ? "block" : "none" }}
                        >
                          提交创建
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => this.setStateChange()}
                          sx={{
                            display: this.state.change || this.state.create ? "none" : "block",
                          }}
                        >
                          修改信息
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => this.handleSubmit()}
                          sx={{ display: this.state.change ? "block" : "none" }}
                        >
                          提交修改
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => this.changeDelete()}
                          sx={{
                            display: this.state.change || this.state.create ? "none" : "block",
                          }}
                        >
                          删除游戏
                        </Button>
                        <Snackbar open={this.state.open} autoHideDuration={6000}>
                          {/* <Snackbar autoHideDuration={6000}> */}
                          <Alert
                            severity="warning"
                            action={
                              <>
                                <Button
                                  color="inherit"
                                  size="small"
                                  onClick={() => this.handleDelete()}
                                >
                                  确认
                                </Button>
                                <Button
                                  color="inherit"
                                  size="small"
                                  onClick={() => this.changeDelete()}
                                >
                                  取消
                                </Button>
                              </>
                            }
                            sx={{
                              display: this.state.delete ? "block" : "none",
                            }}
                          >
                            <div>确定要此游戏吗?</div>
                          </Alert>
                        </Snackbar>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                // height="200"
                // width="200"
                image={this.state.thumb}
                alt={this.state.title}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}
