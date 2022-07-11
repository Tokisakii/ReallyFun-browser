import * as React from "react";
import { Rating, Stack } from "@mui/material";

export default function Rating2show({ value }) {
  return (
    <Stack spacing={0}>
      <Rating name="half-rating-read" value={value} precision={0.1} size="small" readOnly />
    </Stack>
  );
}
