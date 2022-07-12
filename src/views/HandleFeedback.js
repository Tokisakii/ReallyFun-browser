import React, { Component } from "react";
import { Container, Grid, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import FeedbackCard from "../components/FeedbackCard";

export default class HandleFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacklist: [],
    };
  }

  // 获取全部反馈
  getAllFeedbacks() {
    axios
      .get(Api(`/feedbacks`), {
        params: { page_size: 100, page_num: 1 },
      })
      .then((response) => {
        this.setState({
          feedbacklist: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 获取未处理的反馈
  getUndoFeedbacks() {
    axios
      .get(Api(`/feedbacks`), {
        params: { page_size: 100, page_num: 1, handler_id: null },
      })
      .then((response) => {
        this.setState({
          feedbacklist: response.data.data,
        });
        // console.log(this.state.feedbacklist);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 默认返回未处理反馈
  componentDidMount() {
    this.getUndoFeedbacks();
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Typography component="div" variant="h5">
          反馈列表
        </Typography>
        {/* 两个按钮，用于切换全部反馈以及未处理反馈 */}
        <ToggleButtonGroup exclusive aria-label="SortBy" size="small">
          <ToggleButton value="rate" aria-label="SortByRate" onClick={() => this.getAllFeedbacks()}>
            全部反馈
          </ToggleButton>
          <ToggleButton
            value="time"
            aria-label="SortByTime"
            onClick={() => this.getUndoFeedbacks()}
          >
            未处理反馈
          </ToggleButton>
        </ToggleButtonGroup>
        {/* 利用map将所有反馈通过FeedbackCard展示出来，间距为2 */}
        <Grid container spacing={2}>
          {this.state.feedbacklist.map((feedback) => (
            <FeedbackCard feedback={feedback} />
          ))}
        </Grid>
      </Container>
    );
  }
}
