import { Grid, Typography } from '@mui/material';
import Stats from '../../components/stats';
import { useTheme } from '@emotion/react';
import { BsGlobeAmericas } from 'react-icons/bs';
import { SiGoogleanalytics } from 'react-icons/si';
import { FaTools } from 'react-icons/fa';
import PieChart from '../../components/charts/pieChart';
import { BasicSelect } from '../../components';
import DependencyWheel from '../../components/charts/dependencyWheel';
import { useParamsDeconstructor } from '../../utils/hooks';
import DrilldownPieChart from '../../components/charts/drilldown';

const MENU_ITEMS = [
  { title: "Shipping Dependency Wheel", value: "dependencyWheel" },
  { title: "Drill down", value: "drilldown" },
];

const Dashboard = () => {
  const theme = useTheme();
  const { queryParams, selectedChart, addSearchParams } =
    useParamsDeconstructor();

  const statsCardData = [
    {
      title: 'Data Count',
      tooltipText: 'Text for tooltip',
      value: 12300,
    },
    {
      title: 'Origin Count',
      tooltipText: 'Text for tooltip',
      value: 123,
      // Content: (
      //   <>
      //     <Typography margin={1} variant="h4">
      //       {formatNumberWithAbbreviation(100)}
      //     </Typography>{' '}
      //   </>
      // ),
      Icon: <BsGlobeAmericas size={25} color="white" />,
      background: 'linear-gradient(195deg, #66BB6A, #43A047)',
    },
    {
      title: 'Parts Count',
      tooltipText: 'Text for tooltip',
      value: 123,
      // Content: (
      //   <PieChart
      //     props={{
      //       height: 80,
      //       width: 80,
      //       title: {
      //         text: "45",
      //         align: "center",
      //         verticalAlign: "middle",
      //         // y: 30
      //       },
      //       colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
      //       plotOptions: {
      //         pie: {
      //           size: 50,
      //         },
      //         series: {
      //           borderWidth: 0,
      //           colorByPoint: true,
      //           type: "pie",
      //           size: "100%",
      //           innerSize: "80%",
      //           // dataLabels: {
      //           //   enabled: false,
      //           //   crop: false,
      //           //   distance: '-10%',
      //           //   style: {
      //           //     fontWeight: 'bold',
      //           //     fontSize: '16px'
      //           //   },
      //           //   connectorWidth: 0
      //           // }
      //         },
      //       },
      //       series: [
      //         {
      //           type: "pie",
      //           data: [
      //             { name: "Category A", y: 45 },
      //             { name: "Category B", y: 25 },
      //             { name: "Category C", y: 15 },
      //             { name: "Category D", y: 10 },
      //             { name: "Category E", y: 5 },
      //           ],
      //         },
      //       ],
      //     }}
      //   />
      // ),
      Icon: <FaTools size={25} color="white" />,
      background: 'linear-gradient(195deg, #EC407A, #D81B60)',
    },
    {
      title: 'Top Rank',
      tooltipText: 'Text for tooltip',
      value: 'USA',
      Icon: <SiGoogleanalytics size={25} color="white" />,
      background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
    },
    {
      title: 'Parts Analysis',
      tooltipText: 'Text for tooltip',
      // value:123,
      Content: (
        <PieChart
          props={{
            height: 52,
            width: 52,
            title: {
              text: '45',
              align: 'center',
              verticalAlign: 'middle',
              // y: 30
            },
            colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
            plotOptions: {
              pie: {
                size: 48,
              },
              series: {
                borderWidth: 0,
                colorByPoint: true,
                type: 'pie',
                size: '100%',
                innerSize: '80%',
                // dataLabels: {
                //   enabled: false,
                //   crop: false,
                //   distance: '-10%',
                //   style: {
                //     fontWeight: 'bold',
                //     fontSize: '16px'
                //   },
                //   connectorWidth: 0
                // }
              },
            },
            series: [
              {
                type: 'pie',
                data: [
                  { name: 'Category A', y: 45 },
                  { name: 'Category B', y: 25 },
                  { name: 'Category C', y: 15 },
                  { name: 'Category D', y: 10 },
                  { name: 'Category E', y: 5 },
                ],
              },
            ],
          }}
        />
      ),
      // Icon: <FaTools size={25} color="white" />,
      // background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
    {
      title: 'Origin Analysis',
      tooltipText: 'Text for tooltip',
      // value:123,
      Content: (
        <PieChart
          props={{
            height: 52,
            width: 52,
            title: {
              text: '45',
              align: 'center',
              verticalAlign: 'middle',
              // y: 30
            },
            colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
            plotOptions: {
              pie: {
                size: 48,
              },
              series: {
                borderWidth: 0,
                colorByPoint: true,
                type: 'pie',
                size: '100%',
                innerSize: '80%',
                // dataLabels: {
                //   enabled: false,
                //   crop: false,
                //   distance: '-10%',
                //   style: {
                //     fontWeight: 'bold',
                //     fontSize: '16px'
                //   },
                //   connectorWidth: 0
                // }
              },
            },
            series: [
              {
                type: 'pie',
                data: [
                  { name: 'Category A', y: 45 },
                  { name: 'Category B', y: 25 },
                  { name: 'Category C', y: 15 },
                  { name: 'Category D', y: 10 },
                  { name: 'Category E', y: 5 },
                ],
              },
            ],
          }}
        />
      ),
      // Icon: <FaTools size={25} color="white" />,
      // background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
  ];

  const handleChange = (e) => {
    const urlParams = {
      ...queryParams,
      selectedChart: e.target.value,
    };
    addSearchParams(urlParams);
  };

  return (
    <Grid container marginTop={3}>
      <Grid item xs={12} sm={3} display={"grid"} justifyContent={"center"}>
        <Typography variant="h6">Chart Type</Typography>
        <BasicSelect
          handleChange={handleChange}
          menuItems={MENU_ITEMS}
          value={selectedChart}
        />
        <Grid
          bgcolor={theme.palette.secondary.main}
          // minHeight={500}
          height={500}
          boxShadow={3}
          minWidth={200}
          maxWidth={240}
          borderRadius={2}
          marginTop={3}
          // margin={2}
          // marginRight={2}
          // margintop={1}
        >
          {statsCardData.map((it) => {
            return <Stats props={it} />;
          })}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9} display={"grid"} justifyContent={"center"}>
        {selectedChart === MENU_ITEMS[0].value ? (
          <DependencyWheel />
        ) : selectedChart === MENU_ITEMS[1].value ? (
          <DrilldownPieChart />
        ) : (
          "Please enter a valid chart type"
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
