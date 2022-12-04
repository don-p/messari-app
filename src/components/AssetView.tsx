import { useEffect, useState } from "react";
import { getMetricData, getTimeseriesData } from "../services";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import type { Timeseries, Metrics } from "../services";

type TimeseriesData = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export const AssetView = () => {
  const assetId = "yfi";

  const [timeseriesData, setTimeseriesData] = useState<TimeseriesData[]>();
  const [metricsData, setMetricsData] = useState<Metrics["data"]>();

  useEffect(() => {
    // Get timeseries data
    const timeSeriesPromise = getTimeseriesData(assetId);
    timeSeriesPromise.then((response) =>
      response.json().then((result: Timeseries) => {
        const columns = result.data.parameters.columns;
        const timeseries = result.data.values;
        // Remap data to useful data structure.
        const mappedTimeseries = timeseries.map((dataItem) => {
          const mappedData = columns.reduce(
            (result: Record<string, number>, column, index) => {
              result[column] = dataItem[index];
              return result;
            },
            {}
          );
          return mappedData as TimeseriesData;
        });
        setTimeseriesData(mappedTimeseries);
      })
    );

    // Get metric data
    const metricsPromise = getMetricData(assetId);
    metricsPromise.then((response) =>
      response.json().then((result: Metrics) => {
        const metrics = result.data;
        setMetricsData(metrics);
      })
    );
  }, []);

  return (
    <Box flex="1" display="flex" flexDirection="row" color="#ddd">
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <Typography>Asset view</Typography>
      </Box>
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <Typography>Metrics view</Typography>
      </Box>
    </Box>
  );
};
