import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Grid,
  Button,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      gameId: "",
      content: "",
      open: "",
    };
  }

  feedbackList = [
    "游戏白屏",
    "游戏加载很慢",
    "游戏玩不了",
    "游戏存在BUG",
    "游戏评分无法提交",
    "游戏页面错误",
    "色情暴力内容",
    "其他问题",
  ];

  setStateGameId(e) {
    this.setState({ gameId: e.target.value });
  }

  setStateContent(e) {
    this.setState({ content: e.target.value });
  }

  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };

  handleForm() {
    axios
      .post(Api(`/feedback`), {
        params: {
          game_id: this.state.gameId, // 游戏Id
          category: this.state.type, // 反馈类型
          content: this.state.content, // 反馈内容
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ open: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Container maxWidth="sm" component="main" sx={{ mt: 10 }}>
        <Grid container spacing={2} align="center">
          <Grid item xs={12}>
            <FormControl>
              {/* 通过单选确定反馈类型 */}
              <FormLabel id="demo-radio-buttons-group-label">反馈类型</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                name="radio-buttons-group"
                onChange={(e) => this.handleChange(e)}
              >
                {/* 利用Grid进行排版，间距为2，左对齐 */}
                <Grid container spacing={2} sx={{ textAlign: "left" }}>
                  <Grid item xs={6}>
                    <FormControlLabel value="0" control={<Radio />} label={this.feedbackList[0]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="1" control={<Radio />} label={this.feedbackList[1]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="2" control={<Radio />} label={this.feedbackList[2]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="3" control={<Radio />} label={this.feedbackList[3]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="4" control={<Radio />} label={this.feedbackList[4]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="5" control={<Radio />} label={this.feedbackList[5]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="6" control={<Radio />} label={this.feedbackList[6]} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel value="7" control={<Radio />} label={this.feedbackList[7]} />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} align="center">
              <Grid item xs={12}>
                {/* 接收反馈游戏Id */}
                <TextField
                  id="game-id"
                  label="游戏id"
                  fullWidth
                  value={this.state.gameId}
                  placeholder="需要反馈的游戏id"
                  multiline
                  onChange={(e) => this.setStateGameId(e)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* 接收问题描述 */}
                <TextField
                  id="outlined-multiline-static"
                  label="问题描述"
                  value={this.state.content}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="请详细描述您遇到的问题"
                  onChange={(e) => this.setStateContent(e)}
                />
              </Grid>
              <Grid item xs={12}>
                {/* 点击按钮提交反馈 */}
                <Button variant="contained" onClick={() => this.handleForm()}>
                  提交
                </Button>
              </Grid>
            </Grid>
            {/* 消息条用于向用户展示反馈情况 */}
            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={() => this.handleClose()}
            >
              <Alert onClose={() => this.handleClose()} severity="success" sx={{ width: "100%" }}>
                反馈提交成功！
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
