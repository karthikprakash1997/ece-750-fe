import { HighchartsReact } from 'highcharts-react-official';
import * as Highcharts from 'highcharts';

const PieChart = ({ props }) => {
  const chartOptions = {
    chart: {
      type: 'pie',
      width: props.height || '100%', // Set the width of the chart
      height: props.width || '100%', // Set the height of the chart
      borderRadius: 12
      // zoom: 2
    },
    title: props.title || {
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
    plotOptions: props.plotOptions,
    colors: props.colors,
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
    series: props.series
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};

export default PieChart;
