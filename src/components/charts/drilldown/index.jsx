import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import highchartsDrilldown from "highcharts/modules/drilldown";
import { drillDownMap } from "./mapping";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryDrillDownDataActions,
  countryDrillDownDataActions,
} from "../../../slices/dashboard";

highchartsDrilldown(Highcharts);

const DrilldownPieChart = ({ props }) => {
  const drillDownChartRef = useRef();
  const [isCountryDrillDown, setIsCountryDrillDown] = useState(false);
  const [bothDataFetched, setBothDataFetched] = useState(false);

  const dispatch = useDispatch();
  let [categoryDrillDownParent, categoryDrillDownSeries] = useSelector(
    (state) => drillDownMap(state.categoryDrillDown.categoryDrillDownData),
  );
  let [countryDrillDownParent, countryDrillDownSeries] = useSelector((state) =>
    drillDownMap(state.countryDrillDown.countryDrillDownData),
  );

  useEffect(() => {
    dispatch(categoryDrillDownDataActions.fetchCategoryDrillDownData());
  }, [dispatch]);

  useEffect(() => {
    if (isCountryDrillDown && !bothDataFetched) {
      dispatch(countryDrillDownDataActions.fetchCountryDrillDownData());
      setBothDataFetched(true);
    }
  }, [dispatch, isCountryDrillDown]);

  const handleCountryDrillDownToggle = () => {
    while (drillDownChartRef?.current?.chart?.drilldownLevels?.length > 0) {
      drillDownChartRef.current.chart.drillUp();
    }
    setIsCountryDrillDown(!isCountryDrillDown);
  };

  const chartOptions = {
    chart: {
      type: "pie",
      height: 600,
      width: 1000,
      borderRadius: 12,
      backgroundColor: "transparent",
      // zoom: 2
    },
    plotOptions: {
      pie: {
        size: 500,
      },
    },
    title: props?.title || {
      text: undefined, // No title
    },
    credits: {
      enabled: false,
    },
    legend: {
      align: "bottom",
      verticalAlign: "bottom",
      layout: "vertical",
      x: 0,
      y: 100,
    },

    tooltip: {
      enabled: true,
      formatter() {
        const drillDownLevels = this.series.chart.drilldownLevels;
        const formatterCallback = this;
        if (isCountryDrillDown) {
          if (drillDownLevels && drillDownLevels.length > 0) {
            return `<span><b>${
              formatterCallback.point.name
            }</b> are <b>${formatterCallback.point.percentage.toFixed(
              2,
            )}%</b> of <b>${drillDownLevels[0].pointOptions.name}'s</b>
            ${
              drillDownLevels.length == 1
                ? "electronic"
                : drillDownLevels[drillDownLevels.length - 1].pointOptions.name
            } production with <b>${
              formatterCallback.point.y
            }</b> parts.</span>`;
          } else {
            return `<span><b>${
              formatterCallback.point.name
            }</b> owns <b>${formatterCallback.point.percentage.toFixed(
              2,
            )}%</b> of global electronic production with <b>${
              formatterCallback.point.y
            }</b> parts.</span>`;
          }
        } else {
          if (
            drillDownLevels &&
            drillDownLevels?.length > 0 &&
            !drillDownLevels[drillDownLevels.length - 1].lowerSeriesOptions
              .data[0].drilldown
          ) {
            return `<span><b>${
              formatterCallback.point.name
            }</b> manufactures <b>${
              formatterCallback.point.y
            }</b> parts which is <b>${formatterCallback.point.percentage.toFixed(
              2,
            )}%</b> of all <b>${
              drillDownLevels[drillDownLevels.length - 1].pointOptions.name
            }</b> global production.</span>`;
          } else {
            return `<span><b>${
              formatterCallback.point.name
            }</b> make up <b>${formatterCallback.point.percentage.toFixed(
              2,
            )}%</b> of <b>${
              drillDownLevels?.length > 0
                ? drillDownLevels[drillDownLevels?.length - 1].pointOptions.name
                : ""
            }</b> global electronic production with <b>${
              formatterCallback.point.y
            }</b> parts.</span>`;
          }
        }
      },
    },
    series: [
      {
        name: isCountryDrillDown ? "Countries" : "Categories",
        colorByPoint: true,
        data: isCountryDrillDown
          ? countryDrillDownParent
          : categoryDrillDownParent,
      },
    ],
    drilldown: {
      series: isCountryDrillDown
        ? countryDrillDownSeries
        : categoryDrillDownSeries,
    },
  };

  // };
  return (
    <>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={drillDownChartRef}
        />
        <div>
          <Stack direction="row" spacing={1} alignItems="center">
            Category wise drill down
            <Switch
              checked={isCountryDrillDown}
              onChange={handleCountryDrillDownToggle}
              color="secondary"
            />
            Country wise drill down
          </Stack>
        </div>
      </div>
    </>
  );
};

export default DrilldownPieChart;
