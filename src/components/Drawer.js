import * as React from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ExtensionIcon from "@mui/icons-material/Extension";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import CasinoIcon from "@mui/icons-material/Casino";
import axios from "axios";
import Api from "../utils/Api";

const drawerWidth = 200;

export default class ClippedDrawer extends React.Component {
  handlegame(value) {
    axios.get(Api(`/games`), { params: { tag_id: value } }).then(
      (response) => {
        this.props.onSaveGames(response.data.data);
        console.log(response.data.data);
      },
      (error) => {
        console.log("fail", error);
      }
    );
  }

  componentDidMount() {
    this.handlegame();
  }

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全部游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(1)}>
                  <ListItemIcon>
                    <ExtensionIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;益智游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(2)}>
                  <ListItemIcon>
                    <AccessibleForwardIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;动作游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(3)}>
                  <ListItemIcon>
                    <CatchingPokemonIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;射击游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(4)}>
                  <ListItemIcon>
                    <ChildCareIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消除游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(5)}>
                  <ListItemIcon>
                    <SportsTennisIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;休闲游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame(6)}>
                  <ListItemIcon>
                    <CasinoIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;棋牌游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Box>
    );
  }
}
