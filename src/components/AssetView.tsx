import { useEffect, useState } from "react";
import { getMetricData, getTimeseriesData, getAssets } from "../services";
import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Timeseries } from "./Timeseries";
import { Metrics } from "./Metrics";
import moment from "moment";

import type { TimeseriesData, MetricsData, TimeseriesItem } from "../services";

type AssetListItem = {
  name: string;
  symbol: string;
};

export const AssetView = () => {
  const [timeseriesData, setTimeseriesData] = useState<TimeseriesItem[]>();
  const [metricsData, setMetricsData] = useState<MetricsData["data"]>();
  const [assetsList, setAssetsList] = useState<AssetListItem[]>();
  const [assetData, setAssetData] = useState<{
    name: string;
    symbol: string;
  }>();

  useEffect(() => {
    // Get assets list
    const assetsPromise = getAssets();
    assetsPromise.then((response) =>
      response.json().then((result: { data: AssetListItem[] }) => {
        setAssetsList(result.data);
      })
    );
  }, []);

  useEffect(() => {
    if (!!assetData?.symbol) {
      // Get timeseries data
      const timeSeriesPromise = getTimeseriesData(assetData?.symbol);
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
      const metricsPromise = getMetricData(assetData?.symbol);
      metricsPromise.then((response) =>
        response.json().then((result: MetricsData) => {
          setMetricsData(result.data);
        })
      );
    }
  }, [assetData]);

  const handleAssetChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    const childProps = child as { props: { ["data-asset-name"]: string } };
    const name = childProps.props["data-asset-name"];
    const symbol = event.target.value;
    setAssetData({ name, symbol });
  };

  return (
    <Box flex="1" display="flex" flexDirection="column" color="#ddd">
      {/* Asset Header */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems={"center"}
        paddingX="32px"
      >
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="select--label">Select asset</InputLabel>
          <Select
            labelId="select-label"
            sx={{ "& .MuiSelect-outlined": { backgroundColor: "white" } }}
            // value={assetData?.symbol}
            onChange={handleAssetChange}
            label="Select asset"
          >
            {assetsList?.map((asset) => (
              <MenuItem
                key={asset.symbol}
                value={asset.symbol}
                data-asset-name={asset.name}
              >
                {asset.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!!assetData && (
          <Typography variant="h4" marginLeft={"32px"}>
            {assetData.name} {`(${assetData.symbol})`}
          </Typography>
        )}
      </Box>
      {/* Asset components */}
      <Box flex="1" display="flex" flexDirection="row" padding="32px">
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {!!timeseriesData && <Timeseries data={timeseriesData} />}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft="32px"
        >
          {!!metricsData && <Metrics data={metricsData} />}
        </Box>
      </Box>
    </Box>
  );
};
