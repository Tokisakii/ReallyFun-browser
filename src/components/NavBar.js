import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ForumIcon from "@mui/icons-material/Forum";
import Searchbar from "./Searchbar";
import History from "./History";

const pages = [
  { label: "首页", to: "/" },
  { label: "热门推荐", to: "/recommend" },
  { label: "最新上线", to: "/latest" },
];
const settings = [
  { label: "个人空间", to: "/profile" },
  { label: "我的收藏", to: "/collection" },
  { label: "游玩历史", to: "/history" },
  { label: "上传游戏", to: "/upload" },
];

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
    };
  }

  setAnchorElNav(value) {
    this.setState({ anchorElNav: value });
  }

  setAnchorElUser(value) {
    this.setState({ anchorElUser: value });
  }

  async handleLogout() {
    console.log("handleLogout");
    this.props.onLogout();
    History.replace({ pathname: "/login", state: {} });
    History.go(0);
  }

  handleOpenNavMenu(event) {
    console.log("handleOpenNavMenu");
    this.setAnchorElNav(event.currentTarget);
  }

  handleOpenUserMenu(event) {
    console.log("handleOpenUserMenu");
    this.setAnchorElUser(event.currentTarget);
  }

  handleCloseNavMenu() {
    console.log("handleCloseNavMenu");
    this.setAnchorElNav(null);
  }

  handleCloseUserMenu() {
    console.log("handleCloseUserMenu");
    this.setAnchorElUser(null);
  }

  renderMD() {
    return (
      <>
        {/* MD LOGO */}
        <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        {/* MD REALLYFUN */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          游点好玩
        </Typography>
        {/* MD ITEMS */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {this.props.uid !== null &&
            pages.map(({ label, to }) => (
              <Button
                key={label}
                onClick={(ev) => this.handleCloseNavMenu(ev)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                component={Link}
                to={to}
              >
                {label}
              </Button>
            ))}
        </Box>
      </>
    );
  }

  renderXS() {
    return (
      <>
        {/* XS MENU ICON */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(ev) => this.handleOpenNavMenu(ev)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {this.props.uid !== null && (
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(this.state.anchorElNav)}
              onClose={(ev) => this.handleCloseNavMenu(ev)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, to }) => (
                <MenuItem
                  key={label}
                  onClick={(ev) => this.handleCloseNavMenu(ev)}
                  component={Link}
                  to={to}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Box>
        {/* XS LOGO */}
        <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        {/* XS REALLYFUN */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          // href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            // fontFamily: "monospace",
            fontWeight: 700,
            // letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          游点好玩
        </Typography>
      </>
    );
  }

  renderAvatar() {
    return (
      <>
        {/* MD & XS AVATAR */}
        {this.props.uid !== null ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(ev) => this.handleOpenUserMenu(ev)} sx={{ p: 0 }}>
                <Avatar>{this.props.uid}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={(ev) => this.handleCloseUserMenu(ev)}
            >
              {settings.map(({ label, to }) => (
                <MenuItem
                  key={label}
                  onClick={(ev) => this.handleCloseUserMenu(ev)}
                  component={Link}
                  to={to}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                key="logout"
                onClick={(ev) => {
                  this.handleCloseUserMenu(ev);
                  this.handleLogout();
                }}
              >
                <Typography textAlign="center">注销</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            key="Login"
            onClick={(ev) => this.handleCloseNavMenu(ev)}
            sx={{
              my: 2,
              color: "white",
              display: "block",
            }}
            component={Link}
            to="/login"
            // to="/signin"
          >
            登录
          </Button>
        )}
      </>
    );
  }

  render() {
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {this.renderMD()}
            {this.renderXS()}
            <Searchbar />
            {this.renderAvatar()}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default NavBar;
