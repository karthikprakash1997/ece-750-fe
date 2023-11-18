import { HighchartsReact } from "highcharts-react-official";
import * as Highcharts from "highcharts";
import highchartsMap from "highcharts/modules/map";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { overviewActions, mapDataActions } from "../../slices/overview";
import { useParamsDeconstructor } from "../../utils/hooks";
// import { COUNTRY_DETAILS } from '../../utils/helpers/common';
// Get the continent geojson of Europe

highchartsMap(Highcharts);

// Function to process curr.Shipping data
function processShipping(acc, curr) {
  if (Array.isArray(curr.Shipping)) {
    curr.Shipping.filter((ship) => ship.Name !== null).forEach((it) => {
      const result = {
        geometry: {
          type: "LineString",
          coordinates: [
            [curr.longitude, curr.latitude],
            it.countryCode === "US"
              ? [-74, 40]
              : it.countryCode === "CN"
              ? [119.48, 32.54]
              : [it.coordinates[1], it.coordinates[0]],
            [-74.3, 45.5], // Canada
          ],
        },
        className: "animated-line",
        color: "#666",
      };

      acc.push(result);
    });
  } else {
    console.log("curr.Shipping is not an array:", curr.Shipping);
  }
}

const Map = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedCategory, selectedCountry } = useParamsDeconstructor();
  const mapTopology = useSelector((state) => state.overview.mapTopology);
  const mapData = useSelector((state) =>
    state?.mapData?.mapData?.map((item) => [
      item.countryCode.toLowerCase(),
      item.count,
    ]),
  );

  const shippingData = useSelector((state) =>
    (state?.mapData?.mapData || []).reduce((acc, curr) => {
      console.log(curr?.Shipping, "curr.Shipping");
      curr?.Shipping?.filter((ship) => ship.Name !== null)?.forEach((it) => {
        // const coor = COUNTRY_DETAILS.find((it) => it.alpha2 === curr.countryCode);
        const result = {
          geometry: {
            type: "LineString",
            coordinates: [
              [curr.longitude, curr.latitude],
              it.countryCode === "US"
                ? [-74, 40]
                : //   : it.countryCode === "CN"
                  //   ? [119.48, 32.54]
                  [it.coordinates[1], it.coordinates[0]],
              [-74.3, 45.5], //canada
            ],
          },
          className: "animated-line",
          color: "#666",
        };
        acc.push(result);
      });
      return acc;
    }, []),
  );

  const shippingDataMapPoint = useSelector((state) =>
    (state?.mapData?.mapData || []).reduce((acc, curr, index) => {
      console.log(curr?.Shipping, "curr.Shipping");
      curr?.Shipping?.filter((ship) => ship.Name !== null)?.forEach((it) => {
        // const coor = COUNTRY_DETAILS.find((it) => it.alpha2 === curr.countryCode);

        if (!acc.some((datum) => datum.name === curr.Name)) {
          const mapPointResult = {
            name: curr.Name,
            geometry: {
              type: "Point",
              coordinates: [curr.longitude, curr.latitude], // Yemen
            },
            // custom: {
            //   arrival: 1414,
            // },
            dataLabels: {
              align: "right",
            },
          };
          acc.push(mapPointResult);
        }

        if (!acc.some((datum) => datum.name === it.Name)) {
          const mapPointResult2 = {
            name: it.Name,
            geometry: {
              type: "Point",
              coordinates:
                it.countryCode === "US"
                  ? [-74, 40]
                  : it.countryCode === "CN"
                  ? [119.48, 32.54]
                  : [it.coordinates[1], it.coordinates[0]], // Yemen
            },
            // custom: {
            //   arrival: 1414,
            // },
            dataLabels: {
              align: "right",
            },
          };
          acc.push(mapPointResult2);
        }

        if (index === state.mapData?.mapData?.length - 1) {
          const mapPointResult3 = {
            name: "Canada",
            geometry: {
              type: "Point",
              coordinates: [-74.3, 45.5], // Yemen
            },
            // custom: {
            //   arrival: 1414,
            // },
            dataLabels: {
              align: "right",
            },
          };
          acc.push(mapPointResult3);
        }
      });
      return acc;
    }, []),
  );

  useEffect(() => {
    dispatch(overviewActions.fetchMapTopologyData());
  }, []); //eslint-disable-line

  useEffect(() => {
    if (selectedCountry?.length && selectedCategory?.length) {
      // console.log(selected)
      const par = {
        countryCode: selectedCountry.split(","),
        categoryHierarchy: selectedCategory.split(","),
      };
      dispatch(mapDataActions.fetchMapData(par));
    }
  }, [selectedCategory, selectedCountry]);

  const height = screen.availHeight - 140; //eslint-disable-line

  const mapOptions = {
    chart: {
      height,
      map: mapTopology,
      backgroundColor: "transparent",
      margin: 0,
      // events: {
      //   load: function() {
      //     const chart = this,
      //       group = chart.series[0].group,
      //       bBox = group.getBBox(),
      //       ratio = bBox.width / (bBox.height-33);
      //       console.log(bBox.width, bBox.height)

      //     if(!chart.allowUpdate) {
      //       chart.allowUpdate = true;
      //       chart.setSize(null, (chart.plotSizeX) / ratio, false);
      //       chart.allowUpdate = false;
      //     }
      //   }
      // }
    },
    legend: {
      enabled: false,
    },
    title: {
      text: undefined,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: "",
      formatter: function () {
        return `${
          this.key
        } manufactures ${this.point.value.toLocaleString()} parts`;
      },
    },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      buttonOptions: {
        verticalAlign: "bottom",
        align: "right",
        x: -20,
        // y:10
      },
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, "#EFEFFF"],
        [0.5, Highcharts.getOptions().colors[3]],
        // [
        //     1,
        //     Highcharts.color(Highcharts.getOptions().colors[3])
        //         .brighten(-0.5).get()
        // ]
        // [0.5, "#FF7373"],
        [1, "#FF0000"],
        // [1, "#d50000"],
        // [0, '#3DED97'],
        // [0.5, '#234F1E' as any],
        // [1, Highcharts.color('#FF0000').brighten(-0.5).get()]
      ],
    },

    mapView: {
      projection: {
        // name: props.projection
        // projectedBounds: 'world',
        name: "Miller",
      },
      //   fitToGeometry: {
      //     type: 'MultiPoint',
      //     coordinates: [
      //         // Alaska west
      //         [-164, 54],
      //         // Greenland north
      //         [-35, 84],
      //         // New Zealand east
      //         [179, -38],
      //         // Chile south
      //         [-68, -55]
      //     ]
      // }
    },
    series: [
      {
        // Use the gb-all map with no data as a basemap
        name: "Basemap",
        id: "data",
        data: mapData,
        point: {
          events: {
            click() {
              // handleMapClick({ isOpen: true, modelData: e, modelType: 'detail' });
            },
          },
        },
        // events: {
        //   afterAnimate
        // }
        // mapData: mapOptioin,
        // borderColor: '#A0A0A0',
        // nullColor: '#9A7B4F'
        nullColor: "white",
      },
      {
        type: "mappoint",
        color: "#333",
        dataLabels: {
          format: "<b>{point.name}</b>",
          align: "left",
          verticalAlign: "middle",
        },
        data: shippingDataMapPoint,
        // data: [
        //   {
        //     name: "Yemen",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [48.516388, 15.552727], // Yemen
        //     },
        //     custom: {
        //       arrival: 1414,
        //     },
        //     dataLabels: {
        //       align: "right",
        //     },
        //   },
        //   {
        //     name: "Java",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [110.004444, -7.491667], // Java
        //     },
        //     custom: {
        //       arrival: 1696,
        //     },
        //   },
        //   {
        //     name: "La Reunion",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [55.5325, -21.114444], // La reunion
        //     },
        //     custom: {
        //       arrival: 1708,
        //     },
        //   },
        //   {
        //     name: "Brazil",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [-43.2, -22.9], // Brazil
        //     },
        //     custom: {
        //       arrival: 1770,
        //     },
        //     dataLabels: {
        //       align: "right",
        //     },
        //   },
        //   {
        //     name: "India",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [78, 21], // India
        //     },
        //     custom: {
        //       arrival: 1670,
        //     },
        //   },
        //   {
        //     name: "Amsterdam",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [4.9, 52.366667], // Amsterdam
        //     },
        //     custom: {
        //       arrival: 1696,
        //     },
        //   },
        //   {
        //     name: "Antilles",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [-61.030556, 14.681944], // Antilles
        //     },
        //     custom: {
        //       arrival: 1714,
        //     },
        //     dataLabels: {
        //       align: "right",
        //     },
        //   },
        //   {
        //     name: "Guyane",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [-53, 4], // Guyane
        //     },
        //     custom: {
        //       arrival: 1714,
        //     },
        //     dataLabels: {
        //       align: "right",
        //     },
        //   },
        // ],
        enableMouseTracking: false,
      },
      {
        type: "mapline",
        data: shippingData,
        // data: [
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [48.516388, 15.552727], // Yemen
        //         [110.004444, -7.491667], // Java
        //       ],
        //     },
        // className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [48.516388, 15.552727], // Yemen
        //         [55.5325, -21.114444], // La reunion
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [55.5325, -21.114444], // La reunion
        //         [-43.2, -22.9], // Brazil
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [48.516388, 15.552727], // Yemen
        //         [78, 21], // India
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [110.004444, -7.491667], // Java
        //         [4.9, 52.366667], // Amsterdam
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [-3, 55], // UK
        //         [-61.030556, 14.681944], // Antilles
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        //   {
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [2.352222, 48.856613], // Paris
        //         [-53, 4], // Guyane
        //       ],
        //     },
        //     className: css(styles.animatedLine),
        //     color: "#666",
        //   },
        // ],
        lineWidth: 2,
        enableMouseTracking: false,
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        ref={chartRef}
        constructorType={"mapChart"}
        allowChartUpdate
        immutable
        updateArgs={[true, true, true]}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </>
  );
};

