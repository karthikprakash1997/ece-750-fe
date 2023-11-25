import { Navigate, Outlet } from "react-router-dom";
import AppBar from "../containers/navBar";
import { SideDrawer } from "../components/drawer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesActions, countriesActions } from "../slices/filter";
// import { LinearProgress } from "@mui/material";
// import Footer from '../containers/footer';

const ProtectedRoute = ({ isAuthenticated = false, redirectPath = "/" }) => {
  useEffect(() => {
    console.log("entered", "protectde");
  }, []);

  const dispatch = useDispatch();
  const categoriesList = useSelector(
    (state) => state.categories.categoriesList
  );

  const isLoading = useSelector(
    (state) => state.categories.isLoading || state.countries.isLoading
  );
  const countriesList = useSelector(
    (state) => state?.countries?.countriesList?.data
  );

  useEffect(() => {
    if (!countriesList?.length) dispatch(countriesActions.fetchCountries());
    if (!categoriesList?.length) dispatch(categoriesActions.fetchCategories());
  }, []); //eslint-disable-line

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <AppBar />
      {/* {isLoading ? (
        <LinearProgress />
      ) : ( */}
      {/* <> */}
      <SideDrawer />
      <Outlet />
      {/* </> */}
      {/* )} */}

      {/* <Footer /> */}
    </>
  );
};

export default ProtectedRoute;
