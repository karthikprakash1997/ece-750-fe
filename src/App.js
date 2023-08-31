import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './containers/dashboard';
import Overview from './containers/overview';
import Login from './containers/login';

import AppBar from './containers/navBar';
import { Provider } from 'react-redux';
import { store } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(',') // Specify the font family
  }
});

const App = () => {

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <Grid bgcolor={'#f0f2f5'} height={'100%'}>
            <AppBar />
            <Router>
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/overview" exact element={<Overview />} />
                <Route path="/dashboard" exact element={<Dashboard />} />
              </Routes>
            </Router>
          </Grid>
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
