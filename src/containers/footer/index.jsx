import { Box, Grid, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Grid bgcolor={'transparent'} margin={1}>
      {/* <Grid height={30} marginLeft={1} marginBottom={1}>
        <Box padding={1} paddingLeft={3} style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}>
          <Typography variant="h6">
            UWaterloo
          </Typography>
        </Box>
      </Grid> */}
      <Typography
        sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
        variant="subtitle2"
        marginBottom={1}
      >
        Powered by
      </Typography>
      <img
        height={40}
        width={100}
        src={window.location.origin + `/assets/uwaterloo.jpg`}
        alt="Canada"
      />
    </Grid>
  );
};

export default Footer;
