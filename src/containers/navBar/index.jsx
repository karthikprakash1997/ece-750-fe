import { Box, Grid, Typography } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';

const AppBar = () => {
  return (
    <Grid bgcolor={'black'} height={50} boxShadow={3}>
      <Grid height={40} marginLeft={1} marginBottom={1}>
        <Box padding={1} paddingLeft={3} style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
          <AiFillHome size={30} color="white" />
          <Typography variant="h5" color="white">
            NRCAN DASHBOARD
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppBar;
