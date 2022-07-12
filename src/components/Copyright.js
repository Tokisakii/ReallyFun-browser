import * as React from "react";
import { Typography, Link } from "@mui/material";

// 用于展示页脚部分连接，存在问题：无法正常显示在页脚部分
export default function Copyright() {
  return (
    <footer>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        {/* 返回主页 */}
        <Link color="inherit" href="/">
          Reallyfun
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {/* 跳转到反馈界面 */}
        <Link color="inherit" href="/feedback">
          反馈问题
        </Link>
      </Typography>
    </footer>
  );
}
