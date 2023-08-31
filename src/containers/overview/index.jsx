import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";

import Stats from "../../components/stats";
import CentralSection from "./centralContent";
import Map from "../../components/map";
import { MapV2 } from "../../components/mapV1";
import { BsGlobeAmericas } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { FaTools } from "react-icons/fa";

import { makeStyles } from "@mui/styles";
import { useState } from "react";
import PieChart from "../../components/charts/pieChart";
import { AiOutlineClose } from "react-icons/ai";

const useStyles = makeStyles({
  container: {
    position: "relative",
    // width: 300,
    // height: 680,
  },
  bottomDiv: {
    width: "100%",
    height: "100%",
    // position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  topDiv: {
    // width: '80%',
    // height: '80%',
    // backgroundColor: 'lightgreen',
    position: "absolute",
    // top: '10%',
    // left: '10%',
    // marginRight
    zIndex: 2,
  },
});

const Overview = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleClick = () => {
    setOpenDrawer(!openDrawer);
  };
  const statsCardData = [
    {
      title: "Data Count",
      tooltipText: "Text for tooltip",
      value: 12300,
    },
    {
      title: "Origin Count",
      tooltipText: "Text for tooltip",
      value: 123,
      // Content: (
      //   <>
      //     <Typography margin={1} variant="h4">
      //       {formatNumberWithAbbreviation(100)}
      //     </Typography>{' '}
      //   </>
      // ),
      Icon: <BsGlobeAmericas size={25} color="white" />,
      background: "linear-gradient(195deg, #66BB6A, #43A047)",
    },
    {
      title: "Parts Count",
      tooltipText: "Text for tooltip",
      value: 123,
      // Content: (
      //   <PieChart
      //     props={{
      //       height: 80,
      //       width: 80,
      //       title: {
      //         text: "45",
      //         align: "center",
      //         verticalAlign: "middle",
      //         // y: 30
      //       },
      //       colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
      //       plotOptions: {
      //         pie: {
      //           size: 50,
      //         },
      //         series: {
      //           borderWidth: 0,
      //           colorByPoint: true,
      //           type: "pie",
      //           size: "100%",
      //           innerSize: "80%",
      //           // dataLabels: {
      //           //   enabled: false,
      //           //   crop: false,
      //           //   distance: '-10%',
      //           //   style: {
      //           //     fontWeight: 'bold',
      //           //     fontSize: '16px'
      //           //   },
      //           //   connectorWidth: 0
      //           // }
      //         },
      //       },
      //       series: [
      //         {
      //           type: "pie",
      //           data: [
      //             { name: "Category A", y: 45 },
      //             { name: "Category B", y: 25 },
      //             { name: "Category C", y: 15 },
      //             { name: "Category D", y: 10 },
      //             { name: "Category E", y: 5 },
      //           ],
      //         },
      //       ],
      //     }}
      //   />
      // ),
      Icon: <FaTools size={25} color="white" />,
      background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
    {
      title: "Top Rank",
      tooltipText: "Text for tooltip",
      value: "USA",
      Icon: <SiGoogleanalytics size={25} color="white" />,
      background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
    },
    {
      title: "Parts Analysis",
      tooltipText: "Text for tooltip",
      // value:123,
      Content: (
        <PieChart
          props={{
            height: 52,
            width: 52,
            title: {
              text: "45",
              align: "center",
              verticalAlign: "middle",
              // y: 30
            },
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 48,
              },
              series: {
                borderWidth: 0,
                colorByPoint: true,
                type: "pie",
                size: "100%",
                innerSize: "80%",
                // dataLabels: {
                //   enabled: false,
                //   crop: false,
                //   distance: '-10%',
                //   style: {
                //     fontWeight: 'bold',
                //     fontSize: '16px'
                //   },
                //   connectorWidth: 0
                // }
              },
            },
            series: [
              {
                type: "pie",
                data: [
                  { name: "Category A", y: 45 },
                  { name: "Category B", y: 25 },
                  { name: "Category C", y: 15 },
                  { name: "Category D", y: 10 },
                  { name: "Category E", y: 5 },
                ],
              },
            ],
          }}
        />
      ),
      // Icon: <FaTools size={25} color="white" />,
      // background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
    {
      title: "Origin Analysis",
      tooltipText: "Text for tooltip",
      // value:123,
      Content: (
        <PieChart
          props={{
            height: 52,
            width: 52,
            title: {
              text: "45",
              align: "center",
              verticalAlign: "middle",
              // y: 30
            },
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 48,
              },
              series: {
                borderWidth: 0,
                colorByPoint: true,
                type: "pie",
                size: "100%",
                innerSize: "80%",
                // dataLabels: {
                //   enabled: false,
                //   crop: false,
                //   distance: '-10%',
                //   style: {
                //     fontWeight: 'bold',
                //     fontSize: '16px'
                //   },
                //   connectorWidth: 0
                // }
              },
            },
            series: [
              {
                type: "pie",
                data: [
                  { name: "Category A", y: 45 },
                  { name: "Category B", y: 25 },
                  { name: "Category C", y: 15 },
                  { name: "Category D", y: 10 },
                  { name: "Category E", y: 5 },
                ],
              },
            ],
          }}
        />
      ),
      // Icon: <FaTools size={25} color="white" />,
      // background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
  ];
  // const height = screen.availHeight - 125; //eslint-disable-line
  return (
    <Grid container className={classes.container} height={690}>
      <Grid className={classes.bottomDiv} marginTop={1}>
        <Map />
      </Grid>
      <Grid className={classes.topDiv} marginY={1} marginX={3}>
        {!openDrawer ? (
          <Button variant="contained" color="secondary" onClick={handleClick} />
        ) : (
          <Grid
            bgcolor={theme.palette.secondary.main}
            minHeight={500}
            height={600}
            boxShadow={3}
            minWidth={200}
            borderRadius={2}
            // margin={2}
            // marginRight={2}
            // margintop={1}
          >
            <Grid
              display={"flex"}
              justifyContent={"flex-end"}
              paddingTop={1}
              paddingRight={1}
            >
              <AiOutlineClose color="red" onClick={handleClick} />
            </Grid>

            {statsCardData.map((it) => {
              return <Stats props={it} />;
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Overview;
