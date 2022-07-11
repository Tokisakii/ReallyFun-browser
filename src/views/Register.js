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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import History from "../components/History";
import Api from "../utils/Api";

const theme = createTheme();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      passwd: "",
    };
  }

  handleRegister() {
    axios
      .post(Api(`/user/register`), {
        params: {
          name: this.state.id,
          password: this.state.passwd,
          email: this.state.email,
        },
      })
      .then((response) => {
        console.log(response.message);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("handleRegister", this.state.id, this.state.email, this.state.passwd);
    History.replace({ pathname: "/login", state: {} });
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
              注册
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="用户名"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={this.state.id}
                    onChange={(ev) => this.setState({ id: ev.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="邮箱地址"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={(ev) => this.setState({ email: ev.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => this.handleRegister()}
              >
                注册
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    已有账号？点击登录
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

export default Register;
