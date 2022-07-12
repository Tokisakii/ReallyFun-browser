import React from "react";
import { Card, CardContent, CardMedia, CardActionArea, Grid } from "@mui/material";

// 正方形卡片，仅显示游戏图标、标题信息
export default class SquareCard extends React.Component {
  render() {
    const { gamesObj } = this.props;
    return (
      <Grid item xs={2}>
        <Card sx={{ maxWidth: 150, maxHeight: 150 }}>
          <CardActionArea onClick={() => console.log("handleInfor")}>
            <CardMedia
              component="img"
              height="100"
              width="150"
              image={gamesObj.thumb}
              alt={gamesObj.title}
            />
            <CardContent height="50" width="150" align="center">
              {gamesObj.title}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}
