import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import AppBar from '../containers/navBar';
import { SideDrawer } from '../components/drawer';
// import Footer from '../containers/footer';

const ProtectedRoute = ({ isAuthenticated = false, redirectPath = '/' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>
    <AppBar />
    <SideDrawer />
    <Outlet />
    {/* <Footer /> */}
  </>

};

export default ProtectedRoute;