export default Map;

// const afterAnimate = (e) => {
//   const chart = e.target.chart;

//   if (!chart.get("flight-route")) {
//     chart.addSeries(
//       {
//         type: "mapline",
//         name: "Flight route, Amsterdam - Los Angeles",
//         animation: false,
//         id: "flight-route",
//         data: [
//           {
//             geometry: {
//               type: "LineString",
//               coordinates: [
//                 [4.9, 53.38], // Amsterdam
//                 [-118.24, 34.05], // Los Angeles
//               ],
//             },
//             className: css(styles.animatedLine),
//             color: "#313f77",
//           },
//         ],
//         lineWidth: 2,
//         accessibility: {
//           exposeAsGroupOnly: true,
//         },
//       },
//       false
//     );
//     chart.addSeries(
//       {
//         type: "mappoint",
//         animation: false,
//         data: [
//           {
//             name: "Amsterdam",
//             geometry: {
//               type: "Point",
//               coordinates: [4.9, 53.38],
//             },
//           },
//           {
//             name: "LA",
//             geometry: {
//               type: "Point",
//               coordinates: [-118.24, 34.05],
//             },
//           },
//         ],
//         color: "#313f77",
//         accessibility: {
//           enabled: false,
//         },
//       },
//       false
//     );
//     chart.redraw(false);
//   }
// };

// const getGraticule = () => {
//   const data = [];

//   // Meridians
//   for (let x = -180; x <= 180; x += 15) {
//     data.push({
//       geometry: {
//         type: "LineString",
//         coordinates:
//           x % 90 === 0
//             ? [
//                 [x, -90],
//                 [x, 0],
//                 [x, 90],
//               ]
//             : [
//                 [x, -80],
//                 [x, 80],
//               ],
//       },
//     });
//   }

//   // Latitudes
//   for (let y = -90; y <= 90; y += 10) {
//     const coordinates = [];
//     for (let x = -180; x <= 180; x += 5) {
//       coordinates.push([x, y]);
//     }
//     data.push({
//       geometry: {
//         type: "LineString",
//         coordinates,
//       },
//       lineWidth: y === 0 ? 2 : undefined,
//     });
//   }

//   return data;
// };
