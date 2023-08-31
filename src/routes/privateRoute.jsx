import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import AppBar from '../containers/navBar';
// import Footer from '../containers/footer';

const ProtectedRoute = ({ isAuthenticated = false, redirectPath = '/' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>
    <AppBar />
    <Outlet />
    {/* <Footer /> */}
  </>

};

export default ProtectedRoute;
