import moment from "moment";

export type Timeseries = {
  data: {
    values: Array<Array<number>>;
    parameters: {
      columns: Array<string>;
    };
  };
};

export type MarketData = {
  all_time_high: {
    at: string;
    price: number;
  };
  last_trade_at: string;
  price_usd: number;
  volume_last_24_hours: number;
  percent_change_usd_last_24_hours: number;
};

export type Metrics = {
  data: {
    symbol: string;
    marketData: MarketData;
  };
};
const TIME_SERIES_INTERVAL = "1d";
const TIME_SERIES_END = "2021-02-01";

/**
 * Fetch the timeseries data given the passed-in params for the asset and filter criteria, for a 1-month period.
 * @param assetId string - the asset to fetch data for.
 * @param interval string - interval of the time range
 */
export const getTimeseriesData = (
  assetId: string,
  interval: string = TIME_SERIES_INTERVAL
) => {
  // Compute start and end of 30-day period.
  const now = moment(TIME_SERIES_END);
  const end = now.format("YYYY-MM-DD");
  const start = now.subtract(1, "months").format("YYYY-MM-DD");

  const timeseriesDataPromise = fetch(
    `https://data.messari.io/api/v1/assets/${assetId}/metrics/price/time-series?start=${start}&end=${end}&interval=${interval}`
  );

  return timeseriesDataPromise;
};

/**
 * Fetch the metric data given the passed-in param for the asset.
 * @param assetId string - the asset to fetch data for.
 * @returns
 */
export const getMetricData = (assetId: string) => {
  const metricDataPromise = fetch(
    `https://data.messari.io/api/v1/assets/${assetId}/metrics`
  );

  return metricDataPromise;
};
