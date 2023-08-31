import { Box, Grid, Typography, useTheme } from "@mui/material";
import { FaFilterCircleXmark } from "react-icons/fa6";

const AppBar = () => {
  const theme = useTheme();

  return (
    <Grid
      bgcolor={theme.palette.secondary.main}
      height={40}
      boxShadow={3}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
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
            height={20}
            width={30}
            src={window.location.origin + `/assets/CANADA.png`}
            alt="Canada"
          />
          <Typography variant="h6">NRCAN</Typography>
        </Box>
      </Grid>
      <Grid width={'40%'} marginRight={2} display={'flex'}  alignItems={"center"}
      justifyContent={"space-between"} height={40}>
        <Grid  display={'flex'}  alignItems={"center"} columnGap={8}
     >
        <Box  sx={{borderBottom:1, borderColor:'red', borderWidth:2}} display={'flex'}  alignItems={"center"} height={40}>
          <Typography color={'red'} textAlign={'center'}>
          Overview
          </Typography>
          </Box>
          <Box display={'flex'}  alignItems={"center"} height={40}>
          <Typography textAlign={'center'}>
          Dashboard
          </Typography>
          </Box>
        </Grid>
        <FaFilterCircleXmark size={20} />
      </Grid>
    </Grid>
  );
};

export default AppBar;
