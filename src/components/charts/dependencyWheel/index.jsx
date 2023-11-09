import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import highcartsDependencyWheel from "highcharts/modules/dependency-wheel";
import highcartsSankey from "highcharts/modules/sankey";
import { useDispatch, useSelector } from "react-redux";
import { shippingDataActions } from "../../../slices/dashboard";
import { useParamsDeconstructor } from "../../../utils/hooks";
import { useEffect } from "react";

highcartsSankey(Highcharts);
highcartsDependencyWheel(Highcharts);

const DependencyWheel = () => {
  const dispatch = useDispatch();
  const { selectedCategory, selectedCountry } = useParamsDeconstructor();
  let shippingList = useSelector((state) =>
    state.shipping.shippingData.map((item) => item),
  );

  useEffect(() => {
    if (selectedCountry?.length && selectedCategory?.length) {
      const par = {
        countryCode: selectedCountry.split(","),
        categoryHierarchy: selectedCategory.split(","),
      };
      dispatch(shippingDataActions.fetchShippingData(par));
    }
  }, [selectedCategory, selectedCountry, dispatch]);

  const chartOptions = {
    chart: {
      width: 1000,
      height: 600,
      backgroundColor: "transparent",
    },

    title: {
      text: "Shipping Dependency Wheel",
    },
    credits: {
      enabled: false,
    },

    series: [
      {
        keys: ["from", "to", "weight"],
        data: shippingList,
        type: "dependencywheel",
        name: "Dependency wheel series",
        dataLabels: {
          color: "#333",
          style: {
            textOutline: "none",
          },
          textPath: {
            enabled: true,
          },
          distance: 10,
        },
        tooltip: {
          nodeFormatter: function() {
              return `<span><b>${this.getSum()}</b> parts manufactored in <b>${this.id}</b> are shipped via other countries.</span>`
            },
          pointFormatter: function() {
            return `<span><b>${this.from}</b> ships <b>${this.weight}</b> parts to <b>${this.to}</b></span>`
          },
        },
        size: "95%",
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default DependencyWheel;
