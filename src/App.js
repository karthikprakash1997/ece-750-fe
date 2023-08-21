import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dashboard from './containers/dashboard';
import AppBar from './containers/navBar';
// import { Provider } from 'react-redux';

const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(',') // Specify the font family
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid bgcolor={'#f0f2f5'} height={'100%'}>
        {/* // <div style={{backgroundColor: '#f8f8f8'}}> */}

        {/* <Provider> */}
        {/* <PersistGate loading={'Loading ...'} persistor={persistor}> */}
        {/* <ToastContainer hideProgressBar /> */}
        {/* <ErrorBoundary> */}
        {/* <Router /> */}
        {/* </ErrorBoundary> */}
        {/* </PersistGate> */}
        {/* </Provider> */}
        <AppBar />
        <Dashboard />
        {/* </div> */}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
