import { FC } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import type { MetricsData } from "../services";
import moment from "moment";

type MetricsProps = MetricsData;

export const Metrics: FC<MetricsProps> = ({ data }) => {
  const { symbol, all_time_high, market_data } = data;

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Typography fontWeight={"bold"}>Historical Data</Typography>
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        padding={"24px"}
        marginTop="12px"
        alignItems="flex-start"
        minWidth={280}
        border="1px solid #555"
        borderRadius="7px"
      >
        <Typography
          marginY={"12px"}
        >{`Last trade: $${market_data.price_usd.toFixed(2)} ${moment(
          market_data.last_trade_at
        ).format("MM-DD-YYYY")}`}</Typography>
        <Typography
          marginY={"12px"}
        >{`Change: ${market_data.percent_change_usd_last_24_hours.toFixed(
          2
        )}%`}</Typography>
        <Typography marginY={"12px"}>{`High: $${all_time_high.price.toFixed(
          2
        )} ${moment(all_time_high.at).format("MM-DD-YYYY")}`}</Typography>
        <Typography marginY={"12px"}>{`Volume: ${Math.round(
          market_data.volume_last_24_hours
        )}`}</Typography>
      </Box>
    </Box>
  );
};
