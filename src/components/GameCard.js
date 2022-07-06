import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function GameCard(props) {
  return (
    <Card sx={{ maxWidth: 80, maxHeight: 100 }}>
      <CardActionArea>
        <CardMedia component="img" height="80" image={props.thumb} alt={props.title} />
        <CardContent>
          <Typography gutterBottom variant="body5" component="div">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
