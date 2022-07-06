import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
  handlegame() {
    axios.get(Api(`/games?key=&order=&search=&tag_id=2&withtag=1&page_size=&page_num=`)).then(
      (response) => {
        this.props.onSaveGames(response.data.data);
        console.log(response.data.data);
      },
      (error) => {
        console.log("fail", error);
      }
    );
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
                <ListItemButton>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;全部游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <ExtensionIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;益智游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <AccessibleForwardIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;动作游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <CatchingPokemonIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;射击游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <ChildCareIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消除游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
                  <ListItemIcon>
                    <SportsTennisIcon />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;休闲游戏
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => this.handlegame()}>
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
