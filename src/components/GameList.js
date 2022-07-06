import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, CardActionArea, Grid } from "@mui/material";
import Reating2show from "./Rating2show";

export default class GameList extends React.Component {
  render() {
    const { games } = this.props;
    return (
      <Grid container sx={{ mt: 12 }}>
        {games.map((gamesObj) => (
          <Grid
            item
            xs={6}
            sx={{
              height: 0.5,
            }}
          >
            <CardActionArea onClick={() => console.log("handleInfor")}>
              <Card sx={{ maxWidth: "md" }}>
                <Stack direction="row">
                  <CardMedia
                    component="img"
                    image={gamesObj.thumb}
                    alt="logo"
                    sx={{
                      width: 0.2,
                    }}
                  />
                  <CardContent
                    sx={{
                      width: 0.8,
                    }}
                  >
                    <Stack direction="column" item>
                      <Typography gutterBottom variant="h6" component="div">
                        {gamesObj.title}
                      </Typography>
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
                      <Stack direction="row">
                        <Reating2show value={gamesObj.rating / 2} />
                        <Typography variant="body5" color="text.secondary">
                          {gamesObj.rating}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    );
  }
}
