import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
NoDataToDisplay(Highcharts);

const data = [
    {
        name: 'United States of America',
        value: 1477
    },
    {
        name: 'Brazil',
        value: 490
    },]

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

export const ChartComponent = ({ identifier, options, classStr }) => {
  const chartRef = useRef(null);
  const [mapOptioin, setMapOptions] = useState({});

  const getApiData = async () => {
    const mapData = await fetch('https://code.highcharts.com/mapdata/custom/world.topo.json').then((response) => response.json());
    setMapOptions({ mapData, data: getGraticule() });
  };

  useEffect(() => {
    getApiData();
  }, []);
  // console.log(chartColors, 'getGraticule');



  useEffect(() => {
    const mapOptions = {
      chart: {
          map: mapOptioin.mapData
      },
  
      title: {
          text: 'Airport density per country',
          floating: true,
          align: 'left',
          style: {
              textOutline: '2px white'
          }
      },
  
      subtitle: {
          text: 'Source: <a href="http://www.citypopulation.de/en/world/bymap/airports/">citypopulation.de</a><br>' +
              'Click and drag to rotate globe<br>',
          floating: true,
          y: 34,
          align: 'left'
      },
  
      legend: {
          enabled: false
      },
  
      mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
  
      mapView: {
          maxZoom: 30,
          projection: {
              name: 'Orthographic',
              rotation: [60, -30]
          }
      },
  
      colorAxis: {
          tickPixelInterval: 100,
          minColor: '#BFCFAD',
          maxColor: '#31784B',
          max: 1000
      },
  
      tooltip: {
          pointFormat: '{point.name}: {point.value}'
      },
  
      plotOptions: {
          series: {
              animation: {
                  duration: 750
              },
              clip: false
          }
      },
  
      series: [{
          name: 'Graticule',
          id: 'graticule',
          type: 'mapline',
          data: getGraticule(),
          // events: {
          //     afterAnimate
          // },
          // nullColor: 'rgba(0, 0, 0, 0.05)',
          // accessibility: {
          //     enabled: false
          // },
          // enableMouseTracking: false
      },
      {
        data,
        joinBy: 'name',
        name: 'Airports per million km²',
        states: {
            hover: {
                color: '#a4edba',
                borderColor: '#333333'
            }
        },
        dataLabels: {
            enabled: false,
            format: '{point.name}'
        },
    /*     events: {
            afterAnimate
        }, */
        accessibility: {
            exposeAsGroupOnly: true
        }
    }]
  }
    chartRef.current = Highcharts.mapChart(identifier, mapOptions);

    return () => {
      chartRef.current = null;
    };
  }, [mapOptioin, identifier]);

  const renderSea = () => {
    let verb = 'animate';
    if (chartRef.current) {
      if (!chartRef.current.sea) {
        chartRef.current.sea = chartRef.current.renderer
          .circle()
          .attr({
            fill: {
              radialGradient: {
                cx: 0.4,
                cy: 0.4,
                r: 1
              },
              stops: [
                [0, 'white'],
                [1, 'lightblue']
              ]
            },
            zIndex: -1
          })
          .add(chartRef.current.get('graticule').group);
        verb = 'attr';
      }

      const bounds = chartRef.current.get('graticule').bounds,
        p1 = chartRef.current.mapView.projectedUnitsToPixels({
          x: bounds?.x1,
          y: bounds?.y1
        }),
        p2 = chartRef.current.mapView.projectedUnitsToPixels({
          x: bounds?.x2,
          y: bounds?.y2
        });
      chartRef?.current?.sea[verb]({
        cx: (p1.x + p2.x) / 2,
        cy: (p1.y + p2.y) / 2,
        r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2
        // r: 237.3
      });
      console.log(bounds, Math.min(p2.x - p1.x, p1.y - p2.y) / 2, 'bound');
    }
  };
  renderSea();

  // useEffect(() => {
  //   console.log('entered');
  //   if (chartRef?.current) Highcharts.addEvent(chartRef?.current, 'render', renderSea);
  // }, [chartRef?.current]);

  return <div id={identifier} />;
};
