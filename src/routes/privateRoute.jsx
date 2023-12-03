import { Navigate, Outlet } from "react-router-dom";
import AppBar from "../containers/navBar";
// import { LinearProgress } from "@mui/material";

const ProtectedRoute = ({ isAuthenticated = false, redirectPath = "/" }) => {

  // if (!isAuthenticated) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
