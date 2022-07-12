import React, { Component } from "react";
import { Grid, Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import axios from "axios";
import Api from "../utils/Api";
import { withParams, withNavigate } from "../utils/RouterTool";
import RectangleCard from "../components/RectangleCard";

class Searchpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [], order: true, key: "rating" };
  }

  handelSort() {
    axios
      .get(Api(`/games`), {
        params: {
          search: this.props.params.searchParams,
          key: this.state.key,
          order: this.state.order,
        },
      })
      .then(
        (response) => {
          this.setState({ games: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  handleChangeKey(value) {
    if (value !== this.state.key) {
      this.setState({ key: value });
      this.handelSort();
    }
  }

  handleChangeOrder() {
    const temp = this.state.order;
    this.setState({ order: !temp });
    this.handelSort();
  }

  componentDidMount() {
    axios
      .get(Api(`/games`), {
        params: { tag_id: this.props.params.searchParams },
      })
      .then(
        (response) => {
          this.setState({ games: response.data.data });
        },
        (error) => {
          console.log("fail", error);
        }
      );
  }

  render() {
    const { games } = this.state;
    return (
      <Container component="main" maxWidth="md">
        <Grid container sx={{ mt: 10 }}>
          <Grid xs={6}>
            {/* 用于排列搜索结果 */}
            <ToggleButtonGroup exclusive aria-label="SortBy" size="small">
              <ToggleButton
                value="rate"
                aria-label="SortByRate"
                onClick={(ev) => this.handleChangeKey(ev.target.value)}
              >
                评分
              </ToggleButton>
              <ToggleButton
                value="time"
                aria-label="SortByTime"
                onClick={(ev) => this.handleChangeKey(ev.target.value)}
              >
                上传时间
              </ToggleButton>
              <ToggleButton
                value="favorite"
                aria-label="SortByFavorite"
                onClick={(ev) => this.handleChangeKey(ev.target.value)}
              >
                收藏人数
              </ToggleButton>
              <ToggleButton
                value="order"
                aria-label="ChangeOrder"
                onClick={() => this.handleChangeOrder()}
              >
                <ImportExportIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {games.map((gamesObj) => (
            <RectangleCard gamesObj={gamesObj} />
          ))}
        </Grid>
      </Container>
    );
  }
}
export default withParams(Searchpage);
