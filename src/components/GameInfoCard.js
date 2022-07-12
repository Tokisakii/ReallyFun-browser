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
import axios from "axios";
import Api from "../utils/Api";

export default class GameInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      create: 0, // 是否为新建游戏卡片：0为已上传游戏卡片，1为新建游戏卡片
      change: false, // 判定是否修改游戏详情
      id: "", // 游戏id
      title: "", // 游戏标题
      intro: "", // 游戏介绍
      tutorial: "", // 游戏玩法
      entry: "", // 游戏入口文件
      bundle: "", // 游戏源文件
      thumb: "", // 游戏缩略图
      hidden: false, // 是否隐藏游戏
      delete: false, // 是否删除游戏
      open: false, // 是否打开消息条
    };
  }

  // 初始化：若不是新建游戏卡片，则get该游戏id对应的详细信息；否则将this.state.create设为1
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

  // 创建游戏并刷新当前页面
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

  // 上传游戏源文件
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

  // 上传游戏缩略图
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

  // 提交修改并刷新页面
  handleSubmit() {
    this.handleUploadBundle();
    this.handleUploadThumb();
    this.setState({ change: false });
    window.location.reload();
  }

  // 删除当前id对应游戏并刷新页面
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
    return (
      <Grid item xs={12}>
        <Card sx={{ maxWidth: "md" }}>
          <Grid container>
            <Grid item xs={8}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)}
                      required // 必填
                      fullWidth // 全宽度
                      id="gamename"
                      label="游戏名称"
                      value={this.state.title}
                      variant="standard"
                      onChange={(e) => this.setStateTitle(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!(this.state.change || this.state.create)} // 非修改和创建状态下无法修改
                      required
                      fullWidth
                      multiline
                      maxRows={2} // 最大显示行数为2
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
                            accept="image/*" // 接收所有image文件
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
                            accept=".zip" // 只接受.zip文件
                            onChange={(e) => this.setStateBundle(e)}
                          />
                          上传源文件
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel
                          control={
                            // Checkbox组件用于展示当前游戏是否被隐藏
                            <Checkbox
                              checked={this.state.hidden}
                              onChange={() => this.changeHidden()}
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
                          sx={{ display: this.state.create ? "block" : "none" }} // 仅在创建模式下显示
                        >
                          提交创建
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => this.setStateChange()}
                          sx={{
                            display: this.state.change || this.state.create ? "none" : "block", // 仅在修改模式下显示
                          }}
                        >
                          修改信息
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => this.handleSubmit()}
                          sx={{ display: this.state.change ? "block" : "none" }} // 修改信息完毕后用于提交
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
                        {/* 消息条用于提示用户是否确实要删除游戏 */}
                        <Snackbar open={this.state.open} autoHideDuration={6000}>
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
              {/* 用于展示缩略图 */}
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
