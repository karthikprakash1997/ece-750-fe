import { Box, Grid, Typography } from '@mui/material';
import { FlagIcon } from 'react-flag-kit';

import PieChart from '../../../../components/charts/pieChart/index.jsx';

const DetailView = () => {
  return (
    <>
      <Box padding={1} paddingRight={2} paddingLeft={2} style={{ display: 'flex', columnGap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" color="CaptionText">
          1. USA
        </Typography>
        <FlagIcon code="US" size={20} />
      </Box>
      <Grid display={'flex'} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
        <PieChart
          props={{
            height: 300,
            width: 300,
            colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E'],
            title: {
              text: '97',
              align: 'center',
              verticalAlign: 'middle'
              // y: 30
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                colorByPoint: true,
                type: 'pie',
                size: '100%',
                innerSize: '80%',
                // showInLegend: true,
                dataLabels: {
                  enabled: false
                }
              }
            },
            series: [
              {
                type: 'pie',
                // name: startYear,
                data: [
                  { name: 'Category A', y: 45 },
                  { name: 'Category B', y: 25 },
                  { name: 'Category C', y: 15 },
                  { name: 'Category D', y: 10 },
                  { name: 'Category E', y: 5 }
                ]
              }
            ]
          }}
        />
      </Grid>
    </>
  );
};

export default DetailView;
