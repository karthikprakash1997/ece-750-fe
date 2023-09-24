import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
NoDataToDisplay(Highcharts);

const data = [
  {
    name: 'United States of America',
    value: 1477,
  },
  {
    name: 'Brazil',
    value: 490,
  },
];

const getGraticule = () => {
  const data = [];

  // Meridians
  for (let x = -180; x <= 180; x += 15) {
    data.push({
      geometry: {
        type: 'LineString',
        coordinates:
          x % 90 === 0
            ? [
                [x, -90],
                [x, 0],
                [x, 90],
              ]
            : [
                [x, -80],
                [x, 80],
              ],
      },
    });
  }

  // Latitudes
  for (let y = -90; y <= 90; y += 10) {
    const coordinates = [];
    for (let x = -180; x <= 180; x += 5) {
      coordinates.push([x, y]);
    }
    data.push({
      geometry: {
        type: 'LineString',
        coordinates,
      },
      lineWidth: y === 0 ? 2 : undefined,
    });
  }

  return data;
};

export const MapV2 = ({ identifier, options, classStr }) => {
  const chartRef = useRef(null);
  const [mapOptioin, setMapOptions] = useState({});

  const getApiData = async () => {
    const mapData = await fetch(
      'https://code.highcharts.com/mapdata/custom/world.topo.json',
    ).then((response) => response.json());
    setMapOptions({ mapData, data: getGraticule() });
  };

  useEffect(() => {
    getApiData();
  }, []);
  // console.log(chartColors, 'getGraticule');

  useEffect(() => {
    const mapOptions = {
      chart: {
        // renderTo: identifier,
        height: 700,
        // map: mapOptioin.mapData,
        // width:2000,
        // width:"",
        // map: 'countries/ie/ie-all'
        // height: '39%',
        backgroundColor: 'transparent',
        margin: 0,
        // height: 600,
        // events:{
        // load: function(){
        //   const chart = this;
        //   chart.mapZoom(0.7);
        // }
        // }
        // padding:-100,
        // borderRadius: 12,
        //   minPadding:0,
        //   maxPadding:0,
        //   margin: [0, 0, 0, 0],
        //   spacingTop: 0,
        //   spacingRight: 0,
        //   spacingBottom: 0,
        //   spacingLeft: 0,
        //   plotBorderWidth: 0,
        //   margin: [0,0,0,0],
        //   marginLeft: -10,
        // marginRight: 0,
        // spacingLeft: 0,
        // spacingRight: 0,
        //   // marginRight:0,
        //   // polar: true,
        //   // type: 'line',

        //   spacing: [0, 0, 0, 0],
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
        },
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.5, '#F50505'],
          [1, Highcharts.color('#f50505').brighten(-0.5).get()],
          // [0, '#3DED97'],
          // [0.5, '#234F1E' as any],
          // [1, Highcharts.color('#234F1E').brighten(-0.5).get()]
        ],
      },

      mapView: {
        projection: {
          // name: props.projection
          // projectedBounds: 'world',
          name: 'Miller',
        },
        // zoom: 2.2,
        // center: [10, 58],
        // zoom: 5
      },
      series: [
        // ...(props.projection === 'Orthographic'
        //   ? [
        //       {
        //         name: 'Graticule',
        //         id: 'graticule',
        //         type: 'mapline',
        //         data: getGraticule(),
        //         events: {
        //           afterAnimate
        //         }
        //         // nullColor: 'rgba(0, 0, 0, 0.05)',
        //         // accessibility: {
        //         //     enabled: false
        //         // },
        //         // enableMouseTracking: false
        //       }
        //     ]
        //   : []),
        {
          // Use the gb-all map with no data as a basemap
          name: 'Basemap',
          id: 'data',
          mapData: mapOptioin.mapData,
          data: [
            ['in', 5],
            ['au', 10],
            ['us', 97],
          ],
          point: {
            events: {
              click(e) {
                // handleMapClick({ isOpen: true, modelData: e, modelType: 'detail' });
              },
            },
          },
          // events: {
          //   afterAnimate
          // }
          // mapData: mapOptioin,
          // borderColor: '#A0A0A0',
          nullColor: '#9A7B4F',
        },
        {
          type: 'mapline',
          data: [
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [48.516388, 15.552727], // Yemen
                  [110.004444, -7.491667], // Java
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [48.516388, 15.552727], // Yemen
                  [55.5325, -21.114444], // La reunion
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [55.5325, -21.114444], // La reunion
                  [-43.2, -22.9], // Brazil
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [48.516388, 15.552727], // Yemen
                  [78, 21], // India
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [110.004444, -7.491667], // Java
                  [4.9, 52.366667], // Amsterdam
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [-3, 55], // UK
                  [-61.030556, 14.681944], // Antilles
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [2.352222, 48.856613], // Paris
                  [-53, 4], // Guyane
                ],
              },
              className: 'animated-line',
              color: '#666',
            },
          ],
          lineWidth: 2,
          enableMouseTracking: false,
        },
      ],
    };
    chartRef.current = Highcharts.mapChart(identifier, mapOptions);

    //   chartRef.current =   Highcharts.mapChart(identifier, {

    //     chart: {
    //         // height: 600,
    //         // events:{
    //         //   load: function(){
    //         //     const chart = this;
    //         //     chart.mapZoom(0.7);
    //         //   }
    //         //   }
    //       // map: mapOptioin.mapData,
    //     },
    //     mapView: {
    //       projection: {
    //         name: 'Miller',
    //         projectedBounds: 'world'
    //     },
    //       // zoom: 2.2,
    //       // center: [10, 58],
    //       // zoom: 5
    //     },
    //     title: {
    //         text: 'Chart with explicit width and height'
    //     },

    //     mapNavigation: {
    //         enabled: true,
    //         buttonOptions: {
    //             verticalAlign: 'bottom'
    //         }
    //     },

    //     colorAxis: {
    //         min: 1,
    //         max: 1000,
    //         type: 'logarithmic'
    //     },

    //     legend: {
    //         enabled: false
    //     },

    //     series: [{
    //         data: data,
    //         // mapData: Highcharts.maps['custom/world'],
    //         mapData:mapOptioin.mapData,
    //         joinBy: ['iso-a2', 'code'],
    //         name: 'Population density',
    //         borderWidth: 0.5,
    //         states: {
    //             hover: {
    //                 color: '#a4edba'
    //             }
    //         },
    //         tooltip: {
    //             valueSuffix: '/km²'
    //         }
    //     }]
    // });

    return () => {
      chartRef.current = null;
    };
  }, [mapOptioin, identifier]);

  // const renderSea = () => {
  //   let verb = "animate";
  //   if (chartRef.current) {
  //     if (!chartRef.current.sea) {
  //       chartRef.current.sea = chartRef.current.renderer
  //         .circle()
  //         .attr({
  //           fill: {
  //             radialGradient: {
  //               cx: 0.4,
  //               cy: 0.4,
  //               r: 1,
  //             },
  //             stops: [
  //               [0, "white"],
  //               [1, "lightblue"],
  //             ],
  //           },
  //           zIndex: -1,
  //         })
  //         .add(chartRef.current.get("graticule").group);
  //       verb = "attr";
  //     }

  //     const bounds = chartRef.current.get("graticule").bounds,
  //       p1 = chartRef.current.mapView.projectedUnitsToPixels({
  //         x: bounds?.x1,
  //         y: bounds?.y1,
  //       }),
  //       p2 = chartRef.current.mapView.projectedUnitsToPixels({
  //         x: bounds?.x2,
  //         y: bounds?.y2,
  //       });
  //     chartRef?.current?.sea[verb]({
  //       cx: (p1.x + p2.x) / 2,
  //       cy: (p1.y + p2.y) / 2,
  //       r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2,
  //       // r: 237.3
  //     });
  //     console.log(bounds, Math.min(p2.x - p1.x, p1.y - p2.y) / 2, "bound");
  //   }
  // };
  // renderSea();

  // useEffect(() => {
  //   console.log('entered');
  //   if (chartRef?.current) Highcharts.addEvent(chartRef?.current, 'render', renderSea);
  // }, [chartRef?.current]);

  return <div id={identifier} />;
};
