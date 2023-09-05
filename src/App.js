import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './containers/dashboard';
import Overview from './containers/overview';
import Login from './containers/login';
import ProtectedRoute from './routes/privateRoute';

import { Provider } from 'react-redux';
import { store } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

const theme = createTheme({
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(',') // Specify the font family
  },
  palette: {
    secondary: {
      main: '#FFFFFF'
    },
    primary: {
      main: '#B8E3F1'
    }
  }
});

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <Grid bgcolor={theme.palette.primary.main} height={'100vh'}>
            <Router>
              <Routes>
                <Route path="/" exact element={<Login />} />
                {/* <AppBar /> */}

                {/* <Route path="/overview" exact element={
                  <ProtectedRoute isAuthenticated={true}>
                    <Overview />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" exact element={
                  <ProtectedRoute isAuthenticated={true}>
                    <Dashboard />
                  </ProtectedRoute>
                } /> */}
                <Route element={<ProtectedRoute isAuthenticated={true} />}>
                  <Route path="overview" element={<Overview />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </Router>
          </Grid>
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
