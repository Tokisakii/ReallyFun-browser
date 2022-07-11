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

  getAllFeedbacks() {
    axios
      .get(Api(`/feedbacks`), {
        params: { page_size: 100, page_num: 1 },
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

  componentDidMount() {
    this.getAllFeedbacks();
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Typography component="div" variant="h5">
          反馈列表
        </Typography>
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
        <Grid container spacing={2}>
          {this.state.feedbacklist.map((feedback) => (
            <FeedbackCard feedback={feedback} />
          ))}
        </Grid>
      </Container>
    );
  }
}
