import * as React from "react";
import { Typography, Link } from "@mui/material";

export default function Copyright(props) {
  return (
    <footer>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Reallyfun
        </Link>{" "}
        {new Date().getFullYear()}
        {/* {"."} */}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        <Link color="inherit" href="/">
          反馈问题
        </Link>
      </Typography>
    </footer>
  );
}
