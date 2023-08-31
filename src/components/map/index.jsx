import { HighchartsReact } from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import highchartsMap from 'highcharts/modules/map';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { overviewActions } from '../../slices/overview';
// import { makeStyles, } from '@mui/material/styles'

highchartsMap(Highcharts);

// const useStyles = makeStyles(() => ({
//   animatedLine: {
//     strokeDasharray: 8,
//     strokeDashoffset: 10,
//     animation: '$dash 5s linear infinite',
//   },
//   '@keyframes dash': {
//     from: {
//       strokeDashoffset: 100,
//     },
//     to: {
//       strokeDashoffset: 20,
//     },
//   },
// }));

const Map = ({ props, handleMapClick }) => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const mapTopology = useSelector(state=>state.overview.mapTopology)
  // const classes = useStyles();


  useEffect(() => {
    dispatch(overviewActions.mapTopologyRequest())
  }, []); //eslint-disable-line


  // console.log(chartColors, 'getGraticule');

  const mapOptions = {
    chart: {
      height: 700,
      map: mapTopology,
      // width:'100%',
      // width:"100%",
      // map: 'countries/ie/ie-all'
      // height: '39%',
      backgroundColor: props.backgroundColor,
      // plotBackgroundColor: '#4b96af',
      borderRadius: 12,
      // margin: [0,0,0,0],
      // marginRight:0,
      // polar: true,
      // type: 'line',

      // spacing: [0, 0, 0, 0],
      events: {
        load() {
          console.log(this, 'this');
          if (props.projection === 'Orthographic') this?.mapZoom(3);
        },
        render() {
          // this.getOptions('graticule')
          const chart = this;
          // this.mapZoom(10);
          if (props.projection !== 'Orthographic') return;
          let verb = 'animate';
          if (chart) {
            if (!chart.sea) {
              chart.sea = chart.renderer
                .circle()
                // .attr({
                //   fill: {
                //     radialGradient: {
                //       cx: 0.4,
                //       cy: 0.4,
                //       r: 1
                //     },
                //     stops: [[0, '#009dc4']]
                //   },
                //   zIndex: 0
                // })
                .attr({
                  fill: {
                    radialGradient: {
                      cx: 0.4,
                      cy: 0.4,
                      r: 1
                    },
                    stops: [
                      [0, '#009dc4'],
                      [1, '#3944BC']
                    ]
                  },
                  zIndex: 0.5
                })
                .add(chart.get('graticule')?.group);
              verb = 'attr';
            }

            const bounds = chart.get('graticule')?.bounds,
              p1 = chart?.mapView?.projectedUnitsToPixels({
                x: bounds?.x1,
                y: bounds?.y1
              }),
              p2 = chart?.mapView.projectedUnitsToPixels({
                x: bounds?.x2,
                y: bounds?.y2
              });
            if (bounds) {
              chart?.sea[verb]({
                cx: (p1?.x + p2?.x) / 2,
                cy: (p1?.y + p2?.y) / 2,
                r: Math.min(p2?.x - p1?.x, p1?.y - p2?.y) / 2
              });
            }
          }
        }
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: undefined
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: ''
    },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      buttonOptions: {
        verticalAlign: 'bottom',
        align: 'right'
      }
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.5, '#F50505'],
        [1, Highcharts.color('#f50505').brighten(-0.5).get()]
        // [0, '#3DED97'],
        // [0.5, '#234F1E' as any],
        // [1, Highcharts.color('#234F1E').brighten(-0.5).get()]
      ]
    },

    mapView: {
      projection: {
        name: props.projection
        // projectedBounds: 'world'
        // name: 'WebMercator'
      },
      zoom: props.projection === 'Orthographic' ? undefined : 2.2
      // center: [10, 58],
      // zoom: 5
    },
    series: [
      ...(props.projection === 'Orthographic'
        ? [
            {
              name: 'Graticule',
              id: 'graticule',
              type: 'mapline',
              data: getGraticule(),
              events: {
                afterAnimate
              }
              // nullColor: 'rgba(0, 0, 0, 0.05)',
              // accessibility: {
              //     enabled: false
              // },
              // enableMouseTracking: false
            }
          ]
        : []),
      {
        // Use the gb-all map with no data as a basemap
        name: 'Basemap',
        id: 'data',
        data: [
          ['in', 5],
          ['au', 10],
          ['us', 97]
        ],
        point: {
          events: {
            click(e) {
              handleMapClick({ isOpen: true, modelData: e, modelType: 'detail' });
            }
          }
        },
        // events: {
        //   afterAnimate
        // }
        // mapData: mapOptioin,
        // borderColor: '#A0A0A0',
        nullColor: '#9A7B4F'
      },
      {
        type: 'mapline',
        data: [
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [48.516388, 15.552727], // Yemen
                        [110.004444, -7.491667] // Java
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [48.516388, 15.552727], // Yemen
                        [55.5325, -21.114444] // La reunion
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [55.5325, -21.114444], // La reunion
                        [-43.2, -22.9] // Brazil
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [48.516388, 15.552727], // Yemen
                        [78, 21] // India
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [110.004444, -7.491667], // Java
                        [4.9, 52.366667] // Amsterdam
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [-3, 55], // UK
                        [-61.030556, 14.681944] // Antilles
                    ]
                },
                className: 'animated-line',
                color: '#666'
            },
            {
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [2.352222, 48.856613], // Paris
                        [-53, 4] // Guyane
                    ]
                },
                className: 'animated-line',
                color: '#666'
            }
        ],
        lineWidth: 2,
        enableMouseTracking: false
    },
    ]
  };

  return (
    <>
      <HighchartsReact ref={chartRef} constructorType={'mapChart'} allowChartUpdate immutable updateArgs={[true, true, true]} highcharts={Highcharts} options={mapOptions} />
    </>
  );
};

export default Map;

const afterAnimate = (e) => {
  const chart = e.target.chart;

  if (!chart.get('flight-route')) {
    chart.addSeries(
      {
        type: 'mapline',
        name: 'Flight route, Amsterdam - Los Angeles',
        animation: false,
        id: 'flight-route',
        data: [
          {
            geometry: {
              type: 'LineString',
              coordinates: [
                [4.9, 53.38], // Amsterdam
                [-118.24, 34.05] // Los Angeles
              ]
            },
            className: 'animated-line',
            color: '#313f77'
          }
        ],
        lineWidth: 2,
        accessibility: {
          exposeAsGroupOnly: true
        }
      },
      false
    );
    chart.addSeries(
      {
        type: 'mappoint',
        animation: false,
        data: [
          {
            name: 'Amsterdam',
            geometry: {
              type: 'Point',
              coordinates: [4.9, 53.38]
            }
          },
          {
            name: 'LA',
            geometry: {
              type: 'Point',
              coordinates: [-118.24, 34.05]
            }
          }
        ],
        color: '#313f77',
        accessibility: {
          enabled: false
        }
      },
      false
    );
    chart.redraw(false);
  }
};

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
                [x, 90]
              ]
            : [
                [x, -80],
                [x, 80]
              ]
      }
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
        coordinates
      },
      lineWidth: y === 0 ? 2 : undefined
    });
  }

  return data;
};
