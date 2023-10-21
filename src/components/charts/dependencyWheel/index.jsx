import { HighchartsReact } from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import highcartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import highcartsSankey from 'highcharts/modules/sankey';
import { useDispatch, useSelector } from 'react-redux';
import { shippingDataActions } from '../../../slices/dashboard';
import { useParamsDeconstructor } from '../../../utils/hooks';
import { useEffect } from 'react';

// import highchartsAccessibility from 'highcharts/modules/accessibility';
// highchartsAccessibility(Highcharts);
highcartsSankey(Highcharts);
highcartsDependencyWheel(Highcharts);

const DependencyWheel = () => {
  const dispatch = useDispatch();
  const { selectedCategory, selectedCountry } = useParamsDeconstructor();
  let shippingList = useSelector((state) => state.shipping.shippingData.map((item) => item));

  useEffect(() => {
    if (selectedCountry?.length && selectedCategory?.length) {
      const par = {
        countryCode: selectedCountry.split(','),
        categoryHierarchy: selectedCategory.split(','),
      };
      dispatch(shippingDataActions.fetchShippingData(par));
    }
  }, [selectedCategory, selectedCountry, dispatch]);

  const chartOptions = {
    chart: {
      width: 1000,
      height: 600,
      backgroundColor: 'transparent',
    },

    title: {
      text: 'Shipping Dependency Wheel',
    },
    credits: {
      enabled: false,
    },

    // accessibility: {
    //   point: {
    //     valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
    //   }
    // },

    series: [
      {
        keys: ['from', 'to', 'weight'],
        // data: [
        //   ['Brazil', 'Portugal', 5],
        //   ['Brazil', 'France', 1],
        //   ['Brazil', 'Spain', 1],
        //   ['Brazil', 'England', 1],
        //   ['Canada', 'Portugal', 1],
        //   ['Canada', 'France', 5],
        //   ['Canada', 'England', 1],
        //   ['Mexico', 'Portugal', 1],
        //   ['Mexico', 'France', 1],
        //   ['Mexico', 'Spain', 5],
        //   ['Mexico', 'England', 1],
        //   ['USA', 'Portugal', 1],
        //   ['USA', 'France', 1],
        //   ['USA', 'Spain', 1],
        //   ['USA', 'England', 5],
        //   ['Portugal', 'Angola', 2],
        //   ['Portugal', 'Senegal', 1],
        //   ['Portugal', 'Morocco', 1],
        //   ['Portugal', 'South Africa', 3],
        //   ['France', 'Angola', 1],
        //   ['France', 'Senegal', 3],
        //   ['France', 'Mali', 3],
        //   ['France', 'Morocco', 3],
        //   ['France', 'South Africa', 1],
        //   ['Spain', 'Senegal', 1],
        //   ['Spain', 'Morocco', 3],
        //   ['Spain', 'South Africa', 1],
        //   ['England', 'Angola', 1],
        //   ['England', 'Senegal', 1],
        //   ['England', 'Morocco', 2],
        //   ['England', 'South Africa', 7],
        //   ['South Africa', 'China', 5],
        //   ['South Africa', 'India', 1],
        //   ['South Africa', 'Japan', 3],
        //   ['Angola', 'China', 5],
        //   ['Angola', 'India', 1],
        //   ['Angola', 'Japan', 3],
        //   ['Senegal', 'China', 5],
        //   ['Senegal', 'India', 1],
        //   ['Senegal', 'Japan', 3],
        //   ['Mali', 'China', 5],
        //   ['Mali', 'India', 1],
        //   ['Mali', 'Japan', 3],
        //   ['Morocco', 'China', 5],
        //   ['Morocco', 'India', 1],
        //   ['Morocco', 'Japan', 3],
        //   ['Japan', 'Brazil', 1],
        // ],
        data: shippingList,
        type: 'dependencywheel',
        name: 'Dependency wheel series',
        dataLabels: {
          color: '#333',
          style: {
            textOutline: 'none',
          },
          textPath: {
            enabled: true,
          },
          distance: 10,
        },
        size: '95%',
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
