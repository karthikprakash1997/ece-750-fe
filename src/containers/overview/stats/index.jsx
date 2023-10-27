import { Box, Grid, Typography } from "@mui/material";
import { FaTools } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { BsGlobeAmericas, BsClock } from "react-icons/bs";
import { MdNumbers } from "react-icons/md";

import StatsCards from "../../../components/statCards";
import PieChart from "../../../components/charts/pieChart";
import { formatNumberWithAbbreviation } from "../../../utils/numberFormatter";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FlagIcon } from "react-flag-kit";

const Stats = () => {
  // const DataCount = () => (
  //   <><Typography>{formatNumberWithAbbreviation(100000)}</Typography> </>
  // )

  const statsCardData = [
    {
      title: "Data Count",
      tooltipText: "Text for tooltip",
      subTitle: (
        <Box
          display={"flex"}
          columnGap={1}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Typography variant="body1" marginLeft={0.5}>
            Updated Just Now
          </Typography>
          <BsClock fontSize={"0.75rem"} style={{ marginTop: 3 }} />
        </Box>
      ),
      Content: (
        <>
          <Typography margin={1} variant="h4">
            {formatNumberWithAbbreviation(100000)}
          </Typography>{" "}
        </>
      ),
      Icon: <MdNumbers size={25} color="white" />,
      background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
    },
    {
      title: "Origin Analysis",
      tooltipText: "Text for tooltip",
      subTitle: (
        <Box display={"flex"} columnGap={1} alignItems={"center"}>
          <Typography component={"div"} variant="body2" color="textSecondary">
            Percentage Change: 10%
          </Typography>
          <BiSolidDownArrow color="red" />
        </Box>
      ),
      Content: (
        <PieChart
          props={{
            height: 80,
            width: 80,
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 50,
              },
              series: {
                // borderWidth: 0,
                // colorByPoint: true,
                type: "pie",
                size: "100%",
                // innerSize: '%',
                dataLabels: {
                  enabled: false,
                  //   connectorWidth: 0
                },
              },
            },
            series: [
              {
                type: "pie",
                // name: startYear,
                data: [
                  { name: "Available", y: 80 },
                  { name: "Unavailable", y: 20 },
                ],
              },
            ],
          }}
        />
      ),
      Icon: <SiGoogleanalytics size={25} color="white" />,
      background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
    },
    {
      title: "Origin Count",
      tooltipText: "Text for tooltip",
      subTitle: (
        <Box display={"flex"} columnGap={1} alignItems={"center"}>
          <Typography component={"div"} variant="body2" color="textSecondary">
            Top Rank: USA
          </Typography>
          <FlagIcon code="US" size={12} />
        </Box>
      ),
      Content: (
        <>
          <Typography margin={1} variant="h4">
            {formatNumberWithAbbreviation(100)}
          </Typography>{" "}
        </>
      ),
      Icon: <BsGlobeAmericas size={25} color="white" />,
      background: "linear-gradient(195deg, #66BB6A, #43A047)",
    },
    {
      title: "Parts Count",
      tooltipText: "Text for tooltip",
      subTitle: (
        <Box display={"flex"} columnGap={1} alignItems={"center"}>
          <Typography component={"div"} variant="body2" color="textSecondary">
            Total categories: 5
          </Typography>
          <BiSolidUpArrow color="green" />
        </Box>
      ),
      Content: (
        <PieChart
          props={{
            height: 80,
            width: 80,
            title: {
              text: "45",
              align: "center",
              verticalAlign: "middle",
              // y: 30
            },
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 50,
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
      Icon: <FaTools size={25} color="white" />,
      background: "linear-gradient(195deg, #EC407A, #D81B60)",
    },
  ];

  return (
    <>
      <Grid margin={3} marginTop={4}>
        <Grid container spacing={3}>
          {statsCardData.map((it) => {
            return (
              <Grid key={it.title} item xs={12} md={3} sm={6} xl={3}>
                <StatsCards props={it} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Stats;
