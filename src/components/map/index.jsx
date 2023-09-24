import { HighchartsReact } from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { overviewActions, mapDataActions } from '../../slices/overview';
import { css, keyframes } from '@emotion/react';
import { useParamsDeconstructor } from '../../utils/hooks';
// import { COUNTRY_DETAILS } from '../../utils/helpers/common';
// Get the continent geojson of Europe

highchartsMap(Highcharts);

// const useStyles = makeStyles(() => ({
//   "@global": {
//     "@keyframes dash": {
//       from: {
//         strokeDashoffset: 100,
//       },
//       to: {
//         strokeDashoffset: 20,
//       },
//     },
//   },
//   animatedLine: {
//     strokeDasharray: 8,
//     strokeDashoffset: 10,
//     animation: `dash 5s linear infinite`,
//   },
// }));

// Define keyframes
const dash = keyframes`
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 20;
  }
`;

// Define Emotion styles
const styles = {
  animatedLine: css`
    stroke-dasharray: 8;
    stroke-dashoffset: 10;
    animation: ${dash} 5s linear infinite;
  `,
};

const Map = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const {selectedCategory, selectedCountry} = useParamsDeconstructor();
  const mapTopology = useSelector((state) => state.overview.mapTopology);
  const mapData = useSelector((state) =>
    state.mapData.mapData.map((item) => [
      item.countryCode.toLowerCase(),
      item.count,
    ]),
  );

  const shippingData = useSelector((state) =>
    state.mapData.mapData.reduce((acc, curr) => {
      // const coor = COUNTRY_DETAILS.find((it) => it.alpha2 === curr.countryCode);
      curr.Shipping.forEach(() => {
        const result = {
          geometry: {
            type: 'LineString',
            coordinates: [
              // [coor.longitude, coor.latitude],
              // [coor.longitude, coor.latitude],
              [2.352222, 48.856613], // Paris
              [-53, 4], // Guyane

              // [
              // it?.coordinates[1],
              // it?.coordinates[0]

              // ]
              // it?.coordinates
            ],
            // coordinates: [
            //   [48.516388, 15.552727], // Yemen
            //   [110.004444, -7.491667], // Java
            // ],
          },
          className: css(styles.animatedLine),
          color: '#666',
        };
        acc.push(result);
      });
      return acc;
    }, []),
  );

  // const result = getContinentGeoJSONByCode('US');

  // const classes = useStyles();

  useEffect(() => {
    dispatch(overviewActions.fetchMapTopologyData());
  }, []); //eslint-disable-line

  useEffect(() => {
    if(selectedCountry?.length &&  selectedCategory?.length){
      const par = {
        countryCode : selectedCountry,
        categoryHierarchy : selectedCategory
      }
      dispatch(mapDataActions.fetchMapData(par))
    }
  }, [selectedCategory, selectedCountry]);

  // console.log(chartColors, 'getGraticule');

  const height = screen.availHeight - 140; //eslint-disable-line

  const mapOptions = {
    chart: {
      height,
      // minHeight:675,
      map: mapTopology,
      backgroundColor: 'transparent',
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
      headerFormat: '',
    },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        align: 'right',
        x: -20,
        // y:10
      },
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.5, Highcharts.getOptions().colors[3]],
        // [
        //     1,
        //     Highcharts.color(Highcharts.getOptions().colors[3])
        //         .brighten(-0.5).get()
        // ]
        // [0.5, "#FF7373"],
        [1, '#FF0000'],
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
        name: 'Miller',
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
        name: 'Basemap',
        id: 'data',
        // data: [
        //   // ["in", 5],
        //   // ["au", 10],
        //   // ["us", 97],
        //   ["TW",67],
        //   ["JP", 62]
        // ],
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
        nullColor: 'white',
      },
      {
        type: 'mappoint',
        color: '#333',
        dataLabels: {
          format: '<b>{point.name}</b>',
          align: 'left',
          verticalAlign: 'middle',
        },
        data: shippingData,
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
        type: 'mapline',
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
        //     className: css(styles.animatedLine),
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
        constructorType={'mapChart'}
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
