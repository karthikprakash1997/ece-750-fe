import { HighchartsReact } from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import highchartsDrilldown from "highcharts/modules/drilldown";
highchartsDrilldown(Highcharts);

const DrilldownPieChart = ({ props }) => {
  const chartOptions = {
    chart: {
      type: 'pie',
    //   width: props?.height || '100%', // Set the width of the chart
    //   height: props?.width || '100%', // Set the height of the chart
      borderRadius: 12,
      backgroundColor: "transparent",
      // zoom: 2
    },
    title: props?.title || {
      text: undefined // No title
    },
    // subtitle: {
    //   useHTML: true,
    //   verticalAlign: 'middle'
    // },
    credits: {
      enabled: false
    },
    legend: {
      align: 'bottom',
      verticalAlign: 'bottom',
      layout: 'vertical',
      x: 0,
      y: 100
    },

    tooltip: {
      enabled: true,
      // formatter: function():any {
      //     return '<b>' + this.series.name + '</b><br/>' +
      //         this.point.name + ': ' + this.point.y;
      // }
      formatter() {
        const formatterCallback = this;
        // if (formatterCallback && formatterCallback?.points?.length) {
        return `${formatterCallback.point.name}:${formatterCallback.point.y}`;
        // }
        // return '';
      }
    },

    // plotOptions: {
    //   series: {
    //     borderWidth: 0,
    //     colorByPoint: true,
    //     type: 'pie',
    //     size: '100%',
    //     innerSize: '80%',
    //     dataLabels: {
    //       enabled: false,
    //       crop: false,
    //       distance: '-10%',
    //       style: {
    //         fontWeight: 'bold',
    //         fontSize: '16px'
    //       },
    //       connectorWidth: 0
    //     }
    //   }
    // },
    // plotOptions: props?.plotOptions,
    // colors: props?.colors,
    // series: [
    //   {
    //     type: 'pie',
    //     // name: startYear,
    //     data: [
    //       { name: 'Category A', y: 45 },
    //       { name: 'Category B', y: 25 },
    //       { name: 'Category C', y: 15 },
    //       { name: 'Category D', y: 10 },
    //       { name: 'Category E', y: 5 }
    //     ]
    //   }
    // ]
    series: [
        {
            name: 'Browsers',
            colorByPoint: true,
            data: [
                {
                    name: 'Chrome',
                    y: 61.04,
                    drilldown: 'Chrome'
                },
                {
                    name: 'Safari',
                    y: 9.47,
                    drilldown: 'Safari'
                },
                {
                    name: 'Edge',
                    y: 9.32,
                    drilldown: 'Edge'
                },
                {
                    name: 'Firefox',
                    y: 8.15,
                    drilldown: 'Firefox'
                },
                {
                    name: 'Other',
                    y: 11.02,
                    drilldown: null
                }
            ]
        }
    ],
    drilldown: {
        series: [
            {
                name: 'Chrome',
                id: 'Chrome',
                data: [
                    [
                        'v97.0',
                        36.89
                    ],
                    [
                        'v96.0',
                        18.16
                    ],
                    [
                        'v95.0',
                        0.54
                    ],
                    [
                        'v94.0',
                        0.7
                    ],
                    [
                        'v93.0',
                        0.8
                    ],
                    [
                        'v92.0',
                        0.41
                    ],
                    [
                        'v91.0',
                        0.31
                    ],
                    [
                        'v90.0',
                        0.13
                    ],
                    [
                        'v89.0',
                        0.14
                    ],
                    [
                        'v88.0',
                        0.1
                    ],
                    [
                        'v87.0',
                        0.35
                    ],
                    [
                        'v86.0',
                        0.17
                    ],
                    [
                        'v85.0',
                        0.18
                    ],
                    [
                        'v84.0',
                        0.17
                    ],
                    [
                        'v83.0',
                        0.21
                    ],
                    [
                        'v81.0',
                        0.1
                    ],
                    [
                        'v80.0',
                        0.16
                    ],
                    [
                        'v79.0',
                        0.43
                    ],
                    [
                        'v78.0',
                        0.11
                    ],
                    [
                        'v76.0',
                        0.16
                    ],
                    [
                        'v75.0',
                        0.15
                    ],
                    [
                        'v72.0',
                        0.14
                    ],
                    [
                        'v70.0',
                        0.11
                    ],
                    [
                        'v69.0',
                        0.13
                    ],
                    [
                        'v56.0',
                        0.12
                    ],
                    [
                        'v49.0',
                        0.17
                    ]
                ]
            },
            {
                name: 'Safari',
                id: 'Safari',
                data: [
                    [
                        'v15.3',
                        0.1
                    ],
                    [
                        'v15.2',
                        2.01
                    ],
                    [
                        'v15.1',
                        2.29
                    ],
                    [
                        'v15.0',
                        0.49
                    ],
                    [
                        'v14.1',
                        2.48
                    ],
                    [
                        'v14.0',
                        0.64
                    ],
                    [
                        'v13.1',
                        1.17
                    ],
                    [
                        'v13.0',
                        0.13
                    ],
                    [
                        'v12.1',
                        0.16
                    ]
                ]
            },
            {
                name: 'Edge',
                id: 'Edge',
                data: [
                    [
                        'v97',
                        6.62
                    ],
                    [
                        'v96',
                        2.55
                    ],
                    [
                        'v95',
                        0.15
                    ]
                ]
            },
            {
                name: 'Firefox',
                id: 'Firefox',
                data: [
                    [
                        'v96.0',
                        4.17
                    ],
                    [
                        'v95.0',
                        3.33
                    ],
                    [
                        'v94.0',
                        0.11
                    ],
                    [
                        'v91.0',
                        0.23
                    ],
                    [
                        'v78.0',
                        0.16
                    ],
                    [
                        'v52.0',
                        0.15
                    ]
                ]
            }
        ]
    }
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default DrilldownPieChart;
