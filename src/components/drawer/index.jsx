import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useParamsDeconstructor } from "../../utils/hooks";
import { Button, ButtonGroup, Grid, Slider, Typography } from "@mui/material";
import { BiSolidCategory } from "react-icons/bi";
import { BsGlobeAmericas, BsSliders } from "react-icons/bs";
import { RichObjectTreeView } from "../treeView";
import { CountrySelect } from "../countrySelect";

// const Root = styled("div")(({ theme }) => ({
//   height: "100%",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? grey[100]
//       : theme.palette.background.default,
// }));

const FILTER_BUTTON = [
  { title: "Category", value: "category", icon: <BiSolidCategory size={20} /> },
  { title: "Country", value: "country", icon: <BsGlobeAmericas size={20} /> },
  { title: "Threshold", value: "threshold", icon: <BsSliders size={20} /> },
];

export const SideDrawer = () => {
  // const { window } = props;
  const { queryParams, addSearchParams } =
    useParamsDeconstructor();

  // This is used only for the example
  // console.log(document.querySelector(''))
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const handleClick = (route) => {
    addSearchParams({ ...queryParams, selectedFilter: route });
  };

  return (
    <Drawer
      anchor="right"
      open={+queryParams?.filter === 1}
      // open
      // onClose={handleClose}
      // onOpen={toggleDrawer(true)}
      // swipeAreaWidth={drawerBleeding}
      // disableSwipeToOpen={false}
      // ModalProps={{
      //   keepMounted: true,
      // }}
      hideBackdrop
      // height={'100%'}
      style={{height:200}}
      PaperProps={{
        style: {
          overflowY: "inherit",
          // height:750
          // overflowX:'auto'
        },
      }}
      // sx={{backgroundColor:'green'}}
    >
      <Grid marginTop={6} height={700}>
        <Typography marginLeft={2} variant="h5">
          {FILTER_BUTTON.find(it=>it.value===queryParams?.selectedFilter)?.title}
        </Typography>
        <Grid margin={2} display={"flex"} width={400}>
          <Grid marginLeft={-8.5}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined secondary button group"
              color="secondary"
              orientation="vertical"
              sx={{
                // borderLeft:1,
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.15)",
              }}
            >
              {FILTER_BUTTON.map((it) => (
                <Button onClick={() => handleClick(it.value)}>{it.icon}</Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid style={{overflowY:'scroll'}} marginLeft={3} width={400} height={550}  overflowY={'scroll'}>
          {queryParams?.selectedFilter === FILTER_BUTTON[0].value && <RichObjectTreeView />}
          {queryParams?.selectedFilter === FILTER_BUTTON[1].value && <CountrySelect />}
          {queryParams?.selectedFilter === FILTER_BUTTON[2].value && (
            <Slider
              getAriaLabel={() => "Temperature range"}
              // value={value}
              // onChange={handleChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
            />
          )}
          </Grid>
        </Grid>
        <Grid display={'flex'} justifyContent={'center'} columnGap={2} margin={2}>
        <Button variant="contained" color="error">
          Cancel
        </Button>
        <Button variant="contained" color='success'>
          Apply
        </Button >
        </Grid>
      </Grid>
    </Drawer>
  );
};
