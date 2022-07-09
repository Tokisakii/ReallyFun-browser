import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import History from "../components/History";
import Api from "../utils/Api";

const theme = createTheme();

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      passwd: "",
    };
  }

  handleLogin() {
    axios
      .post(Api(`/user/login`), {
        params: {
          name: this.state.uid,
          password: this.state.passwd,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("handleLogin", this.state.uid, this.state.passwd);
    this.props.onLogin(this.state.uid);
    History.replace({ pathname: "/", state: {} });
    History.go(0);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ mt: 12 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登录
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="用户名"
                name="name"
                autoComplete="name"
                autoFocus
                value={this.state.uid}
                onChange={(ev) => this.setState({ uid: ev.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.passwd}
                onChange={(ev) => this.setState({ passwd: ev.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => this.handleLogin()}
              >
                登录
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    忘记密码？
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    没有账号？点击注册
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default LogIn;
