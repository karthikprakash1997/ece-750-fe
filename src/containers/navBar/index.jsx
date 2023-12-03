import { Box, Grid, Typography, useTheme } from "@mui/material";
// import { getCategories } from "../../utils/filter";

const AppBar = () => {
  const theme = useTheme();
  // const location = useLocation();
  // getCategories();
  // const handleRouteChange = (pathname) => {
  //   navigate({ pathname });
  // };

  return (
    <Grid
      bgcolor={theme.palette.secondary.main}
      height={40}
      boxShadow={3}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      position={"relative"}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Grid height={30} marginLeft={1} marginBottom={1}>
        <Box
          // padding={1}
          paddingLeft={3}
          style={{ display: "flex", columnGap: "1rem", alignItems: "center" }}
        >
          {/* <AiFillHome size={30} /> */}
          {/* <FlagIcon country code={'CA'} size={20} /> */}
          <img
            height={40}
            width={150}
            src={window.location.origin + `/assets/uWaterloo.png`}
            alt="University of Waterloo"
          />
          <Typography variant="h6">Mental Wellness application</Typography>
        </Box>
      </Grid>
      {/* <Grid
        width={"40%"}
        marginRight={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={40}
      >
        <Grid display={"flex"} alignItems={"center"} columnGap={8}>
          {NAV_BAR.map((it) => (
            <Box
              sx={
                `/${it.route}` === currentRoute
                  ? { borderBottom: 1, borderColor: "red", borderWidth: 2 }
                  : undefined
              }
              display={"flex"}
              alignItems={"center"}
              height={40}
              style={{ cursor: "pointer" }}
              onClick={() => handleRouteChange(`/${it.route}`, it.search)}
            >
              <Typography
                color={`/${it.route}` === currentRoute ? "red" : "black"}
                textAlign={"center"}
              >
                {it.title}
              </Typography>
            </Box>
          ))}
        </Grid>
        <FaFilterCircleXmark
          onClick={handleFilterClick}
          size={20}
          cursor={"pointer"}
        />
      </Grid> */}
    </Grid>
  );
};

export default AppBar;
