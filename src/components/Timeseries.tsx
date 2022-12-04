import { FC, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import type { TimeseriesItem } from "../services";
import moment from "moment";

type TimeseriesProps = {
  data: Array<TimeseriesItem>;
};

export const Timeseries: FC<TimeseriesProps> = ({ data }) => {
  return (
    <Box flex="1" display="flex" flexDirection="column" height="100%">
      <Typography>Asset Performance</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dot={false} dataKey="close" stroke="#cc7777" />
          <Line
            type="monotone"
            dot={false}
            activeDot={false}
            dataKey="open"
            stroke="#77cc77"
          />
          <Line
            type="monotone"
            dot={false}
            activeDot={false}
            dataKey="low"
            stroke="#dddddd"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dot={false}
            activeDot={false}
            dataKey="high"
            stroke="#dddd00"
            strokeDasharray="5 5"
          />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => moment(value).format("MM-DD-YYYY")}
          />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
