import * as React from "react";
import { Rating, Stack } from "@mui/material";

// 用于展示游戏评分
export default function Rating2show({ value }) {
  return (
    <Stack spacing={0}>
      {/* 精度为0.1，只读 */}
      <Rating value={value} precision={0.1} size="small" readOnly />
    </Stack>
  );
}
