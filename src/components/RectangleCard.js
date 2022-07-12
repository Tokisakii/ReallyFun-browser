import * as React from "react";
import {
  Stack,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";
import Reating2show from "./Rating2show";

// 长方形卡片，用于展示游戏标题、简介、缩略图、评分等信息
export default class RectangleCard extends React.Component {
  render() {
    const { gamesObj } = this.props;
    return (
      <Grid item xs={12}>
        <CardActionArea onClick={() => console.log("handleInfor")}>
          <Card sx={{ maxWidth: "md" }}>
            <Grid container>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  image={gamesObj.thumb}
                  alt={gamesObj.title}
                />
              </Grid>
              <Grid item xs={9}>
                <CardContent height="150" width="450">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h6" component="div">
                        {gamesObj.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body4"
                        color="text.secondary"
                        component="div"
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {gamesObj.intro}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={8}>
                      <Stack direction="row" spacing={1}>
                        {gamesObj.tags.map((tags) => (
                          // <RectangleCard gamesObj={gamesObj} />
                          <Chip label={tags.content} />
                        ))}
                      </Stack>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Stack direction="row">
                        <Reating2show value={gamesObj.rating / 2} />
                        <Typography variant="body5" color="text.secondary">
                          {gamesObj.rating}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </CardActionArea>
      </Grid>
    );
  }
}
