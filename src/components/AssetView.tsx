import { useEffect, useState } from "react";
import { getMetricData, getTimeseriesData } from "../services";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Timeseries } from "./Timeseries";
import { Metrics } from "./Metrics";
import moment from "moment";

import type { TimeseriesData, MetricsData, TimeseriesItem } from "../services";

export const AssetView = () => {
  const assetId = "yfi";

  const [timeseriesData, setTimeseriesData] = useState<TimeseriesItem[]>();
  const [metricsData, setMetricsData] = useState<MetricsData["data"]>();
  const [assetData, setAssetData] = useState<{
    name: string;
    symbol: string;
  }>();

  useEffect(() => {
    // Get timeseries data
    const timeSeriesPromise = getTimeseriesData(assetId);
    timeSeriesPromise.then((response) =>
      response.json().then((result: TimeseriesData) => {
        const columns = result.data.parameters.columns;
        const timeseries = result.data.values;
        // Remap data to useful data structure - formatted date, rounded float values.
        const mappedTimeseries = timeseries.map((dataItem) => {
          const mappedData = columns.reduce((result, column, index) => {
            const value =
              column === "timestamp"
                ? moment(dataItem[index]).format("MM-DD-YYYY")
                : parseFloat(dataItem[index].toFixed(2));
            return { ...result, [column]: value };
          }, {} as TimeseriesItem);
          return mappedData;
        });
        setTimeseriesData(mappedTimeseries);
        setAssetData({ name: result.data.name, symbol: result.data.symbol });
      })
    );

    // Get metric data
    const metricsPromise = getMetricData(assetId);
    metricsPromise.then((response) =>
      response.json().then((result: MetricsData) => {
        setMetricsData(result.data);
      })
    );
  }, []);

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      color="#ddd"
      padding="24px"
    >
      {/* Asset Header */}
      <Box flex="1" display="flex" paddingX="32px">
        {!!assetData && (
          <Typography variant="h4">
            {assetData.name} {`(${assetData.symbol})`}
          </Typography>
        )}
      </Box>
      {/* Asset components */}
      <Box flex="1" display="flex" flexDirection="row">
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="32px"
        >
          {!!timeseriesData && <Timeseries data={timeseriesData} />}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="32px"
          border="1px solid #555"
          borderRadius="7px"
        >
          {!!metricsData && <Metrics data={metricsData} />}
        </Box>
      </Box>
    </Box>
  );
};
