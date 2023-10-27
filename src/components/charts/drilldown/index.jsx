import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import highchartsDrilldown from "highcharts/modules/drilldown";
import { drillDownMap } from "./mapping";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryDrillDownDataActions,
  countryDrillDownDataActions,
} from "../../../slices/dashboard";

highchartsDrilldown(Highcharts);

const DrilldownPieChart = ({ props }) => {
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
            size: 500
        }
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
        const formatterCallback = this;
        // if (formatterCallback && formatterCallback?.points?.length) {
        return `${formatterCallback.point.name}:${formatterCallback.point.y}`;
        // }
        // return '';
      },
    },
    series: [
      {
        name: "Categories",
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
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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
