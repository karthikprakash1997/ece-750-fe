import { Grid } from '@mui/material';

import Stats from './stats';
import CentralSection from './centralContent';

const Dashboard = () => {
  return (
    <Grid margin={1}>
      <Stats />
      <CentralSection />
    </Grid>
  );
};

export default Dashboard;
