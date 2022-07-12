import * as React from "react";
import Cookies from "universal-cookie";
import { Card, CardActions, CardContent, Button, Typography, Grid, TextField } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";

const cookies = new Cookies();

export default class FeedbackCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: cookies.get("uid"),
      handle_comment: "",
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

  handleSubmit() {
    axios
      .post(Api(`/feedback/handle`), {
        params: {
          id: this.state.id,
          handle_comment: this.state.handle_comment,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { feedback } = this.props;
    return (
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              No.{feedback.id}
            </Typography>
            <Typography variant="body1" component="div">
              来自id为{feedback.user_id}用户的反馈：
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary">
              在游戏编号{feedback.game_id}中:
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary">
              出现了{this.feedbackList[feedback.category]}的问题：
            </Typography>
            <Typography sx={{ mb: 1.5 }} variant="body2">
              详细描述：
              <br />
              {feedback.content}
            </Typography>
            <TextField
              id="standard-basic"
              label="处理意见"
              defaultValue={feedback.handle_comment}
              multiline // 多行
              rows={4} // 固定4行
              onChange={(ev) => this.setState({ handle_comment: ev.target.value })}
            />
            <Typography sx={{ mb: 1.5 }} variant="body2">
              处理人:{feedback.handler_id}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => this.handleSubmit()}>
              提交处理
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
