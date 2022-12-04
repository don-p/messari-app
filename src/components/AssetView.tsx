import { useEffect, useState } from "react";
import { getMetricData, getTimeseriesData } from "../services";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Timeseries } from "./Timeseries";
import moment from "moment";

import type { TimeseriesData, MetricsData, TimeseriesItem } from "../services";

export const AssetView = () => {
  const assetId = "yfi";

  const [timeseriesData, setTimeseriesData] = useState<TimeseriesItem[]>();
  const [metricsData, setMetricsData] = useState<MetricsData["data"]>();

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
      })
    );

    // Get metric data
    const metricsPromise = getMetricData(assetId);
    metricsPromise.then((response) =>
      response.json().then((result: MetricsData) => {
        const metrics = result.data;
        setMetricsData(metrics);
      })
    );
  }, []);

  return (
    <Box flex="1" display="flex" flexDirection="row" color="#ddd">
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" padding="32px">
        {!!timeseriesData && <Timeseries data={timeseriesData} />}
      </Box>
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" padding="32px">
        <Typography>Metrics view</Typography>
      </Box>
    </Box>
  );
};
