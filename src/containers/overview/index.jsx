import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  useTheme,
} from "@mui/material";

import Stats from "../../components/stats";
import Map from "../../components/map";
import { SiGoogleanalytics } from "react-icons/si";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaTools } from "react-icons/fa";

import { useState } from "react";
import PieChart from "../../components/charts/pieChart";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { COUNTRY_DETAILS } from "../../utils/helpers/common";
import { useParamsDeconstructor } from "../../utils/hooks";

const Overview = () => {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);
  const {queryParams } = useParamsDeconstructor()

  const stats = useSelector((state) => state.mapData.stats);

  const handleClick = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleShippingChange = () =>{
    
  }

  const statsCardData = [
    {
      title: "Data Count",
      tooltipText: "Text for tooltip",
      value: stats?.data_count || 0,
    },
    {
      title: "Origin Count",
      tooltipText: "Text for tooltip",
      value: stats?.origins || 0,
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
      title: "Category Count",
      tooltipText: "Text for tooltip",
      value: stats?.cat_count || 0,
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
      value: COUNTRY_DETAILS.find(it=>it.alpha2===stats?.top_rank?.countryCode)?.country || 'None' ,
      Icon: <SiGoogleanalytics size={25} color="white" />,
      background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
    },
    {
      title: "Category Analysis",
      tooltipText: "Text for tooltip",
      // value:123,
      Content: (
        <PieChart
          props={{
            height: 58,
            width: 58,
            title: {
              text: `${((stats?.cat_count/queryParams?.selectedCategory?.split(',')?.length) * 100 || 0).toFixed(0)}%`,
              align: "center",
              verticalAlign: "middle",
              style:{
                fontSize:15
              }
              // y: 30
            },
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 52,
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
                  { name: "Selected Categories", y: stats?.cat_count/queryParams?.selectedCategory?.split(',')?.length || 0 },
                  { name: "Recieved Categories", y: 1-stats?.cat_count/queryParams?.selectedCategory?.split(',')?.length || 0 },
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
            height: 58,
            width: 58,
            title: {
              text: `${((stats?.origins/queryParams?.selectedCountry?.split(',')?.length) * 100 ||0).toFixed(0)}%`,
              align: "center",
              verticalAlign: "middle",
              style:{
                fontSize:15
              }
              // y: 30
            },
            colors: ["#FCE700", "#F8C4B4", "#f6e1ea", "#B8E8FC", "#BCE29E"],
            plotOptions: {
              pie: {
                size: 52,
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
                  { name: "Selected Categories", y: stats?.origins/queryParams?.selectedCountry?.split(',')?.length || 0 },
                  { name: "Recieved Categories", y: 1-stats?.origins/queryParams?.selectedCountry?.split(',')?.length || 0 },
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
    <Grid container position={"relative"} minHeight={690}>
      <Grid
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        marginTop={1}
      >
        <Map />
      </Grid>
      <Grid position={"absolute"} zIndex={2} marginY={1} marginX={3} display={'flex'} justifyContent={'space-between'} width={'90%'}>
        {!openDrawer ? (
          <Button sx={{height:'fit-content'}} variant="contained" color="secondary" onClick={handleClick} />
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

        <FormGroup sx={{marginTop:80}}>
          <FormControlLabel
            control={<Checkbox defaultChecked color="error" />}
            label="Show Shipping"
            onChange={handleShippingChange}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default Overview;
